'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { Product } from '@/types/products'
import { useRouter, useSearchParams } from 'next/navigation'
import { useProductStore } from '@/store/product-store'

export function useProductOptions(product: Product) {
  const [quantity, setQuantity] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedAccompaniments, setSelectedAccompaniments] = useState<
    string[]
  >([])
  const [selectedOthers, setSelectedOthers] = useState<string[]>([])
  const [selectedUtensils, setSelectedUtensils] = useState<string>('')
  const [selectedDrinks, setSelectedDrinks] = useState<Record<string, number>>(
    {}
  )
  const [notes, setNotes] = useState('')
  const [isEditLoaded, setIsEditLoaded] = useState(false)

  const { addToTicket, setPendingFooter, removeFromTicket } = useProductStore()
  const router = useRouter()
  const searchParams = useSearchParams()

  const editingId = searchParams?.get('edit')

  useEffect(() => {
    if (!isEditLoaded && editingId) {
      const stored = sessionStorage.getItem('editingItem')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed.editingId === editingId && parsed.id === product.id) {
            setQuantity(parsed.quantity ?? 1)
            setSelectedSize(parsed.selectedSize || '')
            setSelectedAccompaniments(parsed.selectedAccompaniments || [])
            setSelectedOthers(parsed.selectedOthers || [])
            setSelectedUtensils(parsed.selectedUtensils || '')
            setSelectedDrinks(parsed.selectedDrinks || {})
            setNotes(parsed.notes || '')
            setIsEditLoaded(true)
          }
        } catch (e) {
          console.error('Erro ao restaurar item do sessionStorage:', e)
        }
      }
    }
  }, [editingId, product, isEditLoaded])

  const incrementDrink = (name: string) => {
    setSelectedDrinks((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }))
  }

  const decrementDrink = (name: string) => {
    setSelectedDrinks((prev) => {
      const current = prev[name] || 0
      if (current <= 1) {
        const { [name]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [name]: current - 1 }
    })
  }

  const increaseQuantity = () => setQuantity((q) => q + 1)
  const decreaseQuantity = () => setQuantity((q) => Math.max(0, q - 1))

  const hasRequiredOptions = useMemo(() => {
    const sizeOk = !product.options?.sizes || !!selectedSize
    const accOk =
      !product.options?.accompaniments || selectedAccompaniments.length >= 1
    return sizeOk && accOk && quantity > 0
  }, [product, selectedSize, selectedAccompaniments, quantity])

  const sizePrice = useMemo(() => {
    return (
      product.options?.sizes?.find((s) => s.label === selectedSize)?.discount ??
      product.options?.sizes?.find((s) => s.label === selectedSize)?.price ??
      product.discount ??
      product.price
    )
  }, [product, selectedSize])

  const drinksTotal = useMemo(() => {
    return Object.entries(selectedDrinks).reduce((sum, [name, count]) => {
      const drink = product.options?.drinks?.find((d) => d.name === name)
      return sum + (drink?.price || 0) * count
    }, 0)
  }, [selectedDrinks, product])

  const othersTotal = useMemo(() => {
    return selectedOthers.reduce((sum, name) => {
      const item = product.options?.others?.find((o) => o.name === name)
      return sum + (item?.price || 0)
    }, 0)
  }, [selectedOthers, product])

  const total = useMemo(() => {
    return quantity * (sizePrice + drinksTotal + othersTotal)
  }, [sizePrice, drinksTotal, othersTotal, quantity])

  const getTicketItem = useCallback(
    () => ({
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      quantity,
      selectedSize,
      selectedAccompaniments,
      selectedOthers,
      selectedUtensils,
      selectedDrinks,
      notes,
      categoryId: product.categoryId ?? 0,
      editingId: editingId || undefined,
    }),
    [
      product,
      quantity,
      selectedSize,
      selectedAccompaniments,
      selectedOthers,
      selectedUtensils,
      selectedDrinks,
      notes,
    ]
  )

  const confirmAndGoToCart = useCallback(() => {
    if (!hasRequiredOptions) return
    const item = getTicketItem()

    if (item.editingId) {
      removeFromTicket(item.editingId)
      sessionStorage.removeItem('editingItem')
    }

    addToTicket({ ...item, options: product.options })
    router.push('/cart')
  }, [hasRequiredOptions, getTicketItem, removeFromTicket, addToTicket, router])

  useEffect(() => {
    setSelectedSize(product.options?.sizes?.[0]?.label || '')
  }, [product])

  useEffect(() => {
    if (hasRequiredOptions) {
      setPendingFooter({ onConfirm: confirmAndGoToCart })
    } else {
      setPendingFooter(null)
    }

    return () => setPendingFooter(null)
  }, [hasRequiredOptions, confirmAndGoToCart])

  return {
    quantity,
    setQuantity,
    total,
    selectedSize,
    selectedAccompaniments,
    selectedOthers,
    selectedUtensils,
    selectedDrinks,
    setSelectedDrinks,
    notes,
    setSelectedSize,
    setSelectedAccompaniments,
    setSelectedOthers,
    setSelectedUtensils,
    setNotes,
    incrementDrink,
    decrementDrink,
    increaseQuantity,
    decreaseQuantity,
    hasRequiredOptions,
    getTicketItem,
    confirmAndGoToCart,
  }
}
