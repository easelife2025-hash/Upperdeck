'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    image: '/images/hero_rooftop_lounge_1790782887679.jpg',
    title: 'Twilight Sky Deck Terrace',
    category: 'Ambiance',
    caption: 'Our signature open-air deck featuring warm woven rattan chandeliers and panoramic views of Navi Mumbai.',
  },
  {
    id: 2,
    image: '/images/hero_cocktail_sunset_1790782906080.jpg',
    title: 'Sundowner Cocktail Counter',
    category: 'Mixology',
    caption: 'Bespoke cocktails crafted with artisanal syrups, botanical infusions, and chilled crystal glassware.',
  },
  {
    id: 3,
    image: '/images/hero_gourmet_dining_1790782920279.jpg',
    title: 'Epicurean Tandoori & Asian Spread',
    category: 'Gastronomy',
    caption: 'Tantalizing charcoal-grilled kebabs, steaming dim sums, and fragrant royal biryanis.',
  },
  {
    id: 4,
    image: '/images/hero_night_ambience_1790782933289.jpg',
    title: 'Private Starlight Cabanas',
    category: 'Lounge',
    caption: 'Intimate curtained cabanas for birthdays, romantic candlelit dinners, and private celebrations.',
  },
  {
    id: 5,
    image: '/images/hero_cocktail_sunset_1790782906080.jpg',
    title: 'Golden Hour Happy Hours',
    category: 'Social',
    caption: 'Unwind with friends and colleagues with 12 PM to 12 AM happy hour pours and breezy rooftop air.',
  },
  {
    id: 6,
    image: '/images/hero_rooftop_lounge_1790782887679.jpg',
    title: 'Panoramic Night Vistas',
    category: 'Skyline',
    caption: 'Watch the cityscape sparkle from Centurion Mall’s 3rd floor open-air elevation.',
  },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  }, [lightboxIndex]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#a37e3b] mb-3">
            Visual Storytelling
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight text-balance">
            Atmosphere & Moments
          </h2>
          <div className="w-16 h-0.5 bg-[#cca563] mx-auto mt-6 mb-6" />
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed text-balance">
            A glimpse into the serene sunsets, celestial nights, curated mixology,
            and convivial gatherings at Upper Deck Sky Lounge.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500 border border-stone-200/80 bg-stone-950"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                referrerPolicy="no-referrer"
              />
              {/* Subtle scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Top Category Tag */}
              <div className="absolute top-4 left-4">
                <span className="text-[11px] uppercase tracking-wider text-[#dec390] bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 font-medium">
                  {item.category}
                </span>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-lg sm:text-xl font-normal text-stone-100">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-1 mt-0.5 font-light">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={GALLERY_ITEMS[lightboxIndex].image}
                alt={GALLERY_ITEMS[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lightbox Caption */}
            <div className="mt-4 text-center text-white max-w-xl px-4">
              <div className="flex items-center justify-center gap-2 text-xs text-[#dec390] uppercase tracking-wider font-semibold mb-1">
                <span>{GALLERY_ITEMS[lightboxIndex].category}</span>
                <span>·</span>
                <span className="text-white/60">
                  {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal">
                {GALLERY_ITEMS[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
                {GALLERY_ITEMS[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
