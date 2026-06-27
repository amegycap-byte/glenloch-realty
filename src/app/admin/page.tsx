"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users, UserPlus, Phone, TrendingUp, CheckCircle, XCircle,
  Download, Search, Filter, Trash2, Clock, CalendarDays,
  BarChart3, MessageCircle, Globe, ExternalLink, Mail,
  Bot, ArrowLeft,
} from "lucide-react";
import { getLeads, getFunnelMetrics, deleteLead, updateLead, exportLeadsCSV } from "@/lib/leads/storage";
import { Lead, LeadSource, LeadStatus, FunnelMetrics } from "@/lib/leads/types";
import Link from "next/link";
import Button from "@/components/ui/Button";

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-green-100 text-green-700",
  converted: "bg-emerald-100 text-emerald-700",
  lost: "bg-red-100 text-red-700",
};

const sourceIcons: Record<LeadSource, React.ReactNode> = {
  chatbot: <Bot className="w-3.5 h-3.5" />,
  website: <Globe className="w-3.5 h-3.5" />,
  whatsapp: <MessageCircle className="w-3.5 h-3.5" />,
  facebook: <ExternalLink className="w-3.5 h-3.5" />,
  linkedin: <ExternalLink className="w-3.5 h-3.5" />,
  email: <Mail className="w-3.5 h-3.5" />,
  referral: <Users className="w-3.5 h-3.5" />,
};

function MetricCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number | string; accent?: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-400 text-xs">{label}</span>
        <span className={accent || "text-primary"}>{icon}</span>
      </div>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "all">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showExport, setShowExport] = useState(false);

  const refresh = () => {
    setLeads(getLeads());
    setMetrics(getFunnelMetrics());
  };

  useEffect(() => { refresh(); }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [leads, search, statusFilter, sourceFilter]);

  const handleDelete = (id: string) => {
    if (confirm("Delete this lead?")) {
      deleteLead(id);
      refresh();
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const handleStatusChange = (id: string, status: LeadStatus) => {
    updateLead(id, { status });
    refresh();
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
  };

  const handleExport = () => {
    const csv = exportLeadsCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `glenloch-leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!metrics) return null;

  return (
    <>
      <section className="pt-24 pb-6 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-1 text-gray-400 hover:text-accent text-sm mb-2 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Site
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Lead Management Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">Track and manage your sales pipeline</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleExport} className="flex items-center gap-1.5 bg-accent text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-8 gap-3">
            <MetricCard icon={<Users className="w-4 h-4" />} label="Total Leads" value={metrics.totalLeads} />
            <MetricCard icon={<UserPlus className="w-4 h-4 text-blue-500" />} label="New" value={metrics.newLeads} accent="text-blue-500" />
            <MetricCard icon={<Phone className="w-4 h-4 text-yellow-500" />} label="Contacted" value={metrics.contactedLeads} accent="text-yellow-500" />
            <MetricCard icon={<TrendingUp className="w-4 h-4 text-green-500" />} label="Qualified" value={metrics.qualifiedLeads} accent="text-green-500" />
            <MetricCard icon={<CheckCircle className="w-4 h-4 text-emerald-500" />} label="Converted" value={metrics.convertedLeads} accent="text-emerald-500" />
            <MetricCard icon={<XCircle className="w-4 h-4 text-red-500" />} label="Lost" value={metrics.lostLeads} accent="text-red-500" />
            <MetricCard icon={<CalendarDays className="w-4 h-4" />} label="Today" value={metrics.todayLeads} />
            <MetricCard icon={<Clock className="w-4 h-4" />} label="This Week" value={metrics.weekLeads} />
          </div>
        </div>
      </section>

      <section className="pb-10 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm bg-white"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "all")}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as LeadSource | "all")}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white"
            >
              <option value="all">All Sources</option>
              <option value="chatbot">Chatbot</option>
              <option value="website">Website</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="email">Email</option>
              <option value="referral">Referral</option>
            </select>
            {(statusFilter !== "all" || sourceFilter !== "all" || search) && (
              <button
                onClick={() => { setStatusFilter("all"); setSourceFilter("all"); setSearch(""); }}
                className="text-xs text-accent hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Name / Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Purpose</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Budget</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Date</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 text-xs uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-400">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                        No leads yet. Leads will appear here when visitors interact with the chatbot or submit forms.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedLead?.id === lead.id ? "bg-accent/5" : ""
                        }`}
                        onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                      >
                        <td className="py-3 px-4">
                          <p className="font-medium text-primary">{lead.name}</p>
                          <p className="text-xs text-gray-400">{lead.email || lead.phone}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className="flex items-center gap-1 text-gray-600 text-xs">
                            {sourceIcons[lead.source] || <Globe className="w-3.5 h-3.5" />}
                            {lead.source}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs capitalize">{lead.purpose.replace("-", " ")}</td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{lead.budget || "-"}</td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{lead.location || "-"}</td>
                        <td className="py-3 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => { e.stopPropagation(); handleStatusChange(lead.id, e.target.value as LeadStatus); }}
                            className={`text-xs font-medium px-2 py-1 rounded-lg border-0 cursor-pointer ${statusColors[lead.status]}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-gray-400 text-xs">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} shown
            {leads.length !== filteredLeads.length && ` (filtered from ${leads.length} total)`}
          </p>

          {selectedLead && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-primary text-lg">{selectedLead.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {selectedLead.email} &middot; {selectedLead.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                    title="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#25D366] text-white rounded-lg hover:bg-[#1DA851] transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-400 text-xs">Source</span>
                  <p className="font-medium text-primary capitalize">{selectedLead.source}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Purpose</span>
                  <p className="font-medium text-primary capitalize">{selectedLead.purpose.replace("-", " ")}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Budget</span>
                  <p className="font-medium text-primary">{selectedLead.budget || "N/A"}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Location</span>
                  <p className="font-medium text-primary">{selectedLead.location || "N/A"}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Nationality</span>
                  <p className="font-medium text-primary">{selectedLead.nationality || "N/A"}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Date</span>
                  <p className="font-medium text-primary">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {selectedLead.notes && (
                <div>
                  <span className="text-gray-400 text-xs">Notes</span>
                  <p className="text-gray-600 text-sm mt-1 bg-warm-white p-3 rounded-xl">{selectedLead.notes}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
