'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, ExternalLink } from 'lucide-react';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl =
    'https://wa.me/919320725000?text=Hi%20Upper%20Deck%20Sky%20Lounge%2C%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation.';
  const zomatoUrl = 'https://www.zomato.com/mumbai/upper-deck-nerul-navi-mumbai';

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Scroll to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/95 border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-50 shadow-md flex items-center justify-center transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          aria-label="Scroll to top"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Real Zomato Floating Quick Link */}
      <a
        href={zomatoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full bg-[#E23744] hover:bg-[#cb2532] text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        title="Order on Zomato"
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs italic border border-white/30">
          z
        </div>
        <span className="text-xs font-bold tracking-wide hidden sm:inline">Zomato</span>
      </a>

      {/* Floating Call Button */}
      <a
        href="tel:+919320725000"
        className="pointer-events-auto group flex items-center gap-2 pl-3 pr-3.5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-stone-700"
        title="Call Upper Deck Concierge"
      >
        <Phone className="w-4 h-4 text-[#cca563]" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">Call Us</span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group flex items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 hover:shadow-2xl"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs font-bold tracking-wide">WhatsApp</span>
      </a>
    </div>
  );
}
