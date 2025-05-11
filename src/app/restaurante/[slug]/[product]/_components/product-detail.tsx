'use client'

import { Textarea } from '@/components/ui/textarea'
import { useProductOptions } from '@/hooks/use-product-options'
import { Product } from '@/types/products'

import {
  AccompanimentsSection,
  DrinkSection,
  OthersSection,
  SizesSection,
  UtensilsSection,
} from './detail'
import DetailHeader from './detail-header'
import DetailSection from './detail-section'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TicketItem, useProductStore } from '@/store/product-store'
import { useSearchParams } from 'next/navigation'

interface ProductDetailClientProps {
  product: Product
  restaurantSlug: string
}

export default function ProductDetail({ product }: ProductDetailClientProps) {
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const { setPendingFooter } = useProductStore()
  const [isEditLoaded, setIsEditLoaded] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const {
    quantity,
    setQuantity,
    total,
    selectedSize,
    selectedDrinks,
    setSelectedDrinks,
    selectedAccompaniments,
    selectedOthers,
    selectedUtensils,
    incrementDrink,
    decrementDrink,
    notes,
    setSelectedSize,
    setSelectedAccompaniments,
    setSelectedOthers,
    setSelectedUtensils,
    setNotes,
    increaseQuantity,
    decreaseQuantity,
    hasRequiredOptions,
    confirmAndGoToCart,
  } = useProductOptions(product)

  const handleConfirm = useCallback(() => {
    if (isAdding) return
    setIsAdding(true)
    confirmAndGoToCart()
    setTimeout(() => setIsAdding(false), 1000)
  }, [isAdding, confirmAndGoToCart])

  const pendingFooter = useMemo(
    () => (hasRequiredOptions ? { onConfirm: handleConfirm } : null),
    [hasRequiredOptions, handleConfirm]
  )

  useEffect(() => {
    if (editId && !isEditLoaded) {
      const editingItem = sessionStorage.getItem('editingItem')
      if (editingItem) {
        const item: TicketItem = JSON.parse(editingItem)
        setQuantity(item.quantity)
        setSelectedSize(item.selectedSize || '')
        setSelectedAccompaniments(item.selectedAccompaniments || [])
        setSelectedOthers(item.selectedOthers || [])
        setSelectedUtensils(item.selectedUtensils || '')
        setNotes(item.notes || '')
        setSelectedDrinks(item.selectedDrinks || {})
        setIsEditLoaded(true)
      }
    }
  }, [
    editId,
    isEditLoaded,
    setQuantity,
    setSelectedSize,
    setSelectedAccompaniments,
    setSelectedOthers,
    setSelectedUtensils,
    setNotes,
    setSelectedDrinks,
  ])

  useEffect(() => {
    setPendingFooter(pendingFooter)
    return () => setPendingFooter(null)
  }, [pendingFooter, setPendingFooter])

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNotes(e.target.value)
    },
    [setNotes]
  )

  return (
    <main>
      <DetailHeader
        product={product}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        total={total}
        quantity={quantity}
      />
      {/* Tamanho */}
      {product.options?.sizes && (
        <DetailSection title="qual o tamanho?" description="escolha 1" required>
          <SizesSection
            sizes={product.options?.sizes ?? []}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </DetailSection>
      )}

      {/* Acompanhamentos */}
      {product.options?.accompaniments && (
        <DetailSection
          title="acompanhamentos"
          description="escolha de 1 a 2"
          required
        >
          <AccompanimentsSection
            accompaniments={product.options?.accompaniments ?? []}
            selected={selectedAccompaniments}
            setSelected={setSelectedAccompaniments}
          />
        </DetailSection>
      )}

      {/* Bebidas */}
      {product.options?.drinks && (
        <DetailSection
          title="vai querer bebida?"
          description="escolha quantos quiser"
        >
          <div className="space-y-3">
            {product.options?.drinks?.map((drink) => (
              <DrinkSection
                key={drink.name}
                name={drink.name}
                price={drink.price}
                quantity={selectedDrinks[drink.name] || 0}
                onIncrease={() => incrementDrink(drink.name)}
                onDecrease={() => decrementDrink(drink.name)}
              />
            ))}
          </div>
        </DetailSection>
      )}

      {/* Utensilios */}
      {product.options?.utensils && (
        <DetailSection title="precisa de talher?" description="escolha até 1">
          <UtensilsSection
            utensils={product.options?.utensils ?? []}
            selectedUtensils={selectedUtensils}
            setSelectedUtensils={setSelectedUtensils}
          />
        </DetailSection>
      )}

      {/* Outros */}
      {product.options?.others && (
        <DetailSection title="mais alguma coisa?" description="escolha até 2">
          <OthersSection
            others={product.options?.others ?? []}
            selectedOthers={selectedOthers}
            setSelectedOthers={setSelectedOthers}
          />
        </DetailSection>
      )}

      <div className="mt-4 mb-16 px-4">
        <Textarea
          placeholder="alguma observação do item? • opcional
ex: tirar algum ingrediente, ponto do prato"
          className="resize-none rounded-sm border-neutral-200 px-3 py-2.5 shadow-none placeholder:text-sm placeholder:font-semibold placeholder:text-neutral-500"
          value={notes}
          onChange={handleNotesChange}
        />
      </div>
    </main>
  )
}
