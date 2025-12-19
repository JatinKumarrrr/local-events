import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiHome, HiCalendar, HiTicket, HiPlus, HiSearch, HiLogout, HiMenu, HiX, HiUserCircle } from 'react-icons/hi';

export default function DashboardLayout({ children, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    console.log('🚪 User logging out from dashboard');
    if (onLogout) onLogout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Navigation items based on role
  const navItems = [
    { path: '/dashboard', icon: HiHome, label: 'Dashboard', visible: true },
    { path: '/events', icon: HiCalendar, label: 'All Events', visible: true },
    { path: '/my-rsvps', icon: HiTicket, label: 'My RSVPs', visible: true },
    { path: '/events/create', icon: HiPlus, label: 'Create Event', visible: user?.role === 'organizer' },
  ].filter(item => item.visible);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-30">
        <div className="h-full flex items-center justify-between px-4 lg:px-6">
          
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <HiX className="w-6 h-6 text-slate-700" />
              ) : (
                <HiMenu className="w-6 h-6 text-slate-700" />
              )}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-display font-bold text-lg text-slate-900 hidden sm:block">LocalEvents</span>
            </Link>
          </div>

          {/* Center: Search (hidden on mobile) */}
          {/* <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                onFocus={() => console.log('🔍 Search focused')}
              />
            </div>
          </div> */}

          {/* Right: User Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-slate-100 rounded-lg">
              <HiUserCircle className="w-5 h-5 text-slate-600" />
              <div className="text-sm">
                <p className="font-semibold text-slate-900">{user?.name}</p>
                {user?.role === 'organizer' && (
                  <p className="text-xs text-amber-600">Organizer</p>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Logout"
            >
              <HiLogout className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-20 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  active
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
          <div className="text-xs text-slate-500 text-center">
            <p>© 2025 LocalEvents</p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
