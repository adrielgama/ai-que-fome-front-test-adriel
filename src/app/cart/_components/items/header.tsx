import { formatCurrency } from '@/lib/formatter'
import { TicketItem } from '@/store/product-store'

interface CartItemHeaderProps {
  item: TicketItem
}

export function CartItemHeader({ item }: CartItemHeaderProps) {
  const basePrice =
    item.options?.sizes?.find((s) => s.label === item.selectedSize)?.discount ??
    item.options?.sizes?.find((s) => s.label === item.selectedSize)?.price ??
    item.discount ??
    item.price

  return (
    <div className="flex items-center justify-between text-sm font-bold">
      <p className="text-neutral-900">{item.name}</p>
      <p className="text-purple-500">{formatCurrency(basePrice)}</p>
    </div>
  )
}
