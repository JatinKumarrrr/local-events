// src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const path = search
        ? `/events?q=${encodeURIComponent(search)}`
        : "/events";

      const res = await api.get(path);
      setEvents(res);
    } catch (err) {
      console.error(err);
      alert(err.data?.msg || "Failed to load events");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <h2>Events</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Search events"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" onClick={loadEvents}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="grid">
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            events.map((ev) => (
              <div key={ev._id} className="card">
                <h3>{ev.title}</h3>
                <p className="meta">{ev.location}</p>
                <p className="meta">{new Date(ev.date).toLocaleString()}</p>
                <p>{(ev.description || "").slice(0, 120)}{ev.description?.length > 120 ? "..." : ""}</p>

                <div className="actions" style={{ marginTop: 8 }}>
                  <Link to={`/events/${ev._id}`} className="btn" style={{ textDecoration: 'none' }}>View Details</Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
