"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

const faqs = [
  {
    category: "Investing in Dubai",
    questions: [
      {
        q: "Can foreigners buy property in Dubai?",
        a: "Yes, foreigners can buy freehold property in designated investment areas across Dubai. These areas include Downtown Dubai, Dubai Marina, Palm Jumeirah, Dubai Hills Estate, Business Bay, and many others. Non-residents have the same ownership rights as UAE nationals in these areas.",
      },
      {
        q: "What is the minimum property investment for the Golden Visa?",
        a: "The minimum property investment to qualify for the UAE Golden Visa is AED 2 million (approximately USD 545,000). This can be a single property or a combination of multiple properties. Off-plan properties with at least 50% paid also qualify.",
      },
      {
        q: "What are the taxes on property in Dubai?",
        a: "Dubai offers tax-free property ownership with no annual property tax, no capital gains tax, and no rental income tax. The main costs are a one-time DLD transfer fee of 4% of the property value and minor registration fees.",
      },
      {
        q: "What is the average rental yield in Dubai?",
        a: "Dubai offers some of the highest rental yields globally, averaging 6-8% across most areas. Premium locations like Dubai Marina, JVC, and Business Bay can yield 7-10%, significantly higher than London (3-4%), New York (3-5%), or Singapore (2-3%).",
      },
    ],
  },
  {
    category: "Buying Process",
    questions: [
      {
        q: "How long does it take to buy a property in Dubai?",
        a: "The process typically takes 4-8 weeks from offer to handover. This includes offer acceptance (1-2 days), MOU signing and deposit (3-5 days), due diligence and mortgage (2-4 weeks), and DLD registration and transfer (2-3 days).",
      },
      {
        q: "What costs are involved in buying property?",
        a: "Key costs include: DLD transfer fee (4% of purchase price), registration fee (AED 4,000 + VAT), agent commission (typically 2%), valuation fee (AED 2,500-5,000 for mortgages), and mortgage registration fee (0.25% of loan amount).",
      },
      {
        q: "Do I need to be present in Dubai to buy property?",
        a: "No, you can complete the entire process remotely. We can arrange for Power of Attorney (POA) to be executed at a UAE embassy in your country, or you can use the Dubai Land Department's remote authentication services.",
      },
      {
        q: "What is an MOU in Dubai property transactions?",
        a: "The Memorandum of Understanding (MOU) is a legally binding agreement between buyer and seller that outlines the terms of sale, including price, payment schedule, handover date, and any conditions. It is signed after offer acceptance and before the transfer process begins.",
      },
    ],
  },
  {
    category: "Off-Plan Properties",
    questions: [
      {
        q: "Are off-plan investments safe in Dubai?",
        a: "Yes, off-plan investments are well-regulated in Dubai. All registered off-plan projects are protected by RERA escrow accounts, ensuring that your payments are used only for construction. The Oqood system also registers your ownership from the date of purchase.",
      },
      {
        q: "What payment plans are available for off-plan properties?",
        a: "Payment plans vary by developer but typically include: 10-20% down payment, 30-50% during construction (paid in installments), and 40-60% on handover. Many developers offer post-handover payment plans spanning 2-5 years.",
      },
      {
        q: "Can I sell my off-plan property before handover?",
        a: "Yes, you can sell your off-plan property through a process called 'assigning the contract.' This requires developer approval and payment of a transfer fee (usually 2-4% of the sale price). Many investors profit from off-plan assignments before completion.",
      },
    ],
  },
  {
    category: "Property Management",
    questions: [
      {
        q: "Do you offer property management services?",
        a: "Yes, we offer comprehensive property management services including tenant sourcing and vetting, rent collection, property maintenance, Ejari renewal, and dispute resolution. Our team ensures your investment is well-maintained and generating optimal returns.",
      },
      {
        q: "How is rental income paid to overseas owners?",
        a: "Rental income can be paid directly to your international bank account via wire transfer. UAE banks also offer non-resident accounts that make it easy to receive and manage rental income. We can assist with account setup if needed.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredFaqs = faqs
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(search.toLowerCase()) ||
          q.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">FAQ</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Find answers to common questions about investing in Dubai real estate.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
            />
          </div>

          {filteredFaqs.map((category) => (
            <div key={category.category} className="mb-10">
              <h2 className="text-xl font-bold text-primary mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((item, idx) => {
                  const key = `${category.category}-${idx}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={key} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-primary pr-4">{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
