import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import { HiMail, HiLockClosed, HiArrowRight } from "react-icons/hi";

export default function Login({ onLogin }) {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("🔐 Logging in user:", { email });

    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("✅ Login successful:", res);

      const userObj = {
        id: res.user.id || res.user._id,
        name: res.user.name,
        role: res.user.role,
        email: res.user.email,
      };

      if (onLogin) onLogin(userObj, res.token);
      nav("/events");
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.data?.msg || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      
      {/* Left Side - Branding & Illustration */}
      <div className="hidden md:block space-y-6">

        
        <h1 className="text-5xl font-display font-bold text-slate-900 leading-tight">
          Continue your journey with local events
        </h1>
        
        <p className="text-lg text-slate-600 leading-relaxed">
          Sign in to manage your events, RSVPs, and connect with your community.
        </p>

        {/* Benefits */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-700 font-medium">Access your personalized event feed</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-700 font-medium">Manage your RSVPs and bookings</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-700 font-medium">Create and organize your own events</span>
          </div>
        </div>

        {/* Illustration - Community/Login Theme */}
        <div className="pt-8">
          <svg viewBox="0 0 500 400" className="w-full max-w-lg">
            {/* Background elements */}
            <circle cx="250" cy="200" r="150" fill="#FEF3C7" opacity="0.3"/>
            <circle cx="100" cy="100" r="40" fill="#FDBA74" opacity="0.4"/>
            <circle cx="400" cy="300" r="50" fill="#FCD34D" opacity="0.4"/>
            
            {/* Login screen/device */}
            <rect x="150" y="80" width="200" height="280" rx="20" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
            <rect x="165" y="95" width="170" height="8" rx="4" fill="#E5E7EB"/>
            
            {/* Screen content - Login form visual */}
            <circle cx="250" cy="150" r="30" fill="#F59E0B"/>
            <path d="M 235 145 Q 250 135 265 145" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <circle cx="242" cy="148" r="3" fill="white"/>
            <circle cx="258" cy="148" r="3" fill="white"/>
            
            {/* Input fields representation */}
            <rect x="180" y="200" width="140" height="20" rx="4" fill="#F3F4F6"/>
            <rect x="185" y="205" width="20" height="10" rx="2" fill="#CBD5E1"/>
            
            <rect x="180" y="235" width="140" height="20" rx="4" fill="#F3F4F6"/>
            <rect x="185" y="240" width="20" height="10" rx="2" fill="#CBD5E1"/>
            
            {/* Button */}
            <rect x="180" y="275" width="140" height="30" rx="8" fill="#1E293B"/>
            
            {/* Character on left */}
            <ellipse cx="100" cy="330" rx="35" ry="6" fill="#CBD5E1" opacity="0.3"/>
            <circle cx="100" cy="280" r="22" fill="#FDBA74"/>
            <rect x="82" y="302" width="36" height="50" rx="18" fill="#FB923C"/>
            <rect x="70" y="310" width="25" height="8" rx="4" fill="#FB923C"/>
            <rect x="105" y="310" width="25" height="8" rx="4" fill="#FB923C"/>
            
            {/* Character on right */}
            <ellipse cx="400" cy="330" rx="35" ry="6" fill="#CBD5E1" opacity="0.3"/>
            <circle cx="400" cy="280" r="22" fill="#FCD34D"/>
            <rect x="382" y="302" width="36" height="50" rx="18" fill="#F59E0B"/>
            <rect x="370" y="310" width="25" height="8" rx="4" fill="#F59E0B"/>
            <rect x="405" y="310" width="25" height="8" rx="4" fill="#F59E0B"/>
            
            {/* Floating icons/elements */}
            <circle cx="80" cy="180" r="12" fill="#FCD34D" opacity="0.6"/>
            <path d="M 80 175 L 85 180 L 80 185 L 75 180 Z" fill="white"/>
            
            <circle cx="420" cy="150" r="15" fill="#FB923C" opacity="0.6"/>
            <rect x="413" y="145" width="14" height="10" rx="2" fill="white"/>
            
            {/* Connection lines */}
            <path d="M 130 300 Q 190 250 210 220" stroke="#F59E0B" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.5"/>
            <path d="M 370 300 Q 310 250 290 220" stroke="#FB923C" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.5"/>
          </svg>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 md:p-10">
          
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-600">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="login-email"
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

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="block text-sm font-semibold text-slate-900">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  onClick={() => console.log('🔑 Forgot password clicked')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">⚠️ {error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 group"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Don't have an account?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            to="/register"
            className="w-full py-3 px-4 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-semibold hover:bg-amber-100 transition-all text-center block"
          >
            Create Account
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Having trouble signing in?{" "}
            <button 
              className="font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              onClick={() => console.log('💬 Contact support clicked')}
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
