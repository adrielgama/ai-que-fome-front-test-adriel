'use client'
import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import { Dollar } from '@/components/icons/dollar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Category } from '@/types/products'

import ProductList from './product-list'

interface CategoriesListProps {
  categories: Category[]
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const slug = searchParams.get('categoria')
    if (slug) {
      const el = document.getElementById(`categoria-${slug}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [searchParams])

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {categories.map((category) => (
        <AccordionItem
          key={category.id}
          value={category.name}
          id={`categoria-${category.slug}`}
          className="rounded-none !border-b-4 border-neutral-100"
        >
          <AccordionTrigger className="hover:bg-neutral-50/50 hover:no-underline lg:cursor-pointer">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <h3 className="text-base font-bold text-neutral-900">
                  {category.name}
                </h3>
                {category.hasPromotion && <Dollar className="text-green-500" />}
              </div>
              <p className="text-xs font-semibold text-neutral-500">
                {category.description}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ProductList products={category.products} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
