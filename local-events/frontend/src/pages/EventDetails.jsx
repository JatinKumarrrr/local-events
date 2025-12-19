import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { HiCalendar, HiLocationMarker, HiUsers, HiUser, HiMail, HiArrowLeft, HiCheckCircle, HiXCircle, HiPencil, HiTrash } from "react-icons/hi";

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

  async function handleDelete() {
    const confirmed = window.confirm(
      "⚠️ Are you sure you want to delete this event?\n\nThis will:\n• Remove the event permanently\n• Cancel all RSVPs\n• This action cannot be undone"
    );
    
    if (!confirmed) return;
    
    setActionLoading(true);
    console.log("🗑️ Deleting event:", id);
    
    try {
      await api.del(`/events/${id}`);
      console.log("✅ Event deleted successfully");
      alert("✅ Event deleted successfully!");
      navigate('/events');
    } catch (err) {
      console.error("❌ Failed to delete event:", err);
      alert(err.data?.msg || err.message || "Failed to delete event");
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
        <div className="bg-slate-100 rounded-2xl p-12">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiCalendar className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Event Not Found</h2>
          <p className="text-slate-600 mb-6">This event might have been deleted or doesn't exist.</p>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-all"
          >
            Browse All Events
          </button>
        </div>
      </div>
    );
  }

  const isRsvped = eventData.rsvps?.some(
    (r) => r.user?._id === user?.id || r.user === user?.id
  );

  const isFull = eventData.maxAttendees && eventData.rsvps?.length >= eventData.maxAttendees;
  const isOrganizer = eventData.organizer?._id === user?.id;
  const isPastEvent = new Date(eventData.date) < new Date();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/events')}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors group"
      >
        <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Events
      </button>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
              <HiCalendar className="w-8 h-8" />
            </div>
            <div>
              <p className="text-amber-50 text-sm font-medium mb-1">
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
              {isPastEvent && (
                <span className="inline-block mt-2 px-3 py-1 bg-slate-800 text-white text-xs font-semibold rounded-full">
                  Past Event
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {isRsvped && (
              <div className="bg-green-500 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                <HiCheckCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">You're Going!</span>
              </div>
            )}
            
            {isOrganizer && (
              <div className="bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                <HiUser className="w-5 h-5" />
                <span className="font-semibold text-sm">Your Event</span>
              </div>
            )}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
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
          {eventData.category && (
            <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">
              {eventData.category}
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Description Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
              About This Event
            </h2>
            {eventData.description ? (
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {eventData.description}
              </p>
            ) : (
              <p className="text-slate-400 italic">No description provided for this event.</p>
            )}
          </div>

          {/* Organizer Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
              Organized By
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HiUser className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-lg">{eventData.organizer?.name}</p>
                <div className="flex items-center gap-2 text-slate-600 text-sm mt-1">
                  <HiMail className="w-4 h-4" />
                  <a href={`mailto:${eventData.organizer?.email}`} className="hover:text-amber-600 transition-colors">
                    {eventData.organizer?.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Attendees Count Card */}
          {eventData.rsvps?.length > 0 && (
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium mb-1">Total Attendees</p>
                  <p className="text-3xl font-display font-bold text-slate-900">
                    {eventData.rsvps.length}
                  </p>
                </div>
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <HiUsers className="w-8 h-8 text-amber-600" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* RSVP Card */}
          {!isPastEvent && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-6">
              <h3 className="font-display font-bold text-slate-900 mb-4">Event Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Attendees</span>
                  <span className="font-semibold text-slate-900">
                    {eventData.rsvps?.length || 0}
                    {eventData.maxAttendees && ` / ${eventData.maxAttendees}`}
                  </span>
                </div>

                {/* Capacity Progress Bar */}
                {eventData.maxAttendees && (
                  <div className="space-y-2">
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          isFull ? 'bg-red-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min((eventData.rsvps?.length / eventData.maxAttendees) * 100, 100)}%` }}
                      />
                    </div>
                    {isFull && (
                      <p className="text-xs text-red-600 font-medium">Event is at full capacity</p>
                    )}
                  </div>
                )}

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
                    className="w-full py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                  >
                    {actionLoading ? "Processing..." : isFull ? "Event Full" : "RSVP Now"}
                  </button>
                )}

                {user && !isOrganizer && isRsvped && (
                  <button
                    onClick={doCancel}
                    disabled={actionLoading}
                    className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all disabled:opacity-50 shadow-sm hover:shadow"
                  >
                    {actionLoading ? "Processing..." : "Cancel RSVP"}
                  </button>
                )}

                {isOrganizer && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <HiCheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-blue-900 font-medium">You're the organizer</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Organizer Actions Card */}
          {isOrganizer && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-display font-bold text-slate-900 mb-4">Manage Event</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/events/${id}/edit`)}
                  className="w-full py-3 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition-all inline-flex items-center justify-center gap-2 shadow-sm hover:shadow"
                >
                  <HiPencil className="w-5 h-5" />
                  Edit Event
                </button>

                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2 shadow-sm hover:shadow"
                >
                  <HiTrash className="w-5 h-5" />
                  {actionLoading ? "Deleting..." : "Delete Event"}
                </button>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Event ID</span>
                <span className="font-mono text-xs text-slate-400">{eventData._id.slice(-8)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Created</span>
                <span className="text-slate-900 font-medium">
                  {new Date(eventData.createdAt).toLocaleDateString()}
                </span>
              </div>
              {eventData.category && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Category</span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">
                    {eventData.category}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
