'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  Plus,
  Minus,
  Check,
  Eye,
  ShoppingBag,
  Share2,
  Calendar,
  X,
  FileText,
  ArrowRight,
  Info,
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '@/lib/menuData';
import { useTablePlan } from '@/lib/tablePlanContext';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onOpenOrder: () => void;
  onOpenReservation: () => void;
  limit?: number;
  isFullPage?: boolean;
}

export default function MenuSection({
  onSelectDish,
  onOpenOrder,
  onOpenReservation,
  limit,
  isFullPage = false,
}: MenuSectionProps) {
  const {
    addItem,
    updateQuantity,
    getItemQuantity,
    openDrawer,
    totalCount,
    grandTotal,
    subtotal,
    plannedItems,
    clearPlan,
  } = useTablePlan();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;
      if (dietFilter === 'special' && !item.isChefSpecial) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));
        return matchName || matchDesc || matchTags;
      }

      return true;
    });
  }, [activeCategory, dietFilter, searchQuery]);

  const handleSharePlanViaWhatsApp = () => {
    if (plannedItems.length === 0) return;
    const itemsList = plannedItems
      .map((item) => `• ${item.quantity}x ${item.dish.name} (₹${item.dish.price * item.quantity})`)
      .join('%0A');
    const msg = `Hi Upper Deck Sky Lounge, I am planning a table reservation and would like to pre-select these dishes:%0A%0A${itemsList}%0A%0A*Estimated Total:* ₹${grandTotal}%0APlease let me know table availability!`;
    window.open(`https://wa.me/919320725000?text=${msg}`, '_blank');
  };

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#fdfbf7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#a37e3b] mb-3">
            Epicurean Collection
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight text-balance">
            Interactive Gastronomy Menu
          </h2>
          <div className="w-16 h-0.5 bg-[#cca563] mx-auto mt-6 mb-6" />
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed text-balance">
            Explore authentic clay-tandoor grills, rich Awadhi gravies, wok-fresh Asian delights,
            and crafted cocktails. Tap any card for portion notes and flavor profiles.
          </p>
        </div>

        {/* Informative Table Plan Guide Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#e0cea6] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#fdfbf7] border border-[#cca563] text-[#a37e3b] flex items-center justify-center font-bold text-sm shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-900 text-sm">
                How &quot;Add to Table Plan&quot; Works:
              </p>
              <p className="text-stone-600 font-light mt-0.5">
                Pre-select your dishes so our chefs prepare them fresh on your arrival. Estimate
                your dining bill, attach it to your Table Reservation, or send directly to our
                concierge on WhatsApp.
              </p>
            </div>
          </div>

          {totalCount > 0 ? (
            <button
              onClick={openDrawer}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#bc984d] to-[#a37e3b] hover:from-[#cca563] hover:to-[#bc984d] text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all whitespace-nowrap min-h-[38px] flex items-center gap-2"
            >
              <span>View Table Plan ({totalCount} items · ₹{grandTotal})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-[11px] text-stone-400 italic">
              Tap &quot;Add to Table Plan&quot; on any dish below
            </span>
          )}
        </div>

        {/* Search & Dietary Control Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Dietary Filter Segmented Control */}
          <div className="inline-flex p-1 bg-stone-200/70 rounded-xl max-w-full overflow-x-auto">
            <button
              onClick={() => setDietFilter('all')}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[36px] ${
                dietFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Delicacies
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[36px] ${
                dietFilter === 'veg'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setDietFilter('non-veg')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[36px] ${
                dietFilter === 'non-veg'
                  ? 'bg-white text-rose-800 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Non-Veg</span>
            </button>
            <button
              onClick={() => setDietFilter('special')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[36px] ${
                dietFilter === 'special'
                  ? 'bg-white text-[#826030] shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#cca563]" />
              <span>Chef&apos;s Choice</span>
            </button>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, cocktails, spices..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-[#cca563] focus:ring-1 focus:ring-[#cca563] transition-all min-h-[40px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Scrolling Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-stone-200">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-[40px] ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="font-serif text-xl text-stone-800">No dishes match your selection.</p>
            <p className="text-xs text-stone-500 mt-1">
              Try resetting filters or searching for another keyword.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#a37e3b] border border-[#cca563] rounded-lg hover:bg-[#cca563]/10"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {(limit ? filteredItems.slice(0, limit) : filteredItems).map((item) => {
                const quantity = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:border-[#cca563]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Card Visual Header */}
                    <div
                      onClick={() => onSelectDish(item)}
                      className="relative h-48 sm:h-52 w-full bg-stone-900 cursor-pointer overflow-hidden"
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Veg/Non-Veg & Chef badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <div
                          className={`w-4 h-4 rounded-xs border bg-white flex items-center justify-center ${
                            item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                          }`}
                          title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}
                          />
                        </div>
                      </div>

                      {item.isChefSpecial && (
                        <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-[#dec390] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#cca563]/40 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-[#cca563]" />
                          <span>Chef Special</span>
                        </div>
                      )}

                      {/* Quick view prompt */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-xs">
                        <span className="inline-flex items-center gap-1.5 text-xs text-white bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Flavors & Pairings</span>
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 text-white text-xs font-light">
                        <span>{item.portion}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3
                            onClick={() => onSelectDish(item)}
                            className="font-serif text-lg sm:text-xl font-normal text-stone-900 leading-snug group-hover:text-[#a37e3b] transition-colors cursor-pointer"
                          >
                            {item.name}
                          </h3>
                          <p className="font-sans text-lg font-semibold text-[#a37e3b] tabular-nums shrink-0">
                            ₹{item.price}
                          </p>
                        </div>

                        <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectDish(item)}
                          className="text-xs text-stone-600 hover:text-stone-900 font-medium py-1.5 px-2 rounded-md hover:bg-stone-50 transition-colors"
                        >
                          Details
                        </button>

                        {/* Interactive Quantity Control or Add to Plan */}
                        {quantity > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <div className="inline-flex items-center border border-[#cca563] rounded-lg bg-[#fdfbf7] p-0.5 shadow-xs">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-[#e0cea6]/50 rounded-md transition-colors"
                                title="Decrease portion"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-stone-900 tabular-nums">
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-[#e0cea6]/50 rounded-md transition-colors"
                                title="Add portion"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={openDrawer}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 text-xs font-medium flex items-center gap-1 transition-colors"
                              title="View in Table Plan"
                            >
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="hidden sm:inline">Planned</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addItem(item)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide bg-stone-100 hover:bg-[#fdfbf7] text-stone-700 hover:text-[#a37e3b] hover:border-[#cca563] border border-transparent transition-all min-h-[36px]"
                            title="Add to Table Dining Plan"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Table Plan</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View Full Menu CTA when limit is specified */}
            {limit && (
              <div className="mt-12 sm:mt-14 text-center">
                <div className="inline-flex flex-col items-center bg-white p-6 sm:p-8 rounded-2xl border border-[#e0cea6]/70 shadow-sm max-w-xl mx-auto">
                  <span className="text-xs uppercase tracking-widest text-[#a37e3b] font-semibold mb-2">
                    Culinary Repertoire
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 mb-2">
                    Want to explore more dishes?
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mb-6 text-balance">
                    Showing 6 featured creations. Explore our entire gourmet collection spanning
                    Clay-Tandoor specials, Awadhi curries, Chinese Dim Sums, desserts and craft
                    cocktails.
                  </p>
                  <Link
                    href="/menu"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#bc984d] to-[#a37e3b] hover:from-[#cca563] hover:to-[#bc984d] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px]"
                  >
                    <span>View Full Menu ({MENU_ITEMS.length}+ Delicacies)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* Dining Plan Floating / Bottom Bar */}
        {totalCount > 0 && (
          <div className="mt-12 p-4 sm:p-6 rounded-2xl bg-white border border-[#e0cea6] shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#cca563] text-[#a37e3b] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                  Your Table Dining Plan
                </p>
                <p className="text-stone-900 font-serif text-lg font-medium">
                  {totalCount} Item{totalCount > 1 ? 's' : ''} Selected · Total:{' '}
                  <span className="text-[#a37e3b] font-sans font-bold tabular-nums">
                    ₹{grandTotal}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={openDrawer}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold tracking-wide shadow-xs min-h-[40px]"
              >
                <span>Review & Customize Plan</span>
              </button>

              <button
                onClick={handleSharePlanViaWhatsApp}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wide shadow-xs min-h-[40px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Send to WhatsApp Desk</span>
              </button>

              <button
                onClick={onOpenReservation}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#bc984d] to-[#a37e3b] text-white text-xs font-semibold tracking-wide shadow-xs min-h-[40px]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Table For This</span>
              </button>

              <button
                onClick={clearPlan}
                className="p-2 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Clear selected dishes"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Quick Order Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
          <div className="text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#dec390] font-semibold">
              Dining from Home or Office?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-1">
              Order Online with Express Delivery
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
              Available 12 PM to 12 AM on Zomato and direct takeaway from Centurion Mall, Nerul.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.zomato.com/mumbai/upper-deck-nerul-navi-mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-lg bg-[#E23744] hover:bg-[#cb2532] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 min-h-[44px]"
            >
              <span className="italic font-extrabold text-base">z</span>
              <span>Order on Zomato</span>
            </a>

            <button
              onClick={onOpenOrder}
              className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md border border-white/20 transition-all min-h-[44px]"
            >
              Takeaway Options
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
