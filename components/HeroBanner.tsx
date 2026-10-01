'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Calendar, UtensilsCrossed, ChevronLeft, ChevronRight, MapPin, Star, Clock } from 'lucide-react';

interface HeroBannerProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    image: '/images/hero_rooftop_lounge_1790782887679.jpg',
    kicker: 'Navi Mumbai’s Iconic Sky Deck',
    title: 'Elevate Your Dining Above The City',
    description:
      'Immerse in an enchanting open-air rooftop ambiance with panoramic skyline vistas, warm woven lantern glows, and luxurious lounge seating.',
  },
  {
    id: 2,
    image: '/images/hero_cocktail_sunset_1790782906080.jpg',
    kicker: 'Craft Mixology & Sundowners',
    title: 'Artisanal Sips & Golden Hour Skies',
    description:
      'Savor bespoke signature cocktails, all-day happy hours, and refreshing aperitifs as the Navi Mumbai sunset paints the horizon.',
  },
  {
    id: 3,
    image: '/images/hero_gourmet_dining_1790782920279.jpg',
    kicker: 'Multi-Cuisine Culinary Artistry',
    title: 'A Symphony of Indian & Asian Flavors',
    description:
      'From smoky clay-oven tandoori kebabs to delicate handcrafted dim sums, every dish is an ode to refined gastronomy.',
  },
  {
    id: 4,
    image: '/images/hero_night_ambience_1790782933289.jpg',
    kicker: 'Intimate Rooftop Cabanas',
    title: 'Evenings Written In Starlight',
    description:
      'Celebrate life’s finest milestones under glowing rattan pergolas, lush greenery, and ambient lounge soundscapes.',
  },
];

export default function HeroBanner({ onOpenReservation, onOpenOrder }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-stone-950 text-white min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Fallback container with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-black" />

            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center transform scale-105 transition-transform duration-7000 ease-out"
                sizes="100vw"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Cinematic Gradient Scrim: Deep bottom, gentle top, subtle center darkening for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-stone-950/40" />
            <div className="absolute inset-0 bg-radial from-transparent via-stone-950/30 to-stone-950/80" />
          </div>
        );
      })}

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Location & Status Bar */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-stone-200 text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-1 text-[#cca563]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Centurion Mall, Nerul/Seawoods</span>
          </div>
          <span className="text-white/40">·</span>
          <div className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open Till 12 AM</span>
          </div>
          <span className="text-white/40 hidden sm:inline">·</span>
          <div className="items-center gap-1 text-amber-300 hidden sm:flex">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>4.0 (2,950+ Reviews)</span>
          </div>
        </div>

        {/* Dynamic Slide Text */}
        <div className="min-h-[140px] sm:min-h-[170px] flex flex-col items-center justify-center">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#dec390] mb-3 transition-all duration-300">
            {HERO_SLIDES[currentSlide].kicker}
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white max-w-3xl leading-[1.15] text-balance mb-4 sm:mb-5 transition-all duration-500">
            {HERO_SLIDES[currentSlide].title}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl font-light leading-relaxed text-balance transition-all duration-500">
            {HERO_SLIDES[currentSlide].description}
          </p>
        </div>

        {/* Two Main CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#bc984d] to-[#a37e3b] hover:from-[#cca563] hover:to-[#bc984d] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#bc984d]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 min-h-[48px]"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Table</span>
          </button>

          <button
            onClick={onOpenOrder}
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 min-h-[48px]"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Order Online</span>
          </button>
        </div>

        {/* Slide Indicators & Navigation Bar */}
        <div className="mt-12 sm:mt-14 flex items-center justify-between w-full max-w-md pt-4 border-t border-white/10">
          <button
            onClick={prevSlide}
            className="p-2 text-white/60 hover:text-white transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2 sm:gap-3">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`group relative h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentSlide
                    ? 'w-8 sm:w-10 bg-[#cca563]'
                    : 'w-2 sm:w-2.5 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className="sr-only">Slide {idx + 1}</span>
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 text-white/60 hover:text-white transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Trust Strip at bottom */}
      <div className="absolute bottom-0 inset-x-0 z-20 hidden md:block bg-stone-900/60 backdrop-blur-sm border-t border-white/10 py-3">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cca563]" />
            <span className="font-medium text-white">Happy Hours:</span> 12 PM – 12 AM (All Days)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cca563]" />
            <span className="font-medium text-white">Dining Offers:</span> Flat 30% Off on Selected Delicacies
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cca563]" />
            <span className="font-medium text-white">Experience:</span> Open-Air Sky Deck & Private Cabanas
          </div>
        </div>
      </div>
    </section>
  );
}
