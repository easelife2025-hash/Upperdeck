'use client';

import React from 'react';
import { X, Phone, ExternalLink, Clock, MapPin, ShoppingBag } from 'lucide-react';

interface OrderOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  plannedDishesCount?: number;
}

export default function OrderOnlineModal({ isOpen, onClose, plannedDishesCount }: OrderOnlineModalProps) {
  if (!isOpen) return null;

  const zomatoUrl = 'https://www.zomato.com/mumbai/upper-deck-nerul-navi-mumbai';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 p-6 sm:p-7">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-stone-100"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#fdfbf7] border border-[#e0cea6] text-[#a37e3b] mx-auto flex items-center justify-center mb-3">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl font-normal text-stone-900">Order Online & Takeaway</h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Enjoy Upper Deck’s gourmet kitchen delivered to your doorstep or ready for express pickup.
          </p>
        </div>

        {/* Timings banner */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 mb-5 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1.5 font-medium text-stone-800">
            <Clock className="w-4 h-4 text-[#a37e3b]" />
            <span>Delivery & Takeaway</span>
          </div>
          <span className="font-semibold text-stone-900">12:00 PM – 12:00 AM</span>
        </div>

        {/* Action Options */}
        <div className="space-y-3">
          {/* Zomato Official Button */}
          <a
            href={zomatoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-xl bg-[#E23744] hover:bg-[#cb2532] text-white flex items-center justify-between shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <div className="flex items-center gap-3">
              {/* Real Zomato Logo Representation */}
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center font-bold text-lg italic text-white border border-white/30">
                z
              </div>
              <div className="text-left">
                <p className="text-sm font-bold tracking-wide flex items-center gap-1.5">
                  Order via Zomato
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </p>
                <p className="text-xs text-white/90 font-light">Fast delivery · Live tracking · Exclusive offers</p>
              </div>
            </div>
            <span className="text-xs bg-white text-[#E23744] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Open
            </span>
          </a>

          {/* Direct Takeaway / Call Desk */}
          <a
            href="tel:+919320725000"
            className="w-full p-4 rounded-xl border border-stone-200 hover:border-[#cca563] bg-white hover:bg-stone-50 flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-100 text-[#a37e3b] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-stone-900">Direct Takeaway & Curbside</p>
                <p className="text-xs text-stone-500 font-light">Call: +91 93207 25000 (0% commission)</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#a37e3b]">Call Now</span>
          </a>
        </div>

        {/* Location note */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500 justify-center">
          <MapPin className="w-3.5 h-3.5 text-[#a37e3b]" />
          <span>Centurion Mall, 3rd Floor, Nerul Rd, Navi Mumbai</span>
        </div>
      </div>
    </div>
  );
}
