import { useState, useEffect, FormEvent } from 'react';
import { Calendar, Clock, User, Mail, MessageSquare, Check, Sparkles, AlertCircle, Trash2, ArrowRight } from 'lucide-react';
import { Booking } from '../types';
import { AVAILABLE_TIME_SLOTS } from '../data';

interface BookingSchedulerProps {
  prefilledPackage: { name: string; estimatedPrice: number; features: string[] } | null;
  onBookingSuccess: (booking: Booking) => void;
  existingBookings: Booking[];
  onCancelBooking: (id: string) => void;
  viewBookingsOnly?: boolean;
}

// Next 10 available agency business days starting July 1, 2026
const UPCOMING_BUSINESS_DAYS = [
  { dateStr: '2026-07-01', dayLabel: 'Wed', dateNum: '01', monthLabel: 'July' },
  { dateStr: '2026-07-02', dayLabel: 'Thu', dateNum: '02', monthLabel: 'July' },
  { dateStr: '2026-07-03', dayLabel: 'Fri', dateNum: '03', monthLabel: 'July' },
  { dateStr: '2026-07-06', dayLabel: 'Mon', dateNum: '06', monthLabel: 'July' },
  { dateStr: '2026-07-07', dayLabel: 'Tue', dateNum: '07', monthLabel: 'July' },
  { dateStr: '2026-07-08', dayLabel: 'Wed', dateNum: '08', monthLabel: 'July' },
  { dateStr: '2026-07-09', dayLabel: 'Thu', dateNum: '09', monthLabel: 'July' },
  { dateStr: '2026-07-10', dayLabel: 'Fri', dateNum: '10', monthLabel: 'July' },
  { dateStr: '2026-07-13', dayLabel: 'Mon', dateNum: '13', monthLabel: 'July' },
  { dateStr: '2026-07-14', dayLabel: 'Tue', dateNum: '14', monthLabel: 'July' },
  { dateStr: '2026-07-15', dayLabel: 'Wed', dateNum: '15', monthLabel: 'July' },
];

const STRATEGIC_GOALS = [
  'Brand Positioning',
  'UX/UI Design Refresh',
  'Custom App Engineering',
  'Interactive Animations',
  'Full-Stack Retainer'
];

