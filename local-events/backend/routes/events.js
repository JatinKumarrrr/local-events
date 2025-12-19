// backend/routes/events.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');

// Create event (organizer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'organizer') return res.status(403).json({ msg: 'Only organizers can create events' });

    const { title, description, date, location, maxAttendees, category } = req.body;
    if (!title || !date || !location) return res.status(400).json({ msg: 'title, date and location are required' });

    const event = new Event({
      title,
      description,
      date,
      location,
      maxAttendees,
      category,
      organizer: req.user.id
    });
    await event.save();
    res.json(event);
  } catch (err) {
    console.error('Create event error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// List events (public) with optional filters: q, city, date
router.get('/', async (req, res) => {
  try {
    const { q, city, date } = req.query;
    const filter = {};
    if (q) filter.title = new RegExp(q, 'i');
    if (city) filter.location = new RegExp(city, 'i');
    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      filter.date = { $gte: d, $lt: next };
    }
    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .sort({ date: 1 })
      .limit(200);
    res.json(events);
  } catch (err) {
    console.error('List events error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get single event (with attendees)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('rsvps.user', 'name email');
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error('Get event error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update event (organizer & owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    if (event.organizer.toString() !== req.user.id) return res.status(403).json({ msg: 'Only owner can update' });

    const up = ['title','description','date','location','maxAttendees','category'];
    up.forEach(k => { if (req.body[k] !== undefined) event[k] = req.body[k]; });
    await event.save();
    res.json(event);
  } catch (err) {
    console.error('Update event error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete event (organizer & owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    if (event.organizer.toString() !== req.user.id) return res.status(403).json({ msg: 'Only owner can delete' });
    await event.deleteOne();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error('Delete event error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// RSVP (authenticated user)
router.post('/:id/rsvp', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // duplicate check
    if (event.rsvps.some(r => r.user?.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Already RSVPed' });
    }

    // capacity check
    if (event.maxAttendees && event.rsvps.length >= event.maxAttendees) {
      return res.status(400).json({ msg: 'Event is full' });
    }

    event.rsvps.push({ user: req.user.id });
    await event.save();
    res.json({ msg: 'RSVP successful', rsvpsCount: event.rsvps.length });
  } catch (err) {
    console.error('RSVP error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Cancel RSVP
router.delete('/:id/rsvp', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    const before = event.rsvps.length;
    event.rsvps = event.rsvps.filter(r => r.user?.toString() !== req.user.id);
    if (event.rsvps.length === before) return res.status(400).json({ msg: 'You are not RSVPed' });

    await event.save();
    res.json({ msg: 'Cancelled', rsvpsCount: event.rsvps.length });
  } catch (err) {
    console.error('Cancel RSVP error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Attendees list (organizer only)
router.get('/:id/attendees', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('rsvps.user','name email');
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    if (event.organizer.toString() !== req.user.id) return res.status(403).json({ msg: 'Only organizer can view attendees' });
    res.json({ attendees: event.rsvps });
  } catch (err) {
    console.error('Attendees error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
