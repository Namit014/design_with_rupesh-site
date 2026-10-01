"use client";

import { useState, useEffect } from "react";
import { Copy, Plus, Users, Trash2, KeyRound, Sparkles, Check, ShieldAlert, LogOut, Edit2, X } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  password?: string;
  interviewDate: string;
  interviewTime: string;
  queueNumber: string;
  googleMeetCode?: string;
}

export default function AdminTeamsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [adminError, setAdminError] = useState("");

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    interviewDate: "",
    interviewTime: "",
    queueNumber: "",
    googleMeetCode: ""
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Check session storage for admin login
  useEffect(() => {
    const isAuth = sessionStorage.getItem("adminAuth");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin pass code is admin2026 or rebirth
    if (adminPasscode === "admin2026" || adminPasscode === "rebirth" || adminPasscode === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      setAdminError("");
    } else {
      setAdminError("Incorrect admin passcode. Try 'admin2026' or 'rebirth'");
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/candidates");
      if (res.ok) {
        const data = await res.json();
        setCandidates(data);
      }
    } catch (error) {
      console.error("Failed to fetch candidates", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCandidates();
    }
  }, [isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let pwd = "";
    for (let i = 0; i < 9; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password: pwd }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: editingId ? "Updating candidate..." : "Saving candidate...", type: "info" });
    
    try {
      const url = "/api/candidates";
      const method = editingId ? "PUT" : "POST";
      const bodyPayload = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ 
          text: editingId ? "Candidate updated successfully!" : `Candidate registered! Password: "${data.candidate.password}"`, 
          type: "success" 
        });
        setFormData({ 
          name: "", email: "", password: "", interviewDate: "", interviewTime: "", queueNumber: "", googleMeetCode: ""
        });
        setEditingId(null);
        fetchCandidates();
      } else {
        setMessage({ text: data.error || "Failed to save candidate", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred", type: "error" });
    }
  };

  const handleEditClick = (c: Candidate) => {
    setEditingId(c.id);
    setFormData({
      name: c.name,
      email: c.email,
      password: c.password || "",
      interviewDate: c.interviewDate,
      interviewTime: c.interviewTime,
      queueNumber: c.queueNumber,
      googleMeetCode: c.googleMeetCode || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name}?`)) return;

    try {
      const res = await fetch(`/api/candidates?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCandidates();
      }
    } catch (err) {
      console.error("Failed to delete candidate", err);
    }
  };

  const copyPassword = (id: string, password?: string) => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // If Admin is not logged in, prompt for Admin Passcode
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
            <KeyRound className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Teams Portal</h1>
          <p className="text-neutral-400 text-sm mb-6">
            Enter the admin passcode to manage candidate access and interview schedules.
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. admin2026)"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-center text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 font-mono tracking-widest text-lg"
              />
            </div>

            {adminError && (
              <p className="text-red-400 text-xs bg-red-400/10 py-2 rounded-lg border border-red-500/20">
                {adminError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-xl transition-colors cursor-pointer shadow-lg shadow-purple-600/20"
            >
              Unlock Admin Portal
            </button>

            <p className="text-neutral-600 text-xs mt-3">
              Default passcode: <code className="text-neutral-400">admin2026</code>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-xs font-semibold text-purple-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              The Rebirth Company
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-400" />
              Interview Teams & Candidates
            </h1>
            <p className="text-neutral-400 text-sm mt-1">
              Add interviewees, schedule their queues, and manage candidate access passwords.
            </p>
          </div>

          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl border border-neutral-800 text-sm font-medium transition-colors w-fit"
          >
            <LogOut className="w-4 h-4" />
            Lock Admin
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add Candidate Form (5 columns) */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 h-fit shadow-xl">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {editingId ? <Edit2 className="w-5 h-5 text-purple-400" /> : <Plus className="w-5 h-5 text-purple-400" />}
                {editingId ? "Edit Candidate" : "Register New Candidate"}
              </h2>
              {editingId && (
                <button 
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ name: "", email: "", password: "", interviewDate: "", interviewTime: "", queueNumber: "", googleMeetCode: "" });
                    setMessage({ text: "", type: "" });
                  }}
                  className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-neutral-400 text-xs mb-6">
              {editingId ? "Modify details and schedule for this candidate." : "Create an account with custom or auto-generated candidate password."}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Candidate Full Name
                </label>
                <input 
                  type="text" required name="name" value={formData.name} onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-neutral-600"
                  placeholder="e.g. Arnel Cruz"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input 
                  type="email" required name="email" value={formData.email} onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-neutral-600"
                  placeholder="arnel@example.com"
                />
              </div>

              {/* Password configuration */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Candidate Password
                  </label>
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate Random
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-purple-500 transition-colors placeholder:text-neutral-600"
                    placeholder="Leave empty for name@rebirth"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Leave blank to automatically generate a secure password upon save.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Interview Date
                  </label>
                  <input 
                    type="date" required name="interviewDate" value={formData.interviewDate} onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Interview Time
                  </label>
                  <input 
                    type="time" required name="interviewTime" value={formData.interviewTime} onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Queue Number / Token
                  </label>
                  <input 
                    type="text" required name="queueNumber" value={formData.queueNumber} onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-neutral-600 font-mono"
                    placeholder="e.g. Q-07"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Google Meet Code
                  </label>
                  <input 
                    type="text" name="googleMeetCode" value={formData.googleMeetCode} onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-neutral-600 font-mono"
                    placeholder="e.g. abc-defg-hij"
                  />
                </div>
              </div>
              
              {message.text && (
                <div className={`p-3.5 rounded-xl text-xs font-medium ${
                  message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                  message.type === 'success' ? 'bg-green-500/10 text-green-300 border border-green-500/20' : 
                  'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                }`}>
                  {message.text}
                </div>
              )}
              
              <button 
                type="submit" 
                className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-lg cursor-pointer mt-2 ${
                  editingId ? "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20" : "bg-purple-600 hover:bg-purple-500 shadow-purple-600/20"
                }`}
              >
                {editingId ? "Save Changes" : "Create Candidate & Save Password"}
              </button>
            </form>
          </div>
          
          {/* Candidates List (7 columns) */}
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Registered Candidates</h2>
                <p className="text-neutral-400 text-xs">Candidates who can sign in on the Teams Portal.</p>
              </div>
              <span className="bg-neutral-800 text-neutral-300 text-xs font-semibold px-3 py-1 rounded-full">
                {candidates.length} Total
              </span>
            </div>
            
            <div className="overflow-x-auto flex-1">
              {loading ? (
                <div className="text-center py-16 text-neutral-500 text-sm">Loading candidates list...</div>
              ) : candidates.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 text-sm">
                  No candidates registered yet. Add your first candidate using the form on the left.
                </div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Candidate</th>
                      <th className="pb-3 font-semibold">Interview Schedule</th>
                      <th className="pb-3 font-semibold">Queue</th>
                      <th className="pb-3 font-semibold">Password</th>
                      <th className="pb-3 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {candidates.map((c) => (
                      <tr key={c.id} className="hover:bg-neutral-800/30 transition-colors">
                        <td className="py-4 pr-3">
                          <div className="font-bold text-white">{c.name}</div>
                          <div className="text-neutral-400 text-xs">ID: {c.id}</div>
                        </td>
                        <td className="py-4 pr-3">
                          <div className="text-neutral-300 font-medium text-xs">{c.interviewDate}</div>
                          <div className="text-purple-400 text-xs font-mono">{c.interviewTime}</div>
                        </td>
                        <td className="py-4 pr-3">
                          <div className="bg-purple-950/60 border border-purple-800/40 text-purple-300 px-2.5 py-1 rounded-md font-mono text-xs font-bold w-fit mb-1">
                            {c.queueNumber}
                          </div>
                          {c.googleMeetCode && (
                            <div className="text-blue-400 text-xs font-mono truncate max-w-[120px]">
                              {c.googleMeetCode}
                            </div>
                          )}
                        </td>
                        <td className="py-4 pr-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono bg-neutral-950 px-2.5 py-1 rounded-lg text-emerald-400 text-xs font-bold border border-neutral-800">
                              {c.password}
                            </span>
                            <button 
                              onClick={() => copyPassword(c.id, c.password)}
                              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                              title="Copy password to share"
                            >
                              {copiedId === c.id ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleEditClick(c)}
                              className="p-1.5 text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Edit candidate"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(c.id, c.name)}
                              className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete candidate"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Instruction Callout for Admin */}
            <div className="mt-6 p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-200 mb-0.5">How Candidate Passwords Work:</p>
                <p>
                  Candidates use their <strong>Name or Email</strong> along with their <strong>assigned Password</strong> to log in on the <code className="text-purple-300">/teams</code> portal. Copy the password above and send it to the candidate along with their interview date.
                </p>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
