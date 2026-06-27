export type LeadSource = "chatbot" | "website" | "whatsapp" | "facebook" | "linkedin" | "email" | "referral";
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";
export type PropertyPurpose = "investment" | "home" | "sell" | "golden-visa" | "browsing";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  propertyType: string;
  location: string;
  purpose: PropertyPurpose;
  nationality: string;
  source: LeadSource;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  options?: string[];
  timestamp: string;
}

export interface BotState {
  step: number;
  purpose?: PropertyPurpose;
  budget?: string;
  propertyType?: string;
  location?: string;
  nationality?: string;
  name?: string;
  email?: string;
  phone?: string;
  completed: boolean;
}

export interface FunnelMetrics {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  lostLeads: number;
  bySource: Record<LeadSource, number>;
  todayLeads: number;
  weekLeads: number;
}
