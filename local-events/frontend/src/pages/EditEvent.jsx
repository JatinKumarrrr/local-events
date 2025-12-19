import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { HiCalendar, HiLocationMarker, HiUsers, HiDocumentText, HiTag, HiArrowLeft } from "react-icons/hi";

export default function EditEvent({ user }) {
  const nav = useNavigate();
  const { id } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [category, setCategory] = useState("");
  const [saving, setSaving] = useState(false);

  // Load existing event data
  useEffect(() => {
    async function loadEvent() {
      console.log("📝 Loading event for editing:", id);
      try {
        const ev = await api.get(`/events/${id}`);
        console.log("✅ Event loaded:", ev);
        
        // Check if user is the organizer
        if (ev.organizer?._id !== user?.id) {
          alert("You can only edit your own events");
          nav(`/events/${id}`);
          return;
        }
        
        // Pre-fill form
        setTitle(ev.title);
        setDescription(ev.description || "");
        setLocation(ev.location);
        setMaxAttendees(ev.maxAttendees || "");
        setCategory(ev.category || "");
        
        // Format date for datetime-local input
        const eventDate = new Date(ev.date);
        const formatted = eventDate.toISOString().slice(0, 16);
        setDate(formatted);
        
      } catch (err) {
        console.error("❌ Failed to load event:", err);
        alert(err.data?.msg || "Failed to load event");
        nav('/events');
      } finally {
        setLoading(false);
      }
    }
    
    if (id && user) loadEvent();
  }, [id, user, nav]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    console.log("💾 Updating event:", id);
    
    try {
      const payload = {
        title,
        description,
        date: new Date(date).toISOString(),
        location,
        maxAttendees: maxAttendees ? parseInt(maxAttendees, 10) : undefined,
        category: category || undefined,
      };
      
      await api.put(`/events/${id}`, payload);
      console.log("✅ Event updated successfully");
      alert("Event updated successfully!");
      nav(`/events/${id}`);
    } catch (err) {
      console.error("❌ Failed to update event:", err);
      alert(err.data?.msg || err.message || "Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  if (!user || user.role !== "organizer") {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-600">Only organizers can edit events.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Back Button */}
      <button
        onClick={() => nav(`/events/${id}`)}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors mb-6"
      >
        <HiArrowLeft className="w-4 h-4" />
        Back to Event
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Edit Event</h1>
        <p className="text-slate-600">Update the details of your event</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <form onSubmit={submit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">
              Event Title *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiTag className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Summer Music Festival"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
              Description
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <HiDocumentText className="h-5 w-5 text-slate-400" />
              </div>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell people about your event..."
                rows={5}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none resize-none"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-slate-900 mb-2">
              Date & Time *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiCalendar className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="date"
                type="datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-slate-900 mb-2">
              Location *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiLocationMarker className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="location"
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Central Park, New York"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-slate-900 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
            >
              <option value="">Select a category...</option>
              <option value="Business">Business</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Arts">Arts</option>
              <option value="Workshops">Workshops</option>
              <option value="Meetups">Meetups</option>
              <option value="Community">Community</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Max Attendees */}
          <div>
            <label htmlFor="maxAttendees" className="block text-sm font-semibold text-slate-900 mb-2">
              Maximum Attendees
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiUsers className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="maxAttendees"
                type="number"
                min="1"
                value={maxAttendees}
                onChange={(e) => setMaxAttendees(e.target.value)}
                placeholder="Leave empty for unlimited"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Note: You cannot reduce capacity below current RSVPs
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => nav(`/events/${id}`)}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 px-6 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
