import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiUserGroup, HiClipboardList, HiLightningBolt , HiCalendar, HiLocationMarker, HiCheckCircle, HiSparkles } from 'react-icons/hi';
import { FaMusic, FaStar, FaUsers, FaRegLightbulb } from 'react-icons/fa';
import { MdBusinessCenter, MdSportsBasketball, MdTheaterComedy } from 'react-icons/md';

export default function Landing() {
  console.log('🏠 Landing page rendered');

  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-white">
        <div className="container-custom py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full inline-flex items-center gap-2">
                  <HiSparkles className="w-4 h-4" />
                  Connect Locally
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] tracking-tight">
                Discover events that matter
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Join your community through curated local experiences. From workshops to meetups—find what moves you.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link 
                  to="/events"
                  onClick={() => console.log('🔍 Navigate to Events')}
                  className="group px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-all inline-flex items-center justify-center"
                >
                  Explore Events
                  <HiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  to="/register"
                  onClick={() => console.log('✨ Navigate to Register')}
                  className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 font-medium transition-all inline-flex items-center justify-center"
                >
                  Create an Event
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-amber-200 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-orange-200 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-amber-300 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-orange-300 border-2 border-white"></div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">500+ organizers</p>
                  <p className="text-slate-500">trust LocalEvents</p>
                </div>
              </div>
            </div>

            {/* Right: Hero Illustration */}
            <div className="hidden md:block">
              <svg viewBox="0 0 500 500" className="w-full h-auto">
                {/* Background circle */}
                <circle cx="250" cy="250" r="200" fill="#FEF3C7" opacity="0.3"/>
                
                {/* Calendar/Event board */}
                <rect x="150" y="120" width="200" height="260" rx="12" fill="#1E293B"/>
                <rect x="165" y="140" width="170" height="40" rx="6" fill="#F59E0B"/>
                <rect x="175" y="150" width="60" height="20" rx="4" fill="white"/>
                
                {/* Event cards on board */}
                <rect x="165" y="195" width="170" height="35" rx="6" fill="white" opacity="0.9"/>
                <rect x="175" y="205" width="80" height="4" rx="2" fill="#CBD5E1"/>
                <rect x="175" y="215" width="120" height="4" rx="2" fill="#CBD5E1"/>
                
                <rect x="165" y="245" width="170" height="35" rx="6" fill="white" opacity="0.9"/>
                <rect x="175" y="255" width="80" height="4" rx="2" fill="#CBD5E1"/>
                <rect x="175" y="265" width="120" height="4" rx="2" fill="#CBD5E1"/>
                
                <rect x="165" y="295" width="170" height="35" rx="6" fill="white" opacity="0.9"/>
                <rect x="175" y="305" width="80" height="4" rx="2" fill="#CBD5E1"/>
                <rect x="175" y="315" width="120" height="4" rx="2" fill="#CBD5E1"/>
                
                {/* Character - Person organizing */}
                <ellipse cx="120" cy="380" rx="45" ry="8" fill="#CBD5E1" opacity="0.3"/>
                <rect x="100" y="320" width="40" height="60" rx="20" fill="#F59E0B"/>
                <circle cx="120" cy="300" r="20" fill="#FCD34D"/>
                <rect x="85" y="330" width="30" height="8" rx="4" fill="#F59E0B"/>
                <rect x="125" y="330" width="30" height="8" rx="4" fill="#F59E0B"/>
                
                {/* Character - Person attending */}
                <ellipse cx="380" cy="380" rx="45" ry="8" fill="#CBD5E1" opacity="0.3"/>
                <rect x="360" y="320" width="40" height="60" rx="20" fill="#FB923C"/>
                <circle cx="380" cy="300" r="20" fill="#FDBA74"/>
                <rect x="345" y="330" width="30" height="8" rx="4" fill="#FB923C"/>
                <rect x="385" y="330" width="30" height="8" rx="4" fill="#FB923C"/>
                
                {/* Floating elements */}
                <circle cx="80" cy="150" r="15" fill="#FCD34D" opacity="0.6"/>
                <circle cx="420" cy="180" r="20" fill="#FB923C" opacity="0.6"/>
                <circle cx="430" cy="300" r="12" fill="#FCD34D" opacity="0.6"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Built for community
          </h2>
          <p className="text-lg text-slate-600">
            Whether you're attending or organizing, we've made it simple, beautiful, and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="group p-8 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <HiUserGroup className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
              For Attendees
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Discover curated events in your area. RSVP instantly and manage your calendar in one place.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <HiClipboardList className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
              For Organizers
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Create and manage events effortlessly. Track attendance, communicate with your audience.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <HiLightningBolt  className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
              Real-time Updates
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Stay in the loop with instant notifications. Never miss an update on your favorite events.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section - NEW */}
      <section className="bg-slate-50 py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              Events for every interest
            </h2>
            <p className="text-lg text-slate-600">
              From professional networking to creative workshops, find what speaks to you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Category Cards */}
            <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group cursor-pointer">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <MdBusinessCenter className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="font-semibold text-slate-900">Business</h3>
              <p className="text-sm text-slate-500 mt-1">120+ events</p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group cursor-pointer">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <FaMusic className="w-7 h-7 text-orange-700" />
              </div>
              <h3 className="font-semibold text-slate-900">Music</h3>
              <p className="text-sm text-slate-500 mt-1">85+ events</p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group cursor-pointer">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <MdSportsBasketball className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="font-semibold text-slate-900">Sports</h3>
              <p className="text-sm text-slate-500 mt-1">95+ events</p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group cursor-pointer">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <MdTheaterComedy className="w-7 h-7 text-orange-700" />
              </div>
              <h3 className="font-semibold text-slate-900">Arts</h3>
              <p className="text-sm text-slate-500 mt-1">110+ events</p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group cursor-pointer">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <FaRegLightbulb className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="font-semibold text-slate-900">Workshops</h3>
              <p className="text-sm text-slate-500 mt-1">145+ events</p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group cursor-pointer">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <HiCalendar className="w-7 h-7 text-orange-700" />
              </div>
              <h3 className="font-semibold text-slate-900">Meetups</h3>
              <p className="text-sm text-slate-500 mt-1">200+ events</p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group cursor-pointer">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <FaUsers className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="font-semibold text-slate-900">Community</h3>
              <p className="text-sm text-slate-500 mt-1">175+ events</p>
            </div>

            <div className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center group cursor-pointer">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <HiLocationMarker className="w-7 h-7 text-orange-700" />
              </div>
              <h3 className="font-semibold text-slate-900">Local</h3>
              <p className="text-sm text-slate-500 mt-1">300+ events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-5xl font-display font-bold mb-2">1,200+</p>
              <p className="text-slate-400">Events hosted</p>
            </div>
            <div>
              <p className="text-5xl font-display font-bold mb-2">8,500+</p>
              <p className="text-slate-400">Active members</p>
            </div>
            <div>
              <p className="text-5xl font-display font-bold mb-2">500+</p>
              <p className="text-slate-400">Organizers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Illustration - NEW */}
      <section className="container-custom py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Illustration */}
          <div>
            <svg viewBox="0 0 500 400" className="w-full h-auto">
              {/* Person at desk creating event */}
              <rect x="50" y="200" width="180" height="120" rx="8" fill="#FEF3C7"/>
              <rect x="70" y="150" width="140" height="50" rx="6" fill="#1E293B"/>
              <rect x="85" y="165" width="40" height="20" rx="4" fill="#F59E0B"/>
              <rect x="135" y="165" width="60" height="20" rx="4" fill="#CBD5E1"/>
              
              {/* Character sitting */}
              <circle cx="150" cy="250" r="25" fill="#FDBA74"/>
              <rect x="130" y="275" width="40" height="45" rx="20" fill="#FB923C"/>
              
              {/* Laptop */}
              <rect x="120" y="295" width="60" height="35" rx="4" fill="#1E293B"/>
              <rect x="125" y="300" width="50" height="25" rx="2" fill="#3B82F6"/>
              
              {/* Floating event cards */}
              <g opacity="0.9">
                <rect x="280" y="100" width="180" height="80" rx="8" fill="white" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/>
                <rect x="295" y="120" width="60" height="8" rx="4" fill="#F59E0B"/>
                <rect x="295" y="135" width="120" height="6" rx="3" fill="#CBD5E1"/>
                <rect x="295" y="148" width="90" height="6" rx="3" fill="#CBD5E1"/>
              </g>
              
              <g opacity="0.9">
                <rect x="280" y="210" width="180" height="80" rx="8" fill="white" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/>
                <rect x="295" y="230" width="60" height="8" rx="4" fill="#FB923C"/>
                <rect x="295" y="245" width="120" height="6" rx="3" fill="#CBD5E1"/>
                <rect x="295" y="258" width="90" height="6" rx="3" fill="#CBD5E1"/>
              </g>
              
              {/* Decorative circles */}
              <circle cx="400" cy="80" r="20" fill="#FCD34D" opacity="0.4"/>
              <circle cx="100" cy="100" r="15" fill="#FB923C" opacity="0.4"/>
            </svg>
          </div>

          {/* Right: Benefits list */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              Powerful tools for organizers
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <HiCheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Easy Event Creation</h3>
                  <p className="text-slate-600">Set up your event in minutes with our intuitive form. Add all the details that matter.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <HiCheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Track Attendance</h3>
                  <p className="text-slate-600">See who's coming in real-time. Set capacity limits and manage your guest list effortlessly.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <HiCheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Attendee Management</h3>
                  <p className="text-slate-600">Access complete attendee lists with contact information for seamless communication.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <HiCheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Full Control</h3>
                  <p className="text-slate-600">Edit or cancel events anytime. You're always in charge of your community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              Simple by design
            </h2>
            <p className="text-lg text-slate-600">
              Three steps to connect with your community
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Step 1 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-display font-semibold text-slate-900 mb-2">Browse & Discover</h3>
                <p className="text-slate-600 leading-relaxed">
                  Explore events filtered by your interests, location, and schedule. Our curated feed shows what's relevant to you.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-display font-semibold text-slate-900 mb-2">RSVP Seamlessly</h3>
                <p className="text-slate-600 leading-relaxed">
                  Reserve your spot with a single click. Get instant confirmation and add it to your calendar.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-display font-semibold text-slate-900 mb-2">Attend & Connect</h3>
                <p className="text-slate-600 leading-relaxed">
                  Show up and engage with your community. Build meaningful connections at every event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="container-custom py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Loved by communities
          </h2>
          <p className="text-lg text-slate-600">
            See what organizers and attendees are saying
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-200 transition-colors">
            <div className="flex gap-1 mb-4">
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              "LocalEvents made organizing our community meetups so much easier. The RSVP system is perfect!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-200"></div>
              <div>
                <p className="font-semibold text-slate-900">Priya Sharma</p>
                <p className="text-sm text-slate-500">Community Organizer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-200 transition-colors">
            <div className="flex gap-1 mb-4">
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              "I've discovered so many amazing events near me. The interface is clean and easy to use."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-200"></div>
              <div>
                <p className="font-semibold text-slate-900">Rahul Verma</p>
                <p className="text-sm text-slate-500">Regular Attendee</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-200 transition-colors">
            <div className="flex gap-1 mb-4">
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
              <FaStar className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              "As a workshop host, this platform has helped me reach more people and manage registrations efficiently."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-300"></div>
              <div>
                <p className="font-semibold text-slate-900">Anjali Patel</p>
                <p className="text-sm text-slate-500">Workshop Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-24">
        <div className="bg-slate-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Start your journey today
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Join a growing community of event creators and attendees
            </p>
            <Link 
              to="/register"
              onClick={() => console.log('🚀 CTA: Navigate to Register')}
              className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-100 font-semibold transition-all shadow-xl"
            >
              Get Started Free
              <HiArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
