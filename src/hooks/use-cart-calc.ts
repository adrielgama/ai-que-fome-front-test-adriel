import { useMemo } from 'react'

import { formatCurrency } from '@/lib/formatter'
import { TicketItem, useProductStore } from '@/store/product-store'

interface Restaurant {
  freeDeliveryThreshold?: number
  minimumOrder?: number
  deliveryFee?: number
}

interface CartCalculations {
  subtotal: number
  meetsFreeDelivery: boolean
  meetsMinimumOrder: boolean
  deliveryFee: number
  finalTotal: number
  formattedFinalTotal: string
  formattedDeliveryFee: string
  formattedMinimumOrder: string
}

export function useCartCalculations(
  ticket: TicketItem[],
  restaurant: Restaurant | null
): CartCalculations {
  return useMemo(() => {
    const subtotal = useProductStore.getState().getSubtotal()
    const meetsFreeDelivery =
      subtotal >= (restaurant?.freeDeliveryThreshold ?? Infinity)
    const meetsMinimumOrder = subtotal >= (restaurant?.minimumOrder ?? 0)
    const deliveryFee = meetsFreeDelivery ? 0 : (restaurant?.deliveryFee ?? 0)
    const finalTotal = subtotal + deliveryFee

    return {
      subtotal,
      meetsFreeDelivery,
      meetsMinimumOrder,
      deliveryFee,
      finalTotal,
      formattedFinalTotal: formatCurrency(finalTotal),
      formattedDeliveryFee: formatCurrency(deliveryFee),
      formattedMinimumOrder: formatCurrency(restaurant?.minimumOrder ?? 0),
    }
  }, [ticket, restaurant])
}
