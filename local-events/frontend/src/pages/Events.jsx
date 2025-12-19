import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import {
  HiSearch,
  HiCalendar,
  HiLocationMarker,
  HiUsers,
  HiFilter,
  HiX,
} from "react-icons/hi";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    console.log("📅 Loading events with filters:", { search, cityFilter });
    try {
      let path = "/events?";
      if (search) path += `q=${encodeURIComponent(search)}&`;
      if (cityFilter) path += `city=${encodeURIComponent(cityFilter)}&`;

      const res = await api.get(path);
      console.log("✅ Events loaded:", res.length);
      setEvents(res);
    } catch (err) {
      console.error("❌ Failed to load events:", err);
      alert(err.data?.msg || "Failed to load events");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const clearFilters = () => {
    setSearch("");
    setCityFilter("");
    console.log("🧹 Filters cleared");
  };

  const hasFilters = search || cityFilter;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">
            All Events
          </h1>
          <p className="text-slate-600 mt-1">
            Discover amazing events happening around you
          </p>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <HiFilter className="w-5 h-5 text-slate-600" />
          <h2 className="font-semibold text-slate-900">Search & Filters</h2>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-sm text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-1"
            >
              <HiX className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search events by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && loadEvents()}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiLocationMarker className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Filter by city..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && loadEvents()}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={loadEvents}
            disabled={loading}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-all disabled:opacity-50 inline-flex items-center gap-2"
          >
            <HiSearch className="w-4 h-4" />
            {loading ? "Searching..." : "Search Events"}
          </button>
        </div>
      </div>

      {/* Results Count */}
      {!loading && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Found{" "}
            <span className="font-semibold text-slate-900">
              {events.length}
            </span>{" "}
            events
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
        </div>
      )}

      {/* Events Grid */}
      {!loading && events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => {
            const isPastEvent = new Date(ev.date) < new Date();

            return (
              <Link
                key={ev._id}
                to={`/events/${ev._id}`}
                className={`group bg-white rounded-xl border hover:shadow-lg transition-all overflow-hidden ${
                  isPastEvent
                    ? "border-slate-300 opacity-75"
                    : "border-slate-200 hover:border-amber-300"
                }`}
              >
                {/* Event Card Header - Date Badge */}
                <div
                  className={`p-4 relative ${
                    isPastEvent
                      ? "bg-gradient-to-r from-slate-400 to-slate-500"
                      : "bg-gradient-to-r from-amber-500 to-orange-500"
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
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {new Date(ev.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* ENDED Badge - NEW */}
                  {isPastEvent && (
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
                      isPastEvent
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

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <HiUsers className="w-4 h-4" />
                      <span className="font-medium">
                        {ev.rsvps?.length || 0}
                      </span>
                      {ev.maxAttendees && (
                        <span className="text-slate-400">
                          / {ev.maxAttendees}
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-sm font-semibold group-hover:translate-x-1 transition-transform ${
                        isPastEvent ? "text-slate-500" : "text-amber-600"
                      }`}
                    >
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && events.length === 0 && (
        <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiCalendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
            No events found
          </h3>
          <p className="text-slate-600 mb-6">
            {hasFilters
              ? "Try adjusting your search filters to find more events."
              : "Be the first to create an event for your community!"}
          </p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
