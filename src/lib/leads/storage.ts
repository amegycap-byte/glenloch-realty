"use client";

import { Lead, FunnelMetrics, LeadSource } from "./types";

const STORAGE_KEY = "glenloch_leads";

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLead(lead: Lead): void {
  if (typeof window === "undefined") return;
  const leads = getLeads();
  leads.unshift(lead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  syncToServer(lead);
}

export function updateLead(id: string, updates: Partial<Lead>): void {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx !== -1) {
    leads[idx] = { ...leads[idx], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }
}

export function deleteLead(id: string): void {
  const leads = getLeads().filter((l) => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function getLeadById(id: string): Lead | undefined {
  return getLeads().find((l) => l.id === id);
}

export function getFunnelMetrics(): FunnelMetrics {
  const leads = getLeads();
  const now = new Date();
  const today = now.toDateString();
  const weekAgo = new Date(now.getTime() - 7 * 86400000);

  const bySource = {} as Record<LeadSource, number>;
  for (const s of ["chatbot", "website", "whatsapp", "facebook", "linkedin", "email", "referral"] as LeadSource[]) {
    bySource[s] = 0;
  }
  leads.forEach((l) => {
    if (bySource[l.source] !== undefined) bySource[l.source]++;
  });

  return {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    contactedLeads: leads.filter((l) => l.status === "contacted").length,
    qualifiedLeads: leads.filter((l) => l.status === "qualified").length,
    convertedLeads: leads.filter((l) => l.status === "converted").length,
    lostLeads: leads.filter((l) => l.status === "lost").length,
    bySource,
    todayLeads: leads.filter((l) => new Date(l.createdAt).toDateString() === today).length,
    weekLeads: leads.filter((l) => new Date(l.createdAt) >= weekAgo).length,
  };
}

export function generateLeadId(): string {
  return `LEAD-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

export function exportLeadsCSV(): string {
  const leads = getLeads();
  const headers = [
    "ID", "Name", "Email", "Phone", "Budget", "Property Type",
    "Location", "Purpose", "Nationality", "Source", "Status", "Created",
  ];
  const rows = leads.map((l) =>
    [
      l.id, l.name, l.email, l.phone, l.budget, l.propertyType,
      l.location, l.purpose, l.nationality, l.source, l.status, l.createdAt,
    ]
      .map((v) => `"${(v || "").replace(/"/g, '""')}"`)
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

async function syncToServer(lead: Lead): Promise<void> {
  try {
    await fetch(
      "https://api.glenlochrealty.com/leads",
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) }
    );
  } catch {
    // offline — lead saved locally
  }
}
