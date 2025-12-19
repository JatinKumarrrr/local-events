import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { HiCalendar,HiDownload , HiUsers, HiUser, HiMail, HiArrowLeft } from "react-icons/hi";



export default function Attendees({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAttendees = async () => {
    setLoading(true);
    console.log("👥 Loading attendees for event:", id);
    
    try {
      // First get event details
      const event = await api.get(`/events/${id}`);
      console.log("✅ Event loaded:", event);
      
      // Check if user is organizer
      if (event.organizer?._id !== user?.id) {
        alert("Only the event organizer can view attendees");
        navigate(`/events/${id}`);
        return;
      }
      
      setEventData(event);
      
      // Get attendees list
      const response = await api.get(`/events/${id}/attendees`);
      console.log("✅ Attendees loaded:", response.attendees.length);
      setAttendees(response.attendees);
      
    } catch (err) {
      console.error("❌ Failed to load attendees:", err);
      alert(err.data?.msg || err.message || "Failed to load attendees");
      navigate(`/events/${id}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && user) loadAttendees();
  }, [id, user]);

  const exportToCSV = () => {
    console.log("📥 Exporting attendees to CSV");
    
    if (attendees.length === 0) {
      alert("No attendees to export");
      return;
    }

    // Create CSV content
    const headers = ["Name", "Email", "RSVP Date"];
    const rows = attendees.map(a => [
      a.user?.name || "N/A",
      a.user?.email || "N/A",
      new Date(a.createdAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventData?.title || 'event'}_attendees.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log("✅ CSV exported");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!eventData) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(`/events/${id}`)}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors group"
      >
        <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Event
      </button>

      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <HiUsers className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">Event Attendees</h1>
              <p className="text-blue-100 mt-1">Manage your guest list</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold">{attendees.length}</p>
            <p className="text-blue-100 text-sm">Total RSVPs</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-lg p-4 mt-6">
          <p className="font-semibold text-lg mb-1">{eventData.title}</p>
          <div className="flex items-center gap-4 text-sm text-blue-100">
            <div className="flex items-center gap-1">
              <HiCalendar className="w-4 h-4" />
              {new Date(eventData.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            {eventData.maxAttendees && (
              <span>
                Capacity: {attendees.length} / {eventData.maxAttendees}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{attendees.length}</span> {attendees.length === 1 ? 'person has' : 'people have'} RSVP'd to your event
        </p>
        <button
          onClick={exportToCSV}
          disabled={attendees.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiDownload className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Attendees List */}
      {attendees.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">#</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">RSVP Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendees.map((attendee, index) => (
                  <tr key={attendee._id || index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <HiUser className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="font-medium text-slate-900">
                          {attendee.user?.name || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <HiMail className="w-4 h-4 text-slate-400" />
                        <a 
                          href={`mailto:${attendee.user?.email}`}
                          className="hover:text-amber-600 transition-colors"
                        >
                          {attendee.user?.email || "N/A"}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(attendee.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiUsers className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-display font-bold text-slate-900 mb-2">No Attendees Yet</h3>
          <p className="text-slate-600 mb-6">
            No one has RSVP'd to your event yet. Share your event to get attendees!
          </p>
        </div>
      )}

      {/* Stats Cards */}
      {attendees.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-1">Total Attendees</p>
                <p className="text-3xl font-bold text-slate-900">{attendees.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <HiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {eventData.maxAttendees && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium mb-1">Capacity Used</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {Math.round((attendees.length / eventData.maxAttendees) * 100)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <HiCalendar className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium mb-1">Latest RSVP</p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(attendees[attendees.length - 1]?.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <HiUser className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
