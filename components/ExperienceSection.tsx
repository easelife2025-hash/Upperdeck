'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Wine, Flame, Clock, Heart, Award } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      icon: Sparkles,
      title: 'Open-Air Sky Terrace',
      description:
        'Perched on the 3rd floor of Centurion Mall, our open sky terrace invites gentle coastal breezes and panoramic vistas of the Navi Mumbai twilight horizon.',
    },
    {
      icon: Flame,
      title: 'Warm Rattan Ambient Glow',
      description:
        'Inspired by relaxed tropical lounge aesthetics, our signature handwoven pendant lamps and cozy cabana couches create an intimate, sophisticated sanctuary.',
    },
    {
      icon: Award,
      title: 'Culinary Masterpieces',
      description:
        'A harmonized selection of royal Indian curries, smoky charcoal tandoori kebabs, handcrafted dim sums, and wok-fired Pan-Asian delicacies.',
    },
    {
      icon: Wine,
      title: 'All-Day Happy Hours',
      description:
        'From 12 PM noon to 12 AM midnight, relish handcrafted cocktails, crisp draught beers, and signature sundowner aperitifs with exceptional dining offers.',
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#a37e3b] mb-3">
            The Ambiance & Heritage
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight text-balance">
            Where Skylines Meet Elevated Flavors
          </h2>
          <div className="w-16 h-0.5 bg-[#cca563] mx-auto mt-6 mb-6" />
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed text-balance">
            Upper Deck Sky Lounge was conceived to offer Navi Mumbai a refined rooftop escape.
            Step away from the city hustle into an open-air haven of warm golden light, plush lounging,
            and memorable gastronomy under the starlit sky.
          </p>
        </div>

        {/* Feature Showcase: Asymmetric Two-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          {/* Visual Showcase Left */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-stone-100">
              <Image
                src="/images/hero_rooftop_lounge_1790782887679.jpg"
                alt="Upper Deck Sky Lounge Rooftop Ambiance"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#dec390] font-semibold">
                  Centurion Mall, Seawoods
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal mt-1">
                  Sunset to Starlight Deck
                </h3>
              </div>
            </div>

            {/* Floating Luxury Detail Box */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-lg border border-stone-200/80 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#e0cea6] flex items-center justify-center text-[#a37e3b] shrink-0">
                  <Heart className="w-5 h-5 fill-[#cca563]/20" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Customer Love</p>
                  <p className="text-stone-900 font-semibold text-sm">4.0 ★ Based on 2,950+ Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Right */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <span className="inline-block text-xs uppercase tracking-widest text-[#a37e3b] font-semibold">
                An Atmosphere of Distinction
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal leading-snug">
                Designed for celebrations, casual sundowners, and romantic rendezvous.
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
                Whether you’re catching up with friends over our all-day happy hours, hosting a corporate dinner,
                or celebrating a special milestone, Upper Deck offers thoughtfully zoned spaces — from breezy
                al-fresco deck tables to comfortable cabana lounges and an intimate indoor dining lounge.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                <p className="text-2xl font-serif text-[#a37e3b] font-medium">12 Hrs</p>
                <p className="text-xs text-stone-600 font-medium mt-1">Daily Service (12 PM – 12 AM)</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                <p className="text-2xl font-serif text-[#a37e3b] font-medium">Flat 30%</p>
                <p className="text-xs text-stone-600 font-medium mt-1">Special Dining Offers</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-white border border-stone-200/70 hover:border-[#cca563]/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#fdfbf7] border border-[#e0cea6] text-[#a37e3b] flex items-center justify-center mb-5 group-hover:bg-[#bc984d] group-hover:text-white group-hover:border-[#bc984d] transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-stone-900 mb-2">
                    {exp.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
