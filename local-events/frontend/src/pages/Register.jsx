import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import { HiUser, HiMail, HiLockClosed, HiUserGroup, HiClipboardList, HiSparkles } from "react-icons/hi";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("📝 Registering user:", { name, email, role });

    try {
      const res = await api.post("/auth/register", { name, email, password, role });
      console.log("✅ Registration successful:", res);
      
      const userObj = {
        id: res.user.id || res.user._id,
        name: res.user.name,
        role: res.user.role,
        email: res.user.email,
      };
      
      if (onRegister) onRegister(userObj, res.token);
      nav("/events");
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError(err.data?.msg || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      
      {/* Left Side - Branding */}
      <div className="hidden md:block space-y-6">
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-amber-200">
          <HiSparkles className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-slate-900">Join the Community</span>
        </div> */}
        
        <h1 className="text-5xl font-display font-bold text-slate-900 leading-tight">
          Start discovering amazing local events
        </h1>
        
        <p className="text-lg text-slate-600 leading-relaxed">
          Whether you're looking to attend exciting events or create your own, LocalEvents makes it simple and fun.
        </p>

        {/* Feature List */}
        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <HiUserGroup className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">For Attendees</h3>
              <p className="text-sm text-slate-600">Discover and RSVP to local events instantly</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <HiClipboardList className="w-5 h-5 text-orange-700" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">For Organizers</h3>
              <p className="text-sm text-slate-600">Create and manage events effortlessly</p>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="pt-8">
          <svg viewBox="0 0 400 300" className="w-full max-w-md">
            <circle cx="200" cy="150" r="120" fill="#FEF3C7" opacity="0.3"/>
            <rect x="120" y="80" width="160" height="140" rx="12" fill="white" opacity="0.9"/>
            <rect x="135" y="100" width="130" height="30" rx="6" fill="#F59E0B"/>
            <rect x="135" y="145" width="130" height="20" rx="4" fill="#CBD5E1"/>
            <rect x="135" y="175" width="90" height="20" rx="4" fill="#CBD5E1"/>
            <circle cx="90" cy="120" r="30" fill="#FDBA74"/>
            <rect x="70" cy="150" width="40" height="50" rx="20" fill="#FB923C"/>
            <circle cx="310" cy="180" r="25" fill="#FCD34D"/>
            <rect x="295" y="205" width="30" height="40" rx="15" fill="#F59E0B"/>
          </svg>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 md:p-10">
          
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              Create Account
            </h2>
            <p className="text-slate-600">
              Get started with LocalEvents today
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                I want to...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRole("user");
                    console.log("👤 Role selected: user");
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === "user"
                      ? "border-amber-500 bg-amber-50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <HiUserGroup className={`w-7 h-7 mx-auto mb-2 ${
                    role === "user" ? "text-amber-600" : "text-slate-400"
                  }`} />
                  <p className={`font-semibold text-sm ${
                    role === "user" ? "text-slate-900" : "text-slate-600"
                  }`}>
                    Attend Events
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole("organizer");
                    console.log("🎯 Role selected: organizer");
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === "organizer"
                      ? "border-amber-500 bg-amber-50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <HiClipboardList className={`w-7 h-7 mx-auto mb-2 ${
                    role === "organizer" ? "text-amber-600" : "text-slate-400"
                  }`} />
                  <p className={`font-semibold text-sm ${
                    role === "organizer" ? "text-slate-900" : "text-slate-600"
                  }`}>
                    Create Events
                  </p>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="reg-name" className="block text-sm font-semibold text-slate-900 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="block text-sm font-semibold text-slate-900 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="reg-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Must be at least 6 characters
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">⚠️ {error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
