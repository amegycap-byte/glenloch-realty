"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { ChatMessage, BotState } from "@/lib/leads/types";
import { getBotResponse } from "@/lib/leads/conversation-flow";

const initialBotState: BotState = { step: 0, completed: false };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [botState, setBotState] = useState<BotState>(initialBotState);
  const [userInput, setUserInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const showTrigger = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && messages.length === 0) {
      const response = getBotResponse(initialBotState);
      setMessages(response.messages);
      setBotState(response.newState);
    }
  }, [open]);

  useEffect(() => {
    if (!open && !showTrigger.current) {
      showTrigger.current = true;
      const timer = setTimeout(() => setOpen(true), 8000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleUserChoice = (choice: string) => {
    setHasInteracted(true);
    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: "user",
      text: choice,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setWaiting(true);

    setTimeout(() => {
      const response = getBotResponse(botState, choice);
      setMessages((prev) => [...prev, ...response.messages]);
      setBotState(response.newState);
      setWaiting(false);
      inputRef.current?.focus();
    }, 600);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || waiting) return;
    handleUserChoice(userInput.trim());
    setUserInput("");
  };

  const isLastStep = botState.completed || botState.step >= 7;

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent rounded-full shadow-lg hover:bg-accent-dark transition-all duration-300 flex items-center justify-center group"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] h-[560px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            <div className="bg-primary text-white px-4 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Glenloch Assistant</p>
                  <p className="text-gray-400 text-xs">Online — responds instantly</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-warm-white">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-accent text-primary rounded-br-md"
                        : "bg-white text-gray-700 shadow-sm rounded-bl-md"
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                    {msg.options && !isLastStep && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleUserChoice(opt)}
                            disabled={waiting}
                            className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-primary/10"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {waiting && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {!isLastStep && (
              <form onSubmit={handleTextSubmit} className="p-3 border-t border-gray-100 bg-white shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={botState.step === 0 ? "Say hello!" : "Type your answer..."}
                    disabled={waiting}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm bg-gray-50 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!userInput.trim() || waiting}
                    className="p-2.5 bg-accent text-primary rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {isLastStep && (
              <div className="p-3 border-t border-gray-100 bg-white shrink-0">
                <p className="text-xs text-gray-400 text-center">
                  Our team will reach out within 24 hours. Need immediate help?{" "}
                  <a
                    href="https://wa.me/971501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-medium hover:underline"
                  >
                    WhatsApp us
                  </a>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
