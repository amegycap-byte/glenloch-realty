"use client";

import Image from "next/image";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { TeamMember } from "@/lib/utils";

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-center gradient-border">
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
          <div className="flex justify-center gap-3">
            <a
              href={`tel:${member.phone}`}
              className="w-11 h-11 bg-gradient-to-br from-accent to-accent-dark text-primary rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-110"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${member.email}`}
              className="w-11 h-11 bg-gradient-to-br from-accent to-accent-dark text-primary rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${member.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-[#25D366] text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-110"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-primary text-lg">{member.name}</h3>
        <p className="text-gradient text-sm font-semibold">{member.role}</p>
        <p className="text-gray-400 text-xs mt-3 line-clamp-2 leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}
