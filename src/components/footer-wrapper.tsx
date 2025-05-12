'use client'

import { useProductStore } from '@/store/product-store'

import Footer from './footer'

export default function FooterWrapper() {
  const { pendingFooter } = useProductStore()

  return (
    <Footer showAction={!!pendingFooter} onAction={pendingFooter?.onConfirm} />
  )
}
