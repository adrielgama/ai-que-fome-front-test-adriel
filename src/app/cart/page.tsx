'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { TicketItem, useProductStore } from '@/store/product-store'
import { useRestaurantStore } from '@/store/restaurant-store'

import RestaurantHeader from './_components/restaurant-header'
import CartSummary from './_components/cart-summary'
import EmptyCart from './_components/empty-cart'
import AddMoreItems from './_components/add-more-items'
import { CartItem } from './_components/items'
import { useCartCalculations } from '@/hooks/use-cart-calc'

export default function CartPage() {
  const {
    ticket,
    removeFromTicket,
    incrementQuantity,
    decrementQuantity,
    setPendingFooter,
  } = useProductStore()
  const { restaurant, setRestaurant } = useRestaurantStore()
  const router = useRouter()

  const validItems = useMemo(
    () => ticket.filter((item) => item.quantity > 0),
    [ticket]
  )
  const {
    subtotal,
    meetsFreeDelivery,
    meetsMinimumOrder,
    deliveryFee,
    finalTotal,
    formattedFinalTotal,
    formattedDeliveryFee,
    formattedMinimumOrder,
  } = useCartCalculations(validItems, restaurant)

  const handleEdit = useCallback(
    (item: TicketItem) => {
      setPendingFooter({
        onConfirm: () => {
          removeFromTicket(item.uniqueId)
        },
      })
      const sessionData = { ...item, editingId: item.uniqueId }
      sessionStorage.setItem('editingItem', JSON.stringify(sessionData))

      router.push(
        `/restaurante/${restaurant?.slug}/${item.id}?edit=${item.uniqueId}`
      )
    },
    [restaurant?.slug, removeFromTicket, router, setPendingFooter]
  )

  useEffect(() => {
    if (!restaurant) {
      const storedRestaurant = localStorage.getItem('restaurant-data')
      if (storedRestaurant) {
        const parsed = JSON.parse(storedRestaurant)
        setRestaurant(parsed.state.restaurant)
      }
    }

    if (ticket.length === 0) {
      const storedTicket = localStorage.getItem('restaurant-ticket')
      if (storedTicket) {
        const parsed = JSON.parse(storedTicket)
        if (parsed.state.ticket && parsed.state.ticket.length > 0) {
          useProductStore.setState({ ticket: parsed.state.ticket })
        }
      }
    }
  }, [restaurant, setRestaurant, ticket])

  if (validItems.length === 0) return <EmptyCart />

  return (
    <main className="relative">
      <div className="mb-20 flex flex-col gap-6 lg:container lg:mx-auto">
        <RestaurantHeader restaurant={restaurant} />
        <div className="space-y-4">
          {validItems.map((item) => (
            <CartItem
              key={item.uniqueId}
              item={item}
              onEdit={handleEdit}
              onDecrement={decrementQuantity}
              onIncrement={incrementQuantity}
            />
          ))}
        </div>
        <AddMoreItems slug={restaurant?.slug} />
      </div>
      <CartSummary
        meetsFreeDelivery={meetsFreeDelivery}
        meetsMinimumOrder={meetsMinimumOrder}
        formattedFinalTotal={formattedFinalTotal}
        formattedDeliveryFee={formattedDeliveryFee}
        formattedMinimumOrder={formattedMinimumOrder}
      />
    </main>
  )
}
