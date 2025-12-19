// backend/models/Event.js
const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  maxAttendees: { type: Number },
  rsvps: [rsvpSchema],
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
