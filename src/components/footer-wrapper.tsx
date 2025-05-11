'use client'

import Footer from './footer'
import { useProductStore } from '@/store/product-store'

export default function FooterWrapper() {
  const { pendingFooter } = useProductStore()

  return (
    <Footer showAction={!!pendingFooter} onAction={pendingFooter?.onConfirm} />
  )
}
