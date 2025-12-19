import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiCalendar, HiTicket, HiPlus, HiUsers } from 'react-icons/hi';
import { api } from '../api/api';

export default function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalEvents: 0,
    myRSVPs: 0,
    myEvents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      console.log('📊 Loading dashboard stats for user:', user);
      try {
        // Fetch all events
        const events = await api.get('/events');
        
        // Calculate stats
        const myRSVPs = events.filter(ev => 
          ev.rsvps?.some(rsvp => rsvp.user?._id === user?.id || rsvp.user === user?.id)
        ).length;

        const myEvents = user?.role === 'organizer' 
          ? events.filter(ev => ev.organizer?._id === user?.id).length 
          : 0;

        setStats({
          totalEvents: events.length,
          myRSVPs,
          myEvents,
        });

        console.log('✅ Stats loaded:', { totalEvents: events.length, myRSVPs, myEvents });
      } catch (err) {
        console.error('❌ Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    }

    if (user) loadStats();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-amber-50 text-lg">
          {user?.role === 'organizer' 
            ? 'Manage your events and discover new ones' 
            : 'Discover events happening in your community'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Events */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <HiCalendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 bg-slate-100 rounded animate-pulse mb-1"></div>
          ) : (
            <p className="text-3xl font-bold text-slate-900 mb-1">{stats.totalEvents}</p>
          )}
          <p className="text-sm text-slate-600">Available Events</p>
        </div>

        {/* My RSVPs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <HiTicket className="w-6 h-6 text-green-600" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 bg-slate-100 rounded animate-pulse mb-1"></div>
          ) : (
            <p className="text-3xl font-bold text-slate-900 mb-1">{stats.myRSVPs}</p>
          )}
          <p className="text-sm text-slate-600">Your RSVPs</p>
        </div>

        {/* Events Created (Organizers Only) */}
        {user?.role === 'organizer' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <HiUsers className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            {loading ? (
              <div className="h-8 bg-slate-100 rounded animate-pulse mb-1"></div>
            ) : (
              <p className="text-3xl font-bold text-slate-900 mb-1">{stats.myEvents}</p>
            )}
            <p className="text-sm text-slate-600">Events Created</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-display font-bold text-slate-900 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Browse Events */}
          <Link
            to="/events"
            className="flex items-center gap-4 p-5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group border border-slate-200 hover:border-slate-300"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <HiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Browse Events</p>
              <p className="text-sm text-slate-600">Find events to attend</p>
            </div>
          </Link>

          {/* My RSVPs */}
          <Link
            to="/my-rsvps"
            className="flex items-center gap-4 p-5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group border border-slate-200 hover:border-slate-300"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <HiTicket className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">My RSVPs</p>
              <p className="text-sm text-slate-600">View your bookings</p>
            </div>
          </Link>

          {/* Create Event (Organizers) */}
          {user?.role === 'organizer' && (
            <Link
              to="/events/create"
              className="flex items-center gap-4 p-5 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all group border border-amber-200 hover:border-amber-300"
            >
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Create Event</p>
                <p className="text-sm text-amber-700">Organize something new</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Getting Started (Only if user has no activity) */}
      {!loading && stats.myRSVPs === 0 && stats.myEvents === 0 && (
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-8">
          <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
            Get Started
          </h3>
          <p className="text-slate-600 mb-6">
            {user?.role === 'organizer' 
              ? 'Create your first event or browse existing ones to join the community.'
              : 'Start by browsing events and RSVP to the ones you like.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/events"
              className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-all"
            >
              Browse Events
            </Link>
            {user?.role === 'organizer' && (
              <Link
                to="/events/create"
                className="px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition-all"
              >
                Create Your First Event
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
