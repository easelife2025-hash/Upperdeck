'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, UtensilsCrossed, Calendar, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export default function Navbar({ onOpenReservation, onOpenOrder }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Reservation', href: '/#reservation' },
    { label: 'Location', href: '/#location' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs'
            : 'bg-white/90 backdrop-blur-xs border-b border-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-hidden"
          >
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-stone-900 group-hover:text-[#bc984d] transition-colors whitespace-nowrap">
              Upper Deck
              <span className="font-sans text-xs tracking-widest uppercase ml-2 text-[#a37e3b] font-medium hidden sm:inline">
                Sky Lounge
              </span>
            </span>
          </Link>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#a37e3b] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#bc984d] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenOrder}
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider uppercase text-stone-800 bg-stone-100 hover:bg-stone-200/80 rounded-md transition-colors whitespace-nowrap min-h-[40px]"
            >
              Order Online
            </button>
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#bc984d] to-[#a37e3b] hover:from-[#a37e3b] hover:to-[#826030] rounded-md shadow-xs transition-all duration-200 whitespace-nowrap min-h-[40px]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-stone-700 hover:text-stone-900 hover:bg-stone-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-stone-900">Upper Deck</h3>
                  <p className="text-xs text-[#a37e3b] font-medium tracking-wider uppercase">Sky Lounge & Dining</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium text-stone-700 hover:text-[#a37e3b] hover:bg-stone-50 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-stone-100 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#bc984d] to-[#a37e3b] text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrder();
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Order Online</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 text-xs text-stone-500 space-y-2">
              <p className="font-medium text-stone-800">Centurion Mall, Nerul/Seawoods</p>
              <p>Open All Days · 12:00 PM – 12:00 AM</p>
              <a
                href="tel:+919320725000"
                className="inline-flex items-center gap-2 text-[#a37e3b] font-medium pt-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Concierge: +91 93207 25000</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
