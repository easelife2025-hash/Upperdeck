'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { MenuItem } from './menuData';

export interface PlannedItem {
  dish: MenuItem;
  quantity: number;
}

interface TablePlanContextType {
  plannedItems: PlannedItem[];
  addItem: (dish: MenuItem) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, delta: number) => void;
  clearPlan: () => void;
  getItemQuantity: (dishId: string) => number;
  totalCount: number;
  subtotal: number;
  estimatedGst: number;
  grandTotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const TablePlanContext = createContext<TablePlanContextType | undefined>(undefined);

const STORAGE_KEY = 'upper_deck_table_plan_v1';

function getInitialPlannedItems(): PlannedItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function TablePlanProvider({ children }: { children: React.ReactNode }) {
  const [plannedItems, setPlannedItems] = useState<PlannedItem[]>(getInitialPlannedItems);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const saveToStorage = useCallback((items: PlannedItem[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  const addItem = useCallback(
    (dish: MenuItem) => {
      setPlannedItems((prev) => {
        const existing = prev.find((item) => item.dish.id === dish.id);
        const updated = existing
          ? prev.map((item) =>
              item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...prev, { dish, quantity: 1 }];
        saveToStorage(updated);
        return updated;
      });
      setIsDrawerOpen(true);
    },
    [saveToStorage]
  );

  const removeItem = useCallback(
    (dishId: string) => {
      setPlannedItems((prev) => {
        const updated = prev.filter((item) => item.dish.id !== dishId);
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const updateQuantity = useCallback(
    (dishId: string, delta: number) => {
      setPlannedItems((prev) => {
        const updated = prev
          .map((item) => {
            if (item.dish.id === dishId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as PlannedItem[];
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const clearPlan = useCallback(() => {
    setPlannedItems([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, []);

  const getItemQuantity = useCallback(
    (dishId: string) => {
      const item = plannedItems.find((p) => p.dish.id === dishId);
      return item ? item.quantity : 0;
    },
    [plannedItems]
  );

  const totalCount = plannedItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = plannedItems.reduce((acc, curr) => acc + curr.dish.price * curr.quantity, 0);
  const estimatedGst = Math.round(subtotal * 0.05); // 5% restaurant GST
  const grandTotal = subtotal + estimatedGst;

  return (
    <TablePlanContext.Provider
      value={{
        plannedItems,
        addItem,
        removeItem,
        updateQuantity,
        clearPlan,
        getItemQuantity,
        totalCount,
        subtotal,
        estimatedGst,
        grandTotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </TablePlanContext.Provider>
  );
}

export function useTablePlan() {
  const context = useContext(TablePlanContext);
  if (!context) {
    throw new Error('useTablePlan must be used within a TablePlanProvider');
  }
  return context;
}
