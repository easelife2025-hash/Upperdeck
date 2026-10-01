'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import ExperienceSection from '@/components/ExperienceSection';
import MenuSection from '@/components/MenuSection';
import GallerySection from '@/components/GallerySection';
import ReservationSection from '@/components/ReservationSection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import DishDetailModal from '@/components/DishDetailModal';
import OrderOnlineModal from '@/components/OrderOnlineModal';
import TablePlanDrawer from '@/components/TablePlanDrawer';
import TablePlanFloatingBar from '@/components/TablePlanFloatingBar';
import { MenuItem } from '@/lib/menuData';

export default function HomePage() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const handleOpenReservation = () => {
    const resEl = document.getElementById('reservation');
    if (resEl) {
      resEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col selection:bg-[#cca563]/25 selection:text-[#826030]">
      {/* Sticky Minimal Navbar */}
      <Navbar
        onOpenReservation={handleOpenReservation}
        onOpenOrder={() => setOrderModalOpen(true)}
      />

      {/* Main Content Sections: Home -> Experience -> Menu -> Gallery -> Reservation -> Location */}
      <main className="flex-1">
        {/* 1. Home: 4-Slide Auto-Looping Hero Banner */}
        <HeroBanner
          onOpenReservation={handleOpenReservation}
          onOpenOrder={() => setOrderModalOpen(true)}
        />

        {/* 2. About / Experience: The Rooftop Ambiance & Heritage */}
        <ExperienceSection />

        {/* 3. Interactive Menu: Show 6 featured dishes with option to view full menu page */}
        <MenuSection
          limit={6}
          onSelectDish={(dish) => setSelectedDish(dish)}
          onOpenOrder={() => setOrderModalOpen(true)}
          onOpenReservation={handleOpenReservation}
        />

        {/* 4. Gallery: Rooftop atmosphere, cocktails, dining with Lightbox */}
        <GallerySection />

        {/* 5. Reservation / Contact: Complete booking engine & operating hours */}
        <ReservationSection />

        {/* 6. Location: Map, directions, Centurion Mall Nerul/Seawoods */}
        <LocationSection />
      </main>

      {/* 7. Footer: Minimal luxury footer */}
      <Footer
        onOpenReservation={handleOpenReservation}
        onOpenOrder={() => setOrderModalOpen(true)}
      />

      {/* Persistent Floating WhatsApp, Call, and Zomato Actions */}
      <FloatingActions />

      {/* Floating Table Dining Plan Bar */}
      <TablePlanFloatingBar />

      {/* Interactive Table Dining Plan Drawer */}
      <TablePlanDrawer
        onProceedToReservation={handleOpenReservation}
        onOpenOrderModal={() => setOrderModalOpen(true)}
      />

      {/* Interactive Dish Details Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onReserve={() => {
          setSelectedDish(null);
          handleOpenReservation();
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
