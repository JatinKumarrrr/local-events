import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
      
      {/* Minimal Top Bar */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2  backdrop-blur-sm   transition-all group"
        >
          <HiArrowLeft className="w-4 h-4 text-slate-600 group-hover:-translate-x-1 transition-transform" />
          <span className="font-display font-bold text-slate-900">LocalEvents</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
