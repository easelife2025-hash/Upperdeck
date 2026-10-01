'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export default function Footer({ onOpenReservation, onOpenOrder }: FooterProps) {
  const zomatoUrl = 'https://www.zomato.com/mumbai/upper-deck-nerul-navi-mumbai';
  const whatsappUrl =
    'https://wa.me/918451000000?text=Hi%20Upper%20Deck%20Sky%20Lounge%2C%20I%20would%20like%20to%20reserve%20a%20table';

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-24 sm:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stone-800/80">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
              Upper Deck
              <span className="block text-xs uppercase tracking-widest text-[#cca563] font-sans font-semibold mt-1">
                Sky Lounge & Restaurant
              </span>
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
              Navi Mumbai’s premier open-air rooftop dining destination. Panoramic city skylines,
              handcrafted cocktails, all-day happy hours, and multi-cuisine culinary mastery.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E23744] hover:bg-[#cb2532] text-white text-xs font-bold transition-colors"
              >
                <span className="italic">z</span>
                <span>Zomato Profile</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-white">
              Navigation
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <Link href="/#home" className="hover:text-[#cca563] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-[#cca563] transition-colors">
                  The Experience
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#cca563] transition-colors">
                  Full Menu
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-[#cca563] transition-colors">
                  Atmosphere Gallery
                </Link>
              </li>
              <li>
                <Link href="/#reservation" className="hover:text-[#cca563] transition-colors">
                  Table Reservation
                </Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-[#cca563] transition-colors">
                  Location & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Timings (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-white">
              Operating Schedule
            </p>
            <div className="space-y-2 text-xs text-stone-400 font-light">
              <div className="flex justify-between">
                <span>All Days:</span>
                <span className="text-stone-200 font-medium">12:00 PM – 12:00 AM</span>
              </div>
              <div className="flex justify-between text-[#cca563]">
                <span>Happy Hours:</span>
                <span className="font-semibold">12:00 PM – 12:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Brunch & Lunch:</span>
                <span className="text-stone-200">12:00 PM – 04:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Starlight Dinner:</span>
                <span className="text-stone-200">07:00 PM – 12:00 AM</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-800 text-stone-500">
                <span>Delivery & Takeaway:</span>
                <span>12:00 PM – 12:00 AM</span>
              </div>
            </div>
          </div>

          {/* Location & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-white">
              Location & Contact
            </p>
            <div className="space-y-3 text-xs text-stone-400 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#cca563] shrink-0 mt-0.5" />
                <span>
                  SeaWoods, T-25-30, 3rd Floor, Centurion Mall, Sector 19A, Nerul Rd, Navi Mumbai,
                  Maharashtra 400706.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#cca563] shrink-0" />
                <a href="tel:+918451000000" className="hover:text-white transition-colors">
                  +91 84510 00000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#cca563] shrink-0" />
                <span>Google Rating: 4.0 ★ (Reviews - 2500+)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#bc984d] to-[#a37e3b] text-white text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Upper Deck Sky Lounge. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span>Centurion Mall, Nerul, Navi Mumbai</span>
            <span>·</span>
            <span>FSSAI Certified Kitchen</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
