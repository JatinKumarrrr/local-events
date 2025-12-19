// src/pages/EventDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";

export default function EventDetails({ user }) {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  async function loadEvent() {
    setLoading(true);
    try {
      const ev = await api.get(`/events/${id}`);
      setEventData(ev);
    } catch (err) {
      alert(err.data?.msg || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function doRsvp() {
    if (!user) return alert("Please login to RSVP");
    setActionLoading(true);
    try {
      await api.post(`/events/${id}/rsvp`);
      await loadEvent();
      alert("RSVP successful");
    } catch (err) {
      alert(err.data?.msg || err.message);
    } finally {
      setActionLoading(false);
    }
  }

  async function doCancel() {
    setActionLoading(true);
    try {
      await api.del(`/events/${id}/rsvp`);
      await loadEvent();
      alert("Cancelled");
    } catch (err) {
      alert(err.data?.msg || err.message);
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    if (id) loadEvent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!eventData) return <p>No event found.</p>;

  const isRsvped = eventData.rsvps?.some(
    (r) => r.user?._id === user?.id || r.user?._id === user?._id
  );

  return (
    <div className="card">
      <h2>{eventData.title}</h2>
      <p className="meta">{new Date(eventData.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {eventData.location}</p>
      <p>{eventData.description}</p>

      <p><strong>Organizer:</strong> {eventData.organizer?.name} ({eventData.organizer?.email})</p>

      <p><strong>Attendees:</strong> {eventData.rsvps?.length || 0}</p>

      {!user ? (
        <p><em>Login to RSVP</em></p>
      ) : (
        <div style={{ marginTop: 12 }}>
          {!isRsvped ? (
            <button onClick={doRsvp} disabled={actionLoading} className="btn">
              {actionLoading ? "Please wait..." : "RSVP"}
            </button>
          ) : (
            <button onClick={doCancel} disabled={actionLoading} style={{ background: "#E04B4B", color: "#fff", border: 0, padding: "8px 12px", borderRadius: 6 }}>
              {actionLoading ? "Please wait..." : "Cancel RSVP"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
