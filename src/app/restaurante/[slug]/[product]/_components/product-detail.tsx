'use client'

import { useEffect, useState } from 'react'
import { useProductStore } from '@/store/product-store'
import { Product } from '@/types/products'
import { useRouter } from 'next/navigation'
import DetailHeader from './detail-header'
import DetailSection from './detail-section'
import {
  AccompanimentsSection,
  DrinkSection,
  OthersSection,
  SizesSection,
  UtensilsSection,
} from './detail'
import { Textarea } from '@/components/ui/textarea'

interface ProductDetailClientProps {
  productId: string
}

export default function ProductDetail({ productId }: ProductDetailClientProps) {
  const { products } = useProductStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedAccompaniments, setSelectedAccompaniments] = useState<
    string[]
  >([])
  const [selectedOthers, setSelectedOthers] = useState<string[]>([])
  const [selectedDrinks, setSelectedDrinks] = useState<Record<string, number>>(
    {}
  )
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedUtensils, setSelectedUtensils] = useState<string>('')
  const router = useRouter()

  const incrementDrink = (name: string) => {
    setSelectedDrinks((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }))
  }

  const decrementDrink = (name: string) => {
    setSelectedDrinks((prev) => {
      const current = prev[name] || 0
      if (current <= 0) return prev

      const updated = { ...prev, [name]: current - 1 }
      if (updated[name] === 0) delete updated[name]
      return updated
    })
  }

  useEffect(() => {
    const found = products.find((p) => p.id === Number(productId))
    if (!found) {
      router.push('/404')
    } else {
      setProduct(found)
      setSelectedSize(found.options?.sizes?.[0]?.label || '')
      setSelectedAccompaniments([])
    }
  }, [productId, products, router])

  if (!products.length) {
    return (
      <p className="p-4 text-center text-sm text-neutral-500">
        Carregando produto...
      </p>
    )
  }

  if (!product) return null

  return (
    <main>
      <DetailHeader product={product} />
      {/* Tamanho */}
      <DetailSection title="qual o tamanho?" description="escolha 1" required>
        <SizesSection
          sizes={product.options?.sizes ?? []}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </DetailSection>

      {/* Acompanhamentos */}
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

      {/* Bebidas */}
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

      {/* Utensilios */}
      <DetailSection title="precisa de talher?" description="escolha até 1">
        <UtensilsSection
          utensils={product.options?.utensils ?? []}
          selectedUtensils={selectedUtensils}
          setSelectedUtensils={setSelectedUtensils}
        />
      </DetailSection>

      {/* Outros */}
      <DetailSection title="mais alguma coisa?" description="escolha até 2">
        <OthersSection
          others={product.options?.others ?? []}
          selectedOthers={selectedOthers}
          setSelectedOthers={setSelectedOthers}
        />
      </DetailSection>

      <div className="mb-16 px-4">
        <Textarea
          placeholder="alguma observação do item? • opcional
ex: tirar algum ingrediente, ponto do prato"
          className="resize-none rounded-sm border-neutral-200 px-3 py-2.5 shadow-none placeholder:text-sm placeholder:font-semibold placeholder:text-neutral-500"
        />
      </div>
    </main>
  )
}
