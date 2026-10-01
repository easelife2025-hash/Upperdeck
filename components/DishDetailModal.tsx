'use client';

import React from 'react';
import Image from 'next/image';
import { X, Flame, Sparkles, Check, Plus, Minus, Calendar, ShoppingBag } from 'lucide-react';
import { MenuItem } from '@/lib/menuData';
import { useTablePlan } from '@/lib/tablePlanContext';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onReserve: () => void;
}

export default function DishDetailModal({
  dish,
  onClose,
  onReserve,
}: DishDetailModalProps) {
  const { addItem, getItemQuantity, updateQuantity, openDrawer } = useTablePlan();

  if (!dish) return null;

  const quantity = getItemQuantity(dish.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Image */}
        <div className="relative h-60 sm:h-72 w-full bg-stone-900 shrink-0">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 500px"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span
                className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center ${
                  dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                }`}
                title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                />
              </span>
              <span className="text-xs font-medium tracking-wide uppercase text-stone-200">
                {dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              </span>
            </div>

            {dish.isChefSpecial && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#dec390] bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#cca563]/40">
                <Sparkles className="w-3 h-3 text-[#cca563]" />
                Chef&apos;s Signature
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-normal text-stone-900 leading-snug">
                {dish.name}
              </h3>
              <p className="text-xs text-stone-500 mt-1">{dish.portion}</p>
            </div>
            <p className="font-sans text-2xl font-semibold text-[#a37e3b] tabular-nums shrink-0">
              ₹{dish.price}
            </p>
          </div>

          <p className="text-stone-600 text-sm font-light leading-relaxed">
            {dish.description}
          </p>

          {/* Dish Specs */}
          <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2">
            {dish.spiceLevel && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-50 border border-stone-200/80 text-xs text-stone-600">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Spice: {dish.spiceLevel}</span>
              </div>
            )}
            {dish.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-stone-50 border border-stone-200/80 text-xs text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Info note */}
          <div className="p-3.5 rounded-xl bg-[#fdfbf7] border border-[#e0cea6]/60 text-xs text-stone-600 space-y-1">
            <p className="font-medium text-stone-900 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#a37e3b]" />
              <span>Table Plan Pre-Preparation</span>
            </p>
            <p>
              Add this dish to your Table Plan so our chefs prepare your table with minimal wait time on arrival.
            </p>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {quantity > 0 ? (
            <div className="flex-1 flex items-center justify-between p-1 bg-white border border-[#cca563] rounded-lg">
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(dish.id, -1)}
                  className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold text-stone-900 tabular-nums">
                  {quantity} in Table Plan
                </span>
                <button
                  onClick={() => updateQuantity(dish.id, 1)}
                  className="w-9 h-9 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  openDrawer();
                }}
                className="px-3 py-1.5 text-xs font-semibold text-[#a37e3b] hover:underline"
              >
                View Plan
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(dish)}
              className="flex-1 py-3 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Table Plan</span>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onReserve();
            }}
            className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#bc984d] to-[#a37e3b] hover:from-[#a37e3b] hover:to-[#826030] text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-xs transition-colors min-h-[44px]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book A Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}
