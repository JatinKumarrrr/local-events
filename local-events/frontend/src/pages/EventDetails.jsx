import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { HiCalendar, HiLocationMarker, HiUsers, HiUser, HiMail, HiArrowLeft, HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function EventDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  async function loadEvent() {
    setLoading(true);
    console.log("📅 Loading event:", id);
    try {
      const ev = await api.get(`/events/${id}`);
      console.log("✅ Event loaded:", ev);
      setEventData(ev);
    } catch (err) {
      console.error("❌ Failed to load event:", err);
      alert(err.data?.msg || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function doRsvp() {
    if (!user) return alert("Please login to RSVP");
    setActionLoading(true);
    console.log("🎫 RSVPing to event:", id);
    try {
      await api.post(`/events/${id}/rsvp`);
      console.log("✅ RSVP successful");
      await loadEvent();
    } catch (err) {
      console.error("❌ RSVP failed:", err);
      alert(err.data?.msg || err.message);
    } finally {
      setActionLoading(false);
    }
  }

  async function doCancel() {
    setActionLoading(true);
    console.log("❌ Cancelling RSVP for event:", id);
    try {
      await api.del(`/events/${id}/rsvp`);
      console.log("✅ RSVP cancelled");
      await loadEvent();
    } catch (err) {
      console.error("❌ Cancel failed:", err);
      alert(err.data?.msg || err.message);
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    if (id) loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-slate-600">No event found.</p>
      </div>
    );
  }

  const isRsvped = eventData.rsvps?.some(
    (r) => r.user?._id === user?.id || r.user === user?.id
  );

  const isFull = eventData.maxAttendees && eventData.rsvps?.length >= eventData.maxAttendees;
  const isOrganizer = eventData.organizer?._id === user?.id;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/events')}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
      >
        <HiArrowLeft className="w-4 h-4" />
        Back to Events
      </button>

      {/* Hero Card */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 md:p-12 text-white">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <HiCalendar className="w-8 h-8" />
            </div>
            <div>
              <p className="text-amber-50 text-sm font-medium">
                {new Date(eventData.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-2xl font-bold">
                {new Date(eventData.date).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>

          {isRsvped && (
            <div className="bg-green-500 px-4 py-2 rounded-lg flex items-center gap-2">
              <HiCheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">You're Going!</span>
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          {eventData.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-amber-50">
          <div className="flex items-center gap-2">
            <HiLocationMarker className="w-5 h-5" />
            <span className="font-medium">{eventData.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <HiUsers className="w-5 h-5" />
            <span className="font-medium">
              {eventData.rsvps?.length || 0} attending
              {eventData.maxAttendees && ` / ${eventData.maxAttendees} max`}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Description Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-display font-bold text-slate-900 mb-4">About This Event</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {eventData.description || "No description provided."}
            </p>
          </div>

          {/* Organizer Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Organized By</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <HiUser className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-lg">{eventData.organizer?.name}</p>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <HiMail className="w-4 h-4" />
                  {eventData.organizer?.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* RSVP Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-6">
            <h3 className="font-display font-bold text-slate-900 mb-4">Event Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Attendees</span>
                <span className="font-semibold text-slate-900">
                  {eventData.rsvps?.length || 0}
                  {eventData.maxAttendees && ` / ${eventData.maxAttendees}`}
                </span>
              </div>

              {isFull && !isRsvped && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
                  <HiXCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Event is at full capacity</span>
                </div>
              )}

              {!user && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-amber-900 mb-3">Please login to RSVP</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition-all"
                  >
                    Login
                  </button>
                </div>
              )}

              {user && !isOrganizer && !isRsvped && (
                <button
                  onClick={doRsvp}
                  disabled={actionLoading || isFull}
                  className="w-full py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Processing..." : isFull ? "Event Full" : "RSVP Now"}
                </button>
              )}

              {user && !isOrganizer && isRsvped && (
                <button
                  onClick={doCancel}
                  disabled={actionLoading}
                  className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all disabled:opacity-50"
                >
                  {actionLoading ? "Processing..." : "Cancel RSVP"}
                </button>
              )}

              {isOrganizer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-900 font-medium">You're the organizer</p>
                </div>
              )}
              
            </div>
          </div>
          

          {/* Category Badge (if exists) */}
          {eventData.category && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide mb-1">Category</p>
              <p className="text-amber-900 font-medium">{eventData.category}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
