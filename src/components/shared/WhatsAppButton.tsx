"use client";

import { MessageCircle } from "lucide-react";

const PHONE_NUMBER = "971501234567";
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#1DA851] transition-all duration-300 hover:scale-105 hover:shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">Chat with us</span>
    </a>
  );
}
