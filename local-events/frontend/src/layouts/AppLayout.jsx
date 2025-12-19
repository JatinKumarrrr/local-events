import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiMenu, HiX, HiPlus, HiLogout, HiCalendar, HiHome, HiInformationCircle, HiMail } from 'react-icons/hi';

export default function AppLayout({ children, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const isLanding = location.pathname === '/';

  // Scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show navbar at the very top
        setScrollDirection('up');
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setScrollDirection('down');
        console.log('📉 Scrolling down - hiding navbar');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setScrollDirection('up');
        console.log('📈 Scrolling up - showing navbar');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    console.log('🚪 User logging out');
    if (onLogout) onLogout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      
      {/* Floating Dock Navbar with Scroll Hide */}
      <nav 
        className={`fixed left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 ${
          scrollDirection === 'down' ? '-top-24 opacity-0' : 'top-4 opacity-100'
        }`}
      >
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-lg shadow-slate-900/5 px-6 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link 
              to="/" 
              onClick={closeMobileMenu}
              className="flex items-center space-x-2 group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-display font-bold text-xl text-slate-900 hidden sm:block">LocalEvents</span>
            </Link>

            {/* Desktop Nav Links - More content */}
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-all inline-flex items-center gap-2"
              >
                <HiHome className="w-4 h-4" />
                Home
              </Link>

              <Link 
                to="/events" 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-all inline-flex items-center gap-2"
              >
                <HiCalendar className="w-4 h-4" />
                Events
              </Link>

              <button
                onClick={() => scrollToSection('features')}
                className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-all inline-flex items-center gap-2"
              >
                <HiInformationCircle className="w-4 h-4" />
                Features
              </button>

              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-all"
              >
                How it Works
              </button>

              {user?.role === 'organizer' && (
                <Link 
                  to="/events/create"
                  className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-medium transition-all inline-flex items-center gap-2 shadow-sm hover:shadow ml-2"
                >
                  <HiPlus className="w-4 h-4" />
                  Create
                </Link>
              )}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-2">
              {!user && (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-all"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium transition-all shadow-sm hover:shadow"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {user && (
                <div className="flex items-center gap-3">
                  <div className="px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                    <span className="text-sm text-slate-600">
                      Hi, <span className="font-semibold text-slate-900">{user.name}</span>
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all inline-flex items-center gap-2"
                  >
                    <HiLogout className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
            >
              {mobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-slate-200 space-y-2">
              <Link 
                to="/"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-all"
              >
                <div className="flex items-center gap-2">
                  <HiHome className="w-5 h-5" />
                  Home
                </div>
              </Link>

              <Link 
                to="/events"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-all"
              >
                <div className="flex items-center gap-2">
                  <HiCalendar className="w-5 h-5" />
                  Events
                </div>
              </Link>

              <button
                onClick={() => scrollToSection('features')}
                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-all"
              >
                <div className="flex items-center gap-2">
                  <HiInformationCircle className="w-5 h-5" />
                  Features
                </div>
              </button>

              <button
                onClick={() => scrollToSection('how-it-works')}
                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-all"
              >
                How it Works
              </button>

              {user?.role === 'organizer' && (
                <Link 
                  to="/events/create"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-medium transition-all"
                >
                  <div className="flex items-center gap-2">
                    <HiPlus className="w-5 h-5" />
                    Create Event
                  </div>
                </Link>
              )}

              <div className="pt-2 border-t border-slate-200">
                {!user && (
                  <>
                    <Link 
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-all"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium transition-all text-center mt-2"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                {user && (
                  <>
                    <div className="px-4 py-3 bg-amber-50 rounded-lg border border-amber-200 mb-2">
                      <span className="text-sm text-slate-600">
                        Hi, <span className="font-semibold text-slate-900">{user.name}</span>
                      </span>
                      {user.role === 'organizer' && (
                        <span className="ml-2 text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
                          Organizer
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all text-left"
                    >
                      <div className="flex items-center gap-2">
                        <HiLogout className="w-5 h-5" />
                        Logout
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200 mt-16">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-600 text-sm">
             Thanks For Visiting
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
