import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AppLayout({ children, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on landing page for different navbar style
  const isLanding = location.pathname === '/';

  const handleLogout = () => {
    console.log('🚪 User logging out');
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* Navbar - conditional styling */}
      <nav className={`sticky top-0 z-50 backdrop-blur-sm ${
        isLanding 
          ? 'bg-transparent border-b border-amber-100/20' 
          : 'bg-white/80 border-b border-amber-200 shadow-sm'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-display font-bold text-xl text-slate-900">LocalEvents</span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/events" 
                className="text-slate-700 hover:text-amber-600 font-medium transition-colors"
              >
                Events
              </Link>

              {!user && (
                <>
                  <Link 
                    to="/login" 
                    className="text-slate-700 hover:text-amber-600 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium shadow-sm hover:shadow transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {user && (
                <>
                  {/* Organizer-specific button */}
                  {user.role === 'organizer' && (
                    <Link 
                      to="/events/create"
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium shadow-sm hover:shadow transition-all"
                    >
                      + Create Event
                    </Link>
                  )}

                  {/* User menu */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-slate-600">
                      Hi, <span className="font-semibold text-slate-900">{user.name}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-slate-700 hover:text-amber-600 font-medium border border-slate-300 rounded-lg hover:border-amber-400 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200 mt-16">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-600 text-sm">
              © 2025 LocalEvents. Built with ❤️ for communities.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-600 hover:text-amber-600 text-sm transition-colors">About</a>
              <a href="#" className="text-slate-600 hover:text-amber-600 text-sm transition-colors">Contact</a>
              <a href="#" className="text-slate-600 hover:text-amber-600 text-sm transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
