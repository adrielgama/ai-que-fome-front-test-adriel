import { Badge } from '@/components/ui/badge'
import { TicketItem } from '@/store/product-store'

interface CartItemNotesProps {
  item: TicketItem
}

export function CartItemNotes({ item }: CartItemNotesProps) {
  if (!item.notes) return null

  return (
    <Badge className="mt-1.5 h-7 w-full justify-start rounded-xs bg-neutral-50 px-2 py-1.5 text-xs text-neutral-700">
      <p className="font-bold">observação:</p>{' '}
      <p className="font-semibold">{item.notes}</p>
    </Badge>
  )
}
