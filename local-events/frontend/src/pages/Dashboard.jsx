import React from 'react';
import { Link } from 'react-router-dom';
import { HiCalendar, HiTicket, HiPlus, HiSparkles, HiTrendingUp } from 'react-icons/hi';

export default function Dashboard({ user }) {
  console.log('📊 Dashboard loaded for user:', user);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-2 mb-2">
          <HiSparkles className="w-6 h-6" />
          <span className="text-sm font-semibold uppercase tracking-wide">Welcome Back</span>
        </div>
        <h1 className="text-4xl font-display font-bold mb-2">
          Hello, {user?.name}! 👋
        </h1>
        <p className="text-amber-50 text-lg">
          {user?.role === 'organizer' 
            ? 'Ready to create amazing events for your community?' 
            : 'Discover exciting events happening around you'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat Card 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <HiCalendar className="w-6 h-6 text-amber-600" />
            </div>
            <HiTrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">1,200+</p>
          <p className="text-sm text-slate-600">Active Events</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <HiTicket className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">NEW</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">0</p>
          <p className="text-sm text-slate-600">Your RSVPs</p>
        </div>

        {/* Stat Card 3 */}
        {user?.role === 'organizer' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <HiPlus className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">0</p>
            <p className="text-sm text-slate-600">Events Created</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/events"
            className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
          >
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <HiCalendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Browse All Events</p>
              <p className="text-sm text-slate-600">Discover what's happening</p>
            </div>
          </Link>

          {user?.role === 'organizer' && (
            <Link
              to="/events/create"
              className="flex items-center gap-4 p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors group border border-amber-200"
            >
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Create New Event</p>
                <p className="text-sm text-amber-700">Start organizing now</p>
              </div>
            </Link>
          )}

          <Link
            to="/my-rsvps"
            className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <HiTicket className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">My RSVPs</p>
              <p className="text-sm text-slate-600">Manage your bookings</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Placeholder for upcoming features */}
      <div className="bg-slate-100 rounded-xl p-8 text-center border-2 border-dashed border-slate-300">
        <p className="text-slate-500 font-medium">More dashboard features coming soon! 🚀</p>
      </div>
    </div>
  );
}
