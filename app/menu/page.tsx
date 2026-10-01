'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, UtensilsCrossed, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MenuSection from '@/components/MenuSection';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import DishDetailModal from '@/components/DishDetailModal';
import OrderOnlineModal from '@/components/OrderOnlineModal';
import TablePlanDrawer from '@/components/TablePlanDrawer';
import TablePlanFloatingBar from '@/components/TablePlanFloatingBar';
import { MenuItem } from '@/lib/menuData';

export default function MenuPage() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col selection:bg-[#cca563]/25 selection:text-[#826030]">
      {/* Sticky Minimal Navbar */}
      <Navbar
        onOpenReservation={() => {
          window.location.href = '/#reservation';
        }}
        onOpenOrder={() => setOrderModalOpen(true)}
      />

      {/* Luxury Hero Banner for Menu Page */}
      <section className="bg-stone-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-20 relative overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 bg-radial from-[#cca563]/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-300 hover:text-[#dec390] transition-colors bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Upper Deck Home</span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cca563]/20 border border-[#cca563]/30 text-[#dec390] text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#cca563]" />
              <span>Full Gastronomic Repertoire</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
              The Complete Epicurean Menu
            </h1>

            <p className="mt-4 text-stone-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl">
              From smoky clay-oven tandoori starters and slow-braised Awadhi curries to wok-fired
              dim sums and mixologist craft cocktails. Plan your courses or order online directly.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/#reservation"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#bc984d] to-[#a37e3b] hover:from-[#cca563] hover:to-[#bc984d] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center gap-2 min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve A Table</span>
              </Link>

              <button
                onClick={() => setOrderModalOpen(true)}
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 min-h-[44px]"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Order Online / Zomato</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Full Menu Component with all dishes (limit not set) */}
      <main className="flex-1">
        <MenuSection
          isFullPage={true}
          onSelectDish={(dish) => setSelectedDish(dish)}
          onOpenOrder={() => setOrderModalOpen(true)}
          onOpenReservation={() => {
            window.location.href = '/#reservation';
          }}
        />
      </main>

      {/* Minimal Luxury Footer */}
      <Footer
        onOpenReservation={() => {
          window.location.href = '/#reservation';
        }}
        onOpenOrder={() => setOrderModalOpen(true)}
      />

      {/* Persistent Floating WhatsApp, Call, and Zomato Actions */}
      <FloatingActions />

      {/* Persistent Floating Table Dining Plan Bar */}
      <TablePlanFloatingBar />

      {/* Interactive Table Dining Plan Drawer */}
      <TablePlanDrawer
        onProceedToReservation={() => {
          window.location.href = '/#reservation';
        }}
        onOpenOrderModal={() => setOrderModalOpen(true)}
      />

      {/* Interactive Dish Details Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onReserve={() => {
          setSelectedDish(null);
          window.location.href = '/#reservation';
        }}
      />

      {/* Order Online Modal (Zomato + Takeaway) */}
      <OrderOnlineModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
      />
    </div>
  );
}
