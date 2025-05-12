import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Product } from '@/types/products'

export type TicketItem = Product & {
  uniqueId: string
  quantity: number
  selectedSize?: string
  selectedDrinks?: Record<string, number>
  selectedAccompaniments?: string[]
  selectedOthers?: string[]
  selectedUtensils?: string
  notes?: string
  options?: Product['options']
}

interface PendingFooter {
  onConfirm: () => void
}

interface ProductState {
  ticket: TicketItem[]
  addToTicket: (item: Omit<TicketItem, 'uniqueId'>) => void
  removeFromTicket: (uniqueId: string) => void
  clearTicket: () => void
  pendingFooter: PendingFooter | null
  setPendingFooter: (footer: PendingFooter | null) => void
  incrementQuantity: (uniqueId: string) => void
  decrementQuantity: (uniqueId: string) => void
  getSubtotal: () => number
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      ticket: [],
      addToTicket: (item) => {
        if (item.quantity === 0) return
        const uniqueId = uuidv4()
        const newItem = { ...item, uniqueId, options: item.options }
        set({ ticket: [...get().ticket, newItem] })
      },
      removeFromTicket: (uniqueId: string) => {
        set({
          ticket: get().ticket.filter(
            (product) => product.uniqueId !== uniqueId
          ),
        })
      },
      clearTicket: () => set({ ticket: [] }),
      pendingFooter: null,
      setPendingFooter: (footer) => set({ pendingFooter: footer }),
      incrementQuantity: (uniqueId: string) => {
        set({
          ticket: get().ticket.map((product) =>
            product.uniqueId === uniqueId
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        })
      },
      decrementQuantity: (uniqueId: string) => {
        set({
          ticket: get()
            .ticket.map((product) => {
              if (product.uniqueId !== uniqueId) return product
              const newQty = product.quantity - 1
              return newQty > 0 ? { ...product, quantity: newQty } : null
            })
            .filter(Boolean) as TicketItem[],
        })
      },
      getSubtotal: () => {
        return get().ticket.reduce((sum, item) => {
          const base =
            item.options?.sizes?.find((s) => s.label === item.selectedSize)
              ?.discount ??
            item.options?.sizes?.find((s) => s.label === item.selectedSize)
              ?.price ??
            item.discount ??
            item.price

          const drinks = Object.entries(item.selectedDrinks || {}).reduce(
            (acc, [name, qty]) => {
              const unit =
                item.options?.drinks?.find((d) => d.name === name)?.price ?? 0
              return acc + qty * unit
            },
            0
          )

          const others = (item.selectedOthers || []).reduce((acc, name) => {
            const unit =
              item.options?.others?.find((o) => o.name === name)?.price ?? 0
            return acc + unit
          }, 0)

          const utensil =
            item.options?.utensils?.find(
              (u) => u.name === item.selectedUtensils
            )?.price ?? 0

          return sum + (base + drinks + others + utensil) * item.quantity
        }, 0)
      },
    }),
    {
      name: 'restaurant-ticket',
    }
  )
)
