import { BotState, ChatMessage, PropertyPurpose, Lead } from "./types";
import { generateLeadId } from "./storage";

const propertyTypes = ["Apartment", "Villa", "Townhouse", "Penthouse", "Commercial"];
const budgetOptions = ["AED 500K - 1M", "AED 1M - 2M", "AED 2M - 5M", "AED 5M - 10M", "AED 10M+"];
const locations = [
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Dubai Hills Estate",
  "Business Bay",
  "Jumeirah Village Circle",
  "Emirates Hills",
  "Dubai Creek Harbour",
  "Not Sure / Suggest Me",
];

export function getBotResponse(state: BotState, userInput?: string): {
  messages: ChatMessage[];
  newState: BotState;
} {
  const newState = { ...state };
  const messages: ChatMessage[] = [];
  const ts = new Date().toISOString();
  let id = 0;

  const msg = (text: string, options?: string[]) => {
    messages.push({ id: `b${id++}`, role: "bot", text, options, timestamp: ts });
  };

  switch (state.step) {
    case 0:
      msg(
        "👋 Welcome to Glenloch Realty! I'm your virtual assistant.",
        ["I want to invest in Dubai property", "Looking for my dream home", "I want to sell a property", "Golden Visa info", "Just browsing"]
      );
      newState.step = 1;
      break;

    case 1:
      switch (userInput) {
        case "I want to invest in Dubai property":
          newState.purpose = "investment";
          break;
        case "Looking for my dream home":
          newState.purpose = "home";
          break;
        case "I want to sell a property":
          newState.purpose = "sell";
          msg("Great! Let's get your property listed. We'll need some details first.");
          captureContact(newState, messages, id);
          newState.step = 7;
          return { messages, newState };
        case "Golden Visa info":
          newState.purpose = "golden-visa";
          msg(
            "The UAE Golden Visa offers 10-year renewable residency for property investors. Key benefits:\n\n\u2022 Invest AED 2M+ in property\n\u2022 Sponsor your family\n\u2022 100% business ownership\n\u2022 No minimum stay required\n\nWould you like to check your eligibility?",
            ["Yes, check my eligibility", "Tell me more", "Contact me later"]
          );
          newState.step = 7;
          return { messages, newState };
        default:
          newState.purpose = "browsing";
          msg("Feel free to explore our website! If you need any help, just ask. Would you like us to contact you?", ["Yes, contact me", "No thanks, just browsing"]);
          newState.step = 7;
          return { messages, newState };
      }
      msg(
        `Excellent choice! Dubai offers exceptional ${newState.purpose === "investment" ? "investment opportunities with tax-free income and high rental yields" : "homes in world-class communities"}.\n\nLet me help find the perfect option for you.`
      );
      msg("What's your budget range?", budgetOptions);
      newState.step = 2;
      break;

    case 2:
      newState.budget = userInput;
      msg("What type of property are you looking for?", propertyTypes);
      newState.step = 3;
      break;

    case 3:
      newState.propertyType = userInput;
      msg("Do you have a preferred location?", locations);
      newState.step = 4;
      break;

    case 4:
      newState.location = userInput;
      msg("What's your nationality? (This helps us advise on visa options and purchase eligibility)", ["UAE Resident", "Indian", "British", "Russian", "Chinese", "European", "Other"]);
      newState.step = 5;
      break;

    case 5:
      newState.nationality = userInput;
      if (newState.nationality !== "UAE Resident" && newState.nationality) {
        msg(
          `Great! As a ${newState.nationality} investor, you have access to freehold properties in designated areas. You may also be eligible for the UAE Golden Visa with a property investment of AED 2M+.`
        );
      }
      captureContact(newState, messages, id);
      newState.step = 7;
      break;

    case 7:
      if (userInput && userInput !== "skip" && userInput !== "No thanks, just browsing") {
        if (!newState.name) newState.name = userInput;
        else if (!newState.email) newState.email = userInput;
        else if (!newState.phone) newState.phone = userInput;
      }

      if (!newState.phone) {
        msg("Lastly, your phone number so we can reach you:", ["Skip"]);
      } else {
        completeAndSave(newState, messages, id);
        newState.completed = true;
        newState.step = 8;
      }
      break;

    default:
      msg("Thank you! A member of our team will contact you within 24 hours. Is there anything else I can help with?", ["Yes", "No, I'm done"]);
      break;
  }

  return { messages, newState };
}

function captureContact(state: BotState, messages: ChatMessage[], id: number) {
  const ts = new Date().toISOString();
  if (!state.name) {
    messages.push({ id: `b${id++}`, role: "bot", text: "Almost done! What's your name?", timestamp: ts });
  } else if (!state.email) {
    messages.push({ id: `b${id++}`, role: "bot", text: "Thanks! What's your email address?", timestamp: ts });
  } else if (!state.phone) {
    messages.push({ id: `b${id++}`, role: "bot", text: "And your phone number?", options: ["Skip"], timestamp: ts });
  }
}

function completeAndSave(state: BotState, messages: ChatMessage[], id: number) {
  const lead: Lead = {
    id: generateLeadId(),
    name: state.name || "Anonymous",
    email: state.email || "",
    phone: state.phone || "",
    budget: state.budget || "",
    propertyType: state.propertyType || "",
    location: state.location || "",
    purpose: state.purpose || "browsing",
    nationality: state.nationality || "",
    source: "chatbot",
    status: "new",
    notes: `Qualified via chatbot. Purpose: ${state.purpose}`,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const { saveLead } = require("./storage");
    saveLead(lead);
  }

  messages.push({
    id: `b${id++}`,
    role: "bot",
    text: `Thank you ${lead.name}! 🎉\n\nHere's a summary of what we discussed:\n\u2022 **Purpose:** ${lead.purpose}\n\u2022 **Budget:** ${lead.budget}\n\u2022 **Property Type:** ${lead.propertyType}\n\u2022 **Location:** ${lead.location}\n\nOne of our expert consultants will contact you within 24 hours to discuss these opportunities.`,
    timestamp: new Date().toISOString(),
  });
}
