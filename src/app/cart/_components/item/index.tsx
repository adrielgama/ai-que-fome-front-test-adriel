import { TicketItem } from '@/store/product-store'

import { CartItemActions } from './actions'
import { CartItemHeader } from './header'
import { CartItemNotes } from './notes'
import { CartItemOptions } from './options'

interface CartItemProps {
  item: TicketItem
  onEdit: (item: TicketItem) => void
  onDecrement: (uniqueId: string) => void
  onIncrement: (uniqueId: string) => void
}

export function CartItem({
  item,
  onEdit,
  onDecrement,
  onIncrement,
}: CartItemProps) {
  return (
    <div className="border-b-4 border-neutral-100 pb-4">
      <div className="px-4">
        <CartItemHeader item={item} />
        <CartItemActions
          item={item}
          onEdit={onEdit}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
        />
        <CartItemOptions item={item} />
        <CartItemNotes item={item} />
      </div>
    </div>
  )
}
