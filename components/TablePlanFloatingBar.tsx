'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useTablePlan } from '@/lib/tablePlanContext';

export default function TablePlanFloatingBar() {
  const { totalCount, grandTotal, openDrawer } = useTablePlan();

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-5 left-4 sm:left-6 z-40 animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
      <button
        onClick={openDrawer}
        className="flex items-center gap-3 px-4 py-3 rounded-full bg-stone-900/95 hover:bg-stone-900 text-white shadow-2xl border border-[#cca563]/50 backdrop-blur-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#cca563] text-stone-950 flex items-center justify-center font-bold text-xs">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
            {totalCount}
          </span>
        </div>

        <div className="text-left">
          <p className="text-[11px] uppercase tracking-wider text-[#dec390] font-semibold leading-none">
            Table Dining Plan
          </p>
          <p className="text-xs text-white font-bold tabular-nums mt-0.5">
            {totalCount} {totalCount === 1 ? 'dish' : 'dishes'} · ₹{grandTotal}
          </p>
        </div>

        <div className="pl-1 text-stone-400 group-hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
}
