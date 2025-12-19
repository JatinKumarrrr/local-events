
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";


export default function CreateEvent({ user }) {
  const nav = useNavigate();

  
  if (!user || user.role !== "organizer") {
    return <div style={{ padding: 20 }}>Access denied — organizer only</div>;
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title,
        description,
        date: new Date(date).toISOString(),
        location,
        maxAttendees: maxAttendees ? parseInt(maxAttendees, 10) : undefined,
      };
      const created = await api.post("/events", payload);
      alert("Event created");
      nav(`/events/${created._id}`);
    } catch (err) {
      alert(err.data?.msg || err.message || "Failed to create");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", background: "#fff", padding: 16, borderRadius: 8 }}>
      <h2>Create Event</h2>
      <form onSubmit={submit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Date & time</label>
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Location</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} required />

        <label>Max Attendees</label>
        <input type="number" value={maxAttendees} onChange={(e) => setMaxAttendees(e.target.value)} />

        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={saving} style={{ padding: "8px 12px", background: "#0f62fe", color: "#fff", border: 0, borderRadius: 6 }}>
            {saving ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
