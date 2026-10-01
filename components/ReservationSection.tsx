'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  PartyPopper,
  Info,
  UtensilsCrossed,
} from 'lucide-react';
import { useTablePlan } from '@/lib/tablePlanContext';

export default function ReservationSection() {
  const { plannedItems, totalCount, grandTotal } = useTablePlan();
  const [guestCount, setGuestCount] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState<string>('Sky Deck Terrace');
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedTime, setSelectedTime] = useState<string>('08:00 PM');
  const [occasion, setOccasion] = useState<string>('Casual Dining');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<any>(null);

  const seatingOptions = [
    {
      id: 'Sky Deck Terrace',
      title: 'Open Sky Terrace',
      desc: 'Breezy rooftop dining with panoramic city skyline',
      tag: 'Most Popular',
    },
    {
      id: 'Sunset Lounge',
      title: 'Sunset Lounge Sofas',
      desc: 'Plush velvet couches under glowing rattan chandeliers',
      tag: 'Lounge Vibe',
    },
    {
      id: 'Private VIP Cabana',
      title: 'Private Starlight Cabana',
      desc: 'Curtained intimate cabana for celebrations & dates',
      tag: 'Exclusive',
    },
    {
      id: 'Indoor AC Lounge',
      title: 'Indoor AC Deck',
      desc: 'Climate-controlled stylish lounge with DJ music',
      tag: 'Cool & Cozy',
    },
  ];

  const quickDates = ['Today', 'Tomorrow', 'This Weekend', 'Custom'];
  const quickTimeSlots = [
    { label: 'Brunch & Lunch', slots: ['12:30 PM', '01:30 PM', '02:30 PM', '03:30 PM'] },
    { label: 'Sunset & Happy Hours', slots: ['04:30 PM', '05:30 PM', '06:30 PM'] },
    { label: 'Starlight Dinner', slots: ['07:30 PM', '08:00 PM', '08:30 PM', '09:30 PM', '10:30 PM'] },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const bookingId = `UD-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingConfirmed({
        id: bookingId,
        name: fullName,
        phone,
        guests: guestCount,
        seating: seatingArea,
        date: selectedDate,
        time: selectedTime,
        occasion,
        request: specialRequest,
        attachedDishes: [...plannedItems],
        totalEst: grandTotal,
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleSendWhatsAppConfirmation = () => {
    if (!bookingConfirmed) return;
    let dishesText = '';
    if (bookingConfirmed.attachedDishes && bookingConfirmed.attachedDishes.length > 0) {
      const list = bookingConfirmed.attachedDishes
        .map((p: any) => `  - ${p.quantity}x ${p.dish.name} (₹${p.dish.price * p.quantity})`)
        .join('%0A');
      dishesText = `%0A%0A*Pre-Selected Dining Menu:*%0A${list}%0A*Estimated Total:* ₹${bookingConfirmed.totalEst}`;
    }

    const msg = `*Upper Deck Sky Lounge Table Reservation*%0A%0A*Booking ID:* ${bookingConfirmed.id}%0A*Name:* ${bookingConfirmed.name}%0A*Phone:* ${bookingConfirmed.phone}%0A*Guests:* ${bookingConfirmed.guests} People%0A*Seating Area:* ${bookingConfirmed.seating}%0A*Date:* ${bookingConfirmed.date}%0A*Time:* ${bookingConfirmed.time}%0A*Occasion:* ${bookingConfirmed.occasion}%0A*Notes:* ${bookingConfirmed.request || 'None'}${dishesText}%0A%0APlease confirm my table at Centurion Mall, Nerul!`;
    window.open(`https://wa.me/918451000000?text=${msg}`, '_blank');
  };

  return (
    <section id="reservation" className="py-20 sm:py-28 bg-[#fdfbf7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#a37e3b] mb-3">
            Table Reservations & Private Events
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight text-balance">
            Reserve Your Starlit Table
          </h2>
          <div className="w-16 h-0.5 bg-[#cca563] mx-auto mt-6 mb-6" />
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed text-balance">
            Book in advance for panoramic sunset horizons, candlelit cabana dates,
            and lively celebrations. Instant confirmation with zero booking fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Reservation Booking Form (Left / 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-lg">
            {bookingConfirmed ? (
              <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-[#a37e3b] font-semibold">
                    Reservation Requested
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
                    Table Reserved at Upper Deck
                  </h3>
                  <p className="text-stone-500 text-xs sm:text-sm mt-1">
                    Booking Reference:{' '}
                    <span className="font-mono font-bold text-stone-900">{bookingConfirmed.id}</span>
                  </p>
                </div>

                {/* Details summary */}
                <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200/80 text-left text-xs sm:text-sm space-y-2 text-stone-700">
                  <div className="flex justify-between border-b border-stone-200/60 pb-2">
                    <span className="text-stone-500">Guest Name:</span>
                    <span className="font-semibold text-stone-900">{bookingConfirmed.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2">
                    <span className="text-stone-500">Contact Number:</span>
                    <span className="font-medium text-stone-900">{bookingConfirmed.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2">
                    <span className="text-stone-500">Date & Time:</span>
                    <span className="font-semibold text-[#a37e3b]">
                      {bookingConfirmed.date} at {bookingConfirmed.time}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2">
                    <span className="text-stone-500">Party Size:</span>
                    <span className="font-medium text-stone-900">{bookingConfirmed.guests} Guests</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2">
                    <span className="text-stone-500">Seating Zone:</span>
                    <span className="font-medium text-stone-900">{bookingConfirmed.seating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Occasion:</span>
                    <span className="font-medium text-stone-900">{bookingConfirmed.occasion}</span>
                  </div>

                  {bookingConfirmed.attachedDishes && bookingConfirmed.attachedDishes.length > 0 && (
                    <div className="pt-2 border-t border-stone-200/60 mt-2">
                      <span className="text-stone-500 block mb-1">Pre-Selected Dishes:</span>
                      <div className="space-y-1">
                        {bookingConfirmed.attachedDishes.map((p: any) => (
                          <div key={p.dish.id} className="flex justify-between text-xs text-stone-800">
                            <span>
                              {p.quantity}x {p.dish.name}
                            </span>
                            <span className="font-semibold tabular-nums">
                              ₹{p.dish.price * p.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between pt-1.5 mt-1.5 border-t border-stone-200 text-xs font-semibold text-[#a37e3b]">
                        <span>Estimated Total:</span>
                        <span>₹{bookingConfirmed.totalEst}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSendWhatsAppConfirmation}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Booking to Upper Deck on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setBookingConfirmed(null)}
                    className="w-full py-2.5 px-4 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-medium hover:bg-stone-50 transition-colors"
                  >
                    Make Another Booking
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Attached Table Plan Notification Banner */}
                {totalCount > 0 && (
                  <div className="p-4 rounded-xl bg-[#fdfbf7] border border-[#cca563] flex items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#cca563] text-stone-950 flex items-center justify-center font-bold shrink-0">
                        <UtensilsCrossed className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">
                          {totalCount} Pre-Selected {totalCount === 1 ? 'Dish' : 'Dishes'} Attached (Est. ₹{grandTotal})
                        </p>
                        <p className="text-stone-500 font-light">
                          Our kitchen will prepare your menu ready on your arrival!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1. Seating Area Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-3">
                    1. Select Preferred Seating Zone
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {seatingOptions.map((opt) => {
                      const isSelected = seatingArea === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSeatingArea(opt.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                            isSelected
                              ? 'border-[#cca563] bg-[#fdfbf7] shadow-xs ring-1 ring-[#cca563]'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-sm font-medium text-stone-900">
                              {opt.title}
                            </span>
                            <span className="text-[10px] uppercase font-semibold text-[#a37e3b] bg-[#e0cea6]/30 px-2 py-0.5 rounded-full">
                              {opt.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 font-light mt-1">{opt.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Number of Guests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-3">
                    2. Number of Guests
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((count) => {
                      const isSelected = guestCount === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setGuestCount(count)}
                          className={`min-w-[42px] h-10 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-stone-900 text-white shadow-xs'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          {count === 15 ? '15+' : count}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Date & Time Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                      3. Date
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {quickDates.slice(0, 3).map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all text-center ${
                            selectedDate === d
                              ? 'border-[#cca563] bg-[#fdfbf7] text-[#826030] font-semibold'
                              : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                      4. Time Slot
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:border-[#cca563]"
                    >
                      {quickTimeSlots.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.slots.map((s) => (
                            <option key={s} value={s}>
                              {s} ({group.label})
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rohan Sharma"
                      className="w-full p-2.5 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#cca563]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98200 XXXXX"
                      className="w-full p-2.5 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#cca563]"
                    />
                  </div>
                </div>

                {/* Occasion & Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:border-[#cca563]"
                    >
                      <option value="Casual Dining">Casual Dining / Friends</option>
                      <option value="Romantic Date">Romantic Candlelight Date</option>
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Family Gathering">Family Gathering</option>
                      <option value="Corporate Dinner">Corporate / Team Dinner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Special Requests
                    </label>
                    <input
                      type="text"
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="e.g. Corner table with view, cake setup"
                      className="w-full p-2.5 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-[#cca563]"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-[#a37e3b]" />
                    <span>Free cancellation · No advance payment needed</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#bc984d] to-[#a37e3b] hover:from-[#cca563] hover:to-[#bc984d] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 min-h-[46px]"
                  >
                    {isSubmitting ? (
                      <span>Confirming Table...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Confirm Reservation</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Information & Timings Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Timings Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fdfbf7] border border-[#e0cea6] text-[#a37e3b] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-normal text-stone-900">Operating Schedule</h3>
                  <p className="text-xs text-[#a37e3b] font-medium uppercase tracking-wider">All Days Open</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm border-t border-stone-100">
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-600 font-medium">All Days Dining</span>
                  <span className="font-semibold text-stone-900">12:00 PM – 12:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#a37e3b] font-medium">Happy Hours</span>
                  <span className="font-semibold text-stone-900">12:00 PM – 12:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-600 font-medium">Brunch & Lunch</span>
                  <span className="font-semibold text-stone-900">12:00 PM – 04:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-600 font-medium">Starlight Dinner</span>
                  <span className="font-semibold text-stone-900">07:00 PM – 12:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-stone-100 pt-2 text-stone-500 text-xs">
                  <span>Delivery & Takeaway</span>
                  <span>12:00 PM – 12:00 AM</span>
                </div>
              </div>
            </div>

            {/* Quick Contact & Concierge Card */}
            <div className="bg-stone-900 rounded-2xl p-6 sm:p-7 text-white space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#dec390] font-semibold">
                Direct Lounge Concierge
              </span>
              <h4 className="font-serif text-xl font-normal">Prefer to book via call or WhatsApp?</h4>
              <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                Our front desk manager is ready to assist with group bookings, customized party menus,
                candlelight setups, and corporate events.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+918451000000"
                  className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#cca563]" />
                  <span>Call: +91 84510 00000</span>
                </a>
                <a
                  href="https://wa.me/918451000000?text=Hi%20Upper%20Deck%20Sky%20Lounge%2C%20I%20would%20like%20to%20reserve%20a%20table"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* Offers card */}
            <div className="p-4 rounded-xl bg-[#fdfbf7] border border-[#e0cea6] flex items-center gap-3">
              <PartyPopper className="w-6 h-6 text-[#a37e3b] shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-stone-900">Current Dining Offer</p>
                <p className="text-stone-600">Flat 30% Off on select dining & happy hour food platters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
