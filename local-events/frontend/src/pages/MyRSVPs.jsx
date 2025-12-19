import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import {
  HiCalendar,
  HiLocationMarker,
  HiUsers,
  HiTicket,
  HiCheckCircle,
  HiClock,
} from "react-icons/hi";

export default function MyRSVPs({ user }) {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'past'
  const [cancelingId, setCancelingId] = useState(null);

  const loadEvents = async () => {
    setLoading(true);
    console.log("🎫 Loading all events to filter RSVPs for user:", user?.id);
    try {
      const events = await api.get("/events");
      console.log("✅ Events loaded:", events.length);
      setAllEvents(events);
    } catch (err) {
      console.error("❌ Failed to load events:", err);
      alert(err.data?.msg || "Failed to load events");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) loadEvents();
  }, [user]);

  // Filter events where user has RSVP'd
  const myRSVPEvents = allEvents.filter((event) =>
    event.rsvps?.some(
      (rsvp) => rsvp.user?._id === user?.id || rsvp.user === user?.id
    )
  );

  // Split into upcoming and past
  const now = new Date();
  const upcomingEvents = myRSVPEvents.filter((ev) => new Date(ev.date) >= now);
  const pastEvents = myRSVPEvents.filter((ev) => new Date(ev.date) < now);

  const displayEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const handleCancelRSVP = async (eventId, eventTitle) => {
    const confirmed = window.confirm(
      `Cancel your RSVP for "${eventTitle}"?\n\nYou can always RSVP again later.`
    );

    if (!confirmed) return;

    setCancelingId(eventId);
    console.log("❌ Cancelling RSVP for event:", eventId);

    try {
      await api.del(`/events/${eventId}/rsvp`);
      console.log("✅ RSVP cancelled");
      // Reload events to refresh the list
      await loadEvents();
    } catch (err) {
      console.error("❌ Failed to cancel RSVP:", err);
      alert(err.data?.msg || err.message);
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">
            My RSVPs
          </h1>
          <p className="text-slate-600 mt-1">Events you're attending</p>
        </div>
        <div className="bg-amber-100 px-4 py-2 rounded-lg">
          <p className="text-sm text-amber-800 font-semibold">
            {myRSVPEvents.length} Total RSVPs
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 inline-flex gap-2">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeTab === "upcoming"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <div className="flex items-center gap-2">
            <HiClock className="w-4 h-4" />
            Upcoming ({upcomingEvents.length})
          </div>
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeTab === "past"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <div className="flex items-center gap-2">
            <HiCheckCircle className="w-4 h-4" />
            Past ({pastEvents.length})
          </div>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
        </div>
      )}

      {/* Events Grid */}
      {!loading && displayEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((ev) => {
            const isEventEnded = new Date(ev.date) < new Date();

            return (
              <div
                key={ev._id}
                className={`group bg-white rounded-xl border hover:shadow-lg transition-all overflow-hidden ${
                  isEventEnded
                    ? "border-slate-300 opacity-75"
                    : "border-slate-200 hover:border-amber-300"
                }`}
              >
                {/* Event Card Header */}
                <div
                  className={`p-4 relative ${
                    isEventEnded || activeTab === "past"
                      ? "bg-gradient-to-r from-slate-400 to-slate-500"
                      : "bg-gradient-to-r from-green-500 to-emerald-500"
                  }`}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <HiCalendar className="w-5 h-5" />
                      <span className="font-semibold text-sm">
                        {new Date(ev.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiCheckCircle className="w-4 h-4" />
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {new Date(ev.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* ENDED Badge */}
                  {isEventEnded && (
                    <div className="absolute top-2 left-2">
                      <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full shadow-lg">
                        ENDED
                      </span>
                    </div>
                  )}
                </div>

                {/* Event Card Body */}
                <div className="p-5 space-y-3">
                  <h3
                    className={`text-lg font-display font-bold transition-colors line-clamp-2 ${
                      isEventEnded
                        ? "text-slate-600"
                        : "text-slate-900 group-hover:text-amber-600"
                    }`}
                  >
                    {ev.title}
                  </h3>

                  {ev.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {ev.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <HiLocationMarker className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <HiUsers className="w-4 h-4" />
                    <span className="font-medium">
                      {ev.rsvps?.length || 0} attending
                    </span>
                    {ev.maxAttendees && (
                      <span className="text-slate-400">
                        / {ev.maxAttendees}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-slate-100">
                    <Link
                      to={`/events/${ev._id}`}
                      className="flex-1 py-2 px-4 bg-slate-900 text-white text-center rounded-lg hover:bg-slate-800 font-medium text-sm transition-all"
                    >
                      View Details
                    </Link>
                    {activeTab === "upcoming" && !isEventEnded && (
                      <button
                        onClick={() => handleCancelRSVP(ev._id, ev.title)}
                        disabled={cancelingId === ev._id}
                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium text-sm transition-all disabled:opacity-50"
                        title="Cancel RSVP"
                      >
                        {cancelingId === ev._id ? "..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && displayEvents.length === 0 && (
        <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiTicket className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
            {activeTab === "upcoming" ? "No Upcoming RSVPs" : "No Past RSVPs"}
          </h3>
          <p className="text-slate-600 mb-6">
            {activeTab === "upcoming"
              ? "You haven't RSVP'd to any upcoming events yet. Discover events to attend!"
              : "You haven't attended any events yet."}
          </p>
          {activeTab === "upcoming" && (
            <Link
              to="/events"
              className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-all"
            >
              Browse Events
            </Link>
          )}
        </div>
      )}

      {/* Summary Card */}
      {!loading && myRSVPEvents.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">
                Your Event Activity
              </p>
              <p className="text-2xl font-display font-bold text-slate-900">
                {upcomingEvents.length} upcoming, {pastEvents.length} attended
              </p>
            </div>
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <HiTicket className="w-8 h-8 text-amber-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
