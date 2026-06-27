"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Contact</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">Get in Touch</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Ready to start your Dubai property journey? Contact our team for a personalized consultation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
                <h2 className="font-bold text-primary text-xl">Contact Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2.5 rounded-xl">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a href="tel:+97145001234" className="font-medium text-primary hover:text-accent transition-colors">+971 4 500 1234</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2.5 rounded-xl">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href="mailto:info@glenlochrealty.com" className="font-medium text-primary hover:text-accent transition-colors break-all">info@glenlochrealty.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2.5 rounded-xl">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-primary">Office 1501, Burj Crown Tower<br />Business Bay, Dubai, UAE</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2.5 rounded-xl">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Working Hours</p>
                      <p className="font-medium text-primary">Mon - Fri: 9:00 AM - 6:30 PM</p>
                      <p className="text-gray-400 text-sm">Sat - Sun: By appointment</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl hover:bg-[#1DA851] transition-colors font-medium"
                >
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.0!2d55.2663!3d25.1886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDExJzE5LjAiTiA1NcKwMTUnNTguNyJF!5e0!3m2!1sen!2sae!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Glenloch Realty Office Location"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
                <h2 className="font-bold text-primary text-xl mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