export default function BookingScheduler({
  prefilledPackage,
  onBookingSuccess,
  existingBookings,
  onCancelBooking,
  viewBookingsOnly = false,
}: BookingSchedulerProps) {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(UPCOMING_BUSINESS_DAYS[0].dateStr);
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_TIME_SLOTS[1]); // Default 10:30 AM
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [newBooking, setNewBooking] = useState<Booking | null>(null);

  // Sync prefilled package values
  useEffect(() => {
    if (prefilledPackage) {
      setSelectedGoals(prefilledPackage.features.slice(0, 3));
      setMessage(`Interested in "${prefilledPackage.name}" package. Estimated budget: $${prefilledPackage.estimatedPrice}/mo.`);
    }
  }, [prefilledPackage]);

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (selectedGoals.length === 0) {
      setError('Please select at least one strategic goal.');
      return;
    }

    // Check conflict
    const isConflicting = existingBookings.some(
      (b) => b.date === selectedDate && b.time === selectedTime
    );
    if (isConflicting) {
      setError('This time slot has already been scheduled. Please select another slot or day.');
      return;
    }

    // Success
    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      email: email.trim(),
      date: selectedDate,
      time: selectedTime,
      goals: selectedGoals,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    onBookingSuccess(booking);
    setNewBooking(booking);
    setIsSuccess(true);

    // Reset fields
    setName('');
    setEmail('');
    setMessage('');
    setSelectedGoals([]);
  };

  const formatSelectedDate = (dateStr: string) => {
    const day = UPCOMING_BUSINESS_DAYS.find((d) => d.dateStr === dateStr);
    return day ? `${day.monthLabel} ${day.dateNum}, ${day.dayLabel}` : dateStr;
  };

  if (isSuccess && newBooking) {
    return (
      <div className="rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-md p-6 sm:p-8 text-center animate-scaleIn">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
          <Check className="h-7 w-7 stroke-[3]" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white mb-2">Consultation Confirmed!</h3>
        <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
          We have successfully scheduled your consultation call. A strategic designer from our team will contact you.
        </p>

        <div className="rounded-2xl bg-neutral-950/50 border border-white/5 p-6 max-w-md mx-auto mb-8 text-left space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-mono">CLIENT</span>
            <span className="text-white font-medium">{newBooking.name}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-mono">EMAIL</span>
            <span className="text-neutral-300">{newBooking.email}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-mono">DATE</span>
            <span className="text-indigo-300 font-medium">{formatSelectedDate(newBooking.date)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-mono">TIME</span>
            <span className="text-indigo-300 font-medium">{newBooking.time} EST</span>
          </div>
          <div className="flex items-start justify-between text-xs border-t border-white/5 pt-3">
            <span className="text-neutral-500 font-mono shrink-0">GOALS</span>
            <span className="text-neutral-300 text-right font-medium">{newBooking.goals.join(', ')}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="rounded-xl border border-white/10 bg-neutral-950/40 px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-950 hover:border-white/25 transition-all cursor-pointer"
          >
            Schedule Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Existing Bookings sidebar (Always helpful to manage your bookings) */}
      <div className={`lg:col-span-5 space-y-6 ${viewBookingsOnly ? 'lg:col-span-12' : ''}`}>
        <div className="rounded-2xl border border-white/5 bg-neutral-950/40 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
              My Scheduled Consults
            </h4>
            <span className="rounded-full bg-indigo-500/15 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-mono text-indigo-300">
              {existingBookings.length} Active
            </span>
          </div>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {existingBookings.map((booking) => (
              <div
                key={booking.id}
                className="group relative rounded-xl border border-white/5 bg-neutral-900/60 p-4 hover:border-white/10 transition-all text-left"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-xs font-mono text-neutral-400">
                      {formatSelectedDate(booking.date)} at {booking.time} EST
                    </p>
                    <p className="text-sm font-semibold text-white mt-1.5">{booking.name}</p>
                    <p className="text-xs text-neutral-400 line-clamp-1">{booking.email}</p>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {booking.goals.map((g, i) => (
                        <span
                          key={i}
                          className="rounded bg-indigo-500/5 px-2 py-0.5 text-[9px] font-medium text-indigo-300 border border-indigo-500/10"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="rounded p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                    title="Cancel meeting slot"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {existingBookings.length === 0 && (
              <div className="py-12 text-center text-neutral-500 space-y-3">
                <Calendar className="h-8 w-8 text-neutral-600 mx-auto opacity-70" />
                <p className="text-xs">No strategic consults scheduled yet.</p>
              </div>
            )}
          </div>
        </div>

        {!viewBookingsOnly && (
          <div className="rounded-xl border border-indigo-500/10 bg-indigo-500/5 p-4 flex gap-3 text-left">
            <AlertCircle className="h-5 w-5 text-indigo-400 shrink-0" />
            <div className="text-xs text-neutral-300 leading-relaxed">
              <span className="font-semibold text-white">Why book?</span> You get 45 minutes with a lead strategist, a personalized digital experience diagnostic, and an itemized visual solution roadmap. No commitment required.
            </div>
          </div>
        )}
      </div>

      {/* Booking Form (Only show if not viewBookingsOnly) */}
      {!viewBookingsOnly && (
        <form onSubmit={handleFormSubmit} className="lg:col-span-7 space-y-6 text-left">
          {error && (
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/15 p-4 flex gap-3 text-sm text-rose-300">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Prefilled Banner */}
          {prefilledPackage && (
            <div className="rounded-xl bg-amber-400/10 border border-amber-400/20 p-4 flex items-center justify-between text-xs text-amber-300">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Prepopulated package settings: <strong className="text-white">{prefilledPackage.name}</strong></span>
              </span>
              <span className="font-mono bg-amber-400/15 px-2 py-0.5 rounded text-white">${prefilledPackage.estimatedPrice}/mo</span>
            </div>
          )}

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">Your Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-neutral-950/40 p-3 pl-10 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder="e.g. john@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-neutral-950/40 p-3 pl-10 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Date Picker Grid */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase block">
              1. Select Date (Upcoming Business Days)
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
              {UPCOMING_BUSINESS_DAYS.map((day) => {
                const isSelected = selectedDate === day.dateStr;
                return (
                  <button
                    key={day.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(day.dateStr)}
                    className={`flex flex-col items-center justify-center shrink-0 w-16 h-20 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-white/5 bg-neutral-950/30 text-neutral-400 hover:border-white/10 hover:text-neutral-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase">{day.dayLabel}</span>
                    <span className="text-xl font-bold tracking-tight my-0.5">{day.dateNum}</span>
                    <span className="text-[9px] opacity-75 font-mono">{day.monthLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slot Picker */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase block">
              2. Select Time (EST)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {AVAILABLE_TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                const isConflicting = existingBookings.some(
                  (b) => b.date === selectedDate && b.time === time
                );
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isConflicting}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-lg py-2.5 text-center text-xs font-semibold border transition-all cursor-pointer ${
                      isConflicting
                        ? 'border-neutral-900 bg-neutral-950/20 text-neutral-600 cursor-not-allowed line-through'
                        : isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                        : 'border-white/5 bg-neutral-950/20 text-neutral-400 hover:border-white/10 hover:text-neutral-200'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project goals checklist */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase block">
              3. Select Core Consultation Goals
            </label>
            <div className="flex flex-wrap gap-2">
              {STRATEGIC_GOALS.map((goal) => {
                const isSelected = selectedGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                        : 'border-white/5 bg-neutral-950/20 text-neutral-400 hover:border-white/10 hover:text-neutral-300'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    <span>{goal}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message / Brief */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">Project Context (Optional)</label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
              <textarea
                rows={3}
                placeholder="Briefly describe your product goals, budget, or anything specific you would love to accomplish..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-white/5 bg-neutral-950/40 p-3 pl-10 text-sm text-white placeholder-neutral-500 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white text-neutral-950 py-3.5 text-xs font-bold transition-all hover:bg-neutral-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Confirm Strategic Call</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
