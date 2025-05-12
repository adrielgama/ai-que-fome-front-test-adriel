'use client'
import { useCallback, useEffect, useState } from 'react'

import { debounce } from 'lodash'
import dynamic from 'next/dynamic'

import SkeletonList from '@/components/restaurant/skeleton'
import { Skeleton } from '@/components/ui/skeleton'

const Banner = dynamic(() => import('@/components/banner'), {
  ssr: false,
  loading: () => (
    <Skeleton className="h-[8.125rem] w-full rounded-none bg-neutral-200" />
  ),
})
const RestaurantList = dynamic(
  () => import('@/components/restaurant/restaurant-list'),
  {
    ssr: false,
    loading: () => (
      <>
        <SkeletonList title="abertos" />
        <SkeletonList title="fechados" />
      </>
    ),
  }
)
const Search = dynamic(() => import('@/components/search'), { ssr: false })

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const updateDebouncedQuery = useCallback(
    debounce((value) => {
      setDebouncedQuery(value)
    }, 300),
    []
  )

  useEffect(() => {
    updateDebouncedQuery(searchQuery)
    return () => {
      updateDebouncedQuery.cancel()
    }
  }, [searchQuery, updateDebouncedQuery])

  return (
    <main className="lg:container lg:mx-auto">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Banner />
      <RestaurantList searchQuery={debouncedQuery} />
    </main>
  )
}
