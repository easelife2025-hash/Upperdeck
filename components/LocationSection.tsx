'use client';

import React from 'react';
import { MapPin, Navigation, Car, Train, Clock, ExternalLink } from 'lucide-react';

export default function LocationSection() {
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Upper+Deck+Sky+Lounge+Centurion+Mall+Nerul+Navi+Mumbai';

  return (
    <section id="location" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#a37e3b] mb-3">
            Find Our Rooftop Sanctuary
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight text-balance">
            Location & Directions
          </h2>
          <div className="w-16 h-0.5 bg-[#cca563] mx-auto mt-6 mb-6" />
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed text-balance">
            Conveniently situated on the 3rd Floor of Centurion Mall, Sector 19A, Nerul / Seawoods,
            with ample parking and easy transit access from Palm Beach Road.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Details Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-xs space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#fdfbf7] border border-[#e0cea6] text-[#a37e3b] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-normal text-stone-900">Upper Deck Sky Lounge</h3>
                  <p className="text-stone-600 text-xs sm:text-sm font-light mt-1 leading-relaxed">
                    SeaWoods, T-25-30, 3rd Floor, Centurion Mall, Sector 19A, Nerul Rd, Navi Mumbai,
                    Maharashtra 400706.
                  </p>
                </div>
              </div>

              {/* Transit & Landmark Highlights */}
              <div className="pt-4 border-t border-stone-200/60 space-y-3.5 text-xs sm:text-sm text-stone-600">
                <div className="flex items-center gap-3">
                  <Train className="w-4 h-4 text-[#a37e3b] shrink-0" />
                  <span>
                    <strong className="text-stone-900 font-medium">Railway:</strong> 3 mins from
                    Seawoods Grand Central & Nerul Station
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-[#a37e3b] shrink-0" />
                  <span>
                    <strong className="text-stone-900 font-medium">Road:</strong> 2 mins from Palm
                    Beach Road junction
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#a37e3b] shrink-0" />
                  <span>
                    <strong className="text-stone-900 font-medium">Elevator:</strong> Direct mall
                    elevators straight to 3rd Floor Sky Lounge
                  </span>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#bc984d] to-[#a37e3b] hover:from-[#a37e3b] hover:to-[#826030] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all min-h-[44px]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Parking & Valet Information */}
            <div className="p-4 rounded-xl bg-[#fdfbf7] border border-[#e0cea6]/70 text-xs text-stone-600">
              <p className="font-semibold text-stone-900">Complimentary Mall Parking</p>
              <p className="mt-0.5 font-light">
                Centurion Mall features multi-level covered basement parking for two-wheelers and
                four-wheelers.
              </p>
            </div>
          </div>

          {/* Right Interactive Visual Map View (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-stone-200/80 shadow-md bg-stone-100 group">
              {/* Styled Map Representation */}
              <iframe
                title="Upper Deck Sky Lounge Centurion Mall Map"
                src="https://maps.google.com/maps?q=Centurion+Mall+Nerul+Navi+Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-25 group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Floating Overlay Badge on Map */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-stone-200 pointer-events-none max-w-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold text-xs text-stone-900">
                    Upper Deck Sky Lounge
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">3rd Floor, Centurion Mall, Nerul</p>
              </div>

              {/* Map CTA on mobile/tablet */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg backdrop-blur-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Navigate</span>
                <Navigation className="w-3.5 h-3.5 text-[#cca563]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
