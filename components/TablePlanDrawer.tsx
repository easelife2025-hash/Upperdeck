'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Calendar,
  Share2,
  UtensilsCrossed,
  Info,
  Check,
  ShoppingBag,
} from 'lucide-react';
import { useTablePlan } from '@/lib/tablePlanContext';

interface TablePlanDrawerProps {
  onProceedToReservation: () => void;
  onOpenOrderModal: () => void;
}

export default function TablePlanDrawer({
  onProceedToReservation,
  onOpenOrderModal,
}: TablePlanDrawerProps) {
  const {
    plannedItems,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearPlan,
    totalCount,
    subtotal,
    estimatedGst,
    grandTotal,
  } = useTablePlan();

  if (!isDrawerOpen) return null;

  const handleSendToWhatsApp = () => {
    if (plannedItems.length === 0) return;
    const itemsFormatted = plannedItems
      .map(
        (item) => `• ${item.quantity}x ${item.dish.name} (₹${item.dish.price * item.quantity})`
      )
      .join('%0A');

    const msg = `*Upper Deck Sky Lounge - Table Dining Pre-Selection*%0A%0A${itemsFormatted}%0A%0A*Subtotal:* ₹${subtotal}%0A*Est. 5% GST:* ₹${estimatedGst}%0A*Grand Total:* ₹${grandTotal}%0A%0AHello, I would like to reserve a table and have these dishes prepared for our dining party!`;
    window.open(`https://wa.me/919320725000?text=${msg}`, '_blank');
  };

  const handleAttachToReservation = () => {
    closeDrawer();
    onProceedToReservation();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-[#fdfbf7]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-2xl font-normal text-stone-900">
                Table Dining Plan
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#cca563]/20 text-[#826030]">
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-light mt-0.5">
              Dishes & drinks pre-selected for your visit
            </p>
          </div>

          <button
            onClick={closeDrawer}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close table plan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner: How It Works */}
        <div className="px-5 py-3 bg-[#fdfbf7] border-b border-[#e0cea6]/50 flex items-start gap-2.5 text-xs text-stone-600">
          <Info className="w-4 h-4 text-[#a37e3b] shrink-0 mt-0.5" />
          <p>
            <strong className="font-medium text-stone-900">How it works:</strong> Pre-selecting dishes
            lets our chefs prepare your table with minimal wait time. You can attach this to your
            table booking or send directly to the lounge on WhatsApp.
          </p>
        </div>

        {/* Dish Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {plannedItems.length === 0 ? (
            <div className="text-center py-16 text-stone-500 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="font-serif text-lg text-stone-800">Your table plan is currently empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Browse our Starters, Indian, Pan-Asian curries and cocktails, then tap &quot;Add to Table Plan&quot;.
              </p>
              <button
                onClick={closeDrawer}
                className="mt-2 px-4 py-2 text-xs font-semibold text-[#a37e3b] border border-[#cca563] rounded-lg hover:bg-[#cca563]/10"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            plannedItems.map(({ dish, quantity }) => (
              <div
                key={dish.id}
                className="p-3.5 rounded-xl border border-stone-200/80 bg-white hover:border-[#cca563]/60 transition-all shadow-xs flex items-center gap-3.5"
              >
                {/* Dish Thumbnail */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src={dish.imageUrl}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute bottom-1 left-1 w-2.5 h-2.5 rounded-xs border bg-white flex items-center justify-center ${
                      dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${
                        dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm sm:text-base font-medium text-stone-900 truncate">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-[#a37e3b] font-semibold tabular-nums">
                    ₹{dish.price * quantity}{' '}
                    {quantity > 1 && (
                      <span className="text-[10px] text-stone-400 font-normal">
                        (₹{dish.price} each)
                      </span>
                    )}
                  </p>

                  {/* Quantity Stepper */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="inline-flex items-center border border-stone-200 rounded-md bg-stone-50">
                      <button
                        onClick={() => updateQuantity(dish.id, -1)}
                        className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold tabular-nums text-stone-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(dish.id, 1)}
                        className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(dish.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Calculations and Action CTAs */}
        {plannedItems.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-stone-200 bg-[#fdfbf7] space-y-4">
            {/* Bill breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-stone-900 tabular-nums">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Restaurant GST (5%):</span>
                <span className="text-stone-700 tabular-nums">₹{estimatedGst}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200/80">
                <span>Estimated Total:</span>
                <span className="text-[#a37e3b] font-bold text-base tabular-nums">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* 3 Action Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* Option 1: Attach to Table Reservation */}
              <button
                onClick={handleAttachToReservation}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#bc984d] to-[#a37e3b] hover:from-[#cca563] hover:to-[#bc984d] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Attach to Table Reservation</span>
              </button>

              {/* Option 2: Send directly via WhatsApp */}
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 min-h-[40px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Send to Lounge on WhatsApp</span>
              </button>

              {/* Clear Plan or Order Delivery */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={clearPlan}
                  className="text-stone-400 hover:text-rose-600 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>

                <button
                  onClick={() => {
                    closeDrawer();
                    onOpenOrderModal();
                  }}
                  className="text-[#a37e3b] hover:text-[#826030] font-semibold flex items-center gap-1"
                >
                  <UtensilsCrossed className="w-3 h-3" />
                  <span>Order on Zomato Instead</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
