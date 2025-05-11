import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TicketItem } from '@/store/product-store'
import { Minus } from '@/components/icons/minus'
import { Plus } from '@/components/icons/plus'

interface CartItemActionsProps {
  item: TicketItem
  onEdit: (item: TicketItem) => void
  onDecrement: (uniqueId: string) => void
  onIncrement: (uniqueId: string) => void
}

export function CartItemActions({
  item,
  onEdit,
  onDecrement,
  onIncrement,
}: CartItemActionsProps) {
  return (
    <div className="flex items-center justify-end gap-6">
      <Button
        variant="ghost"
        onClick={() => onEdit(item)}
        className="text-sm font-bold text-teal-400"
      >
        <Pencil className="size-2.5" />
        editar
      </Button>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="px-0 has-[>svg]:mx-3 has-[>svg]:px-0"
          onClick={() => onDecrement(item.uniqueId)}
        >
          {item.quantity <= 1 ? (
            <Minus
              className="size-5 rounded-full border border-teal-400 text-teal-400"
              transparentBg
            />
          ) : (
            <Trash2 className="text-teal-400" />
          )}
        </Button>
        <p className="flex w-2 justify-center text-sm font-bold text-neutral-700">
          {item.quantity}
        </p>
        <Button
          variant="ghost"
          className="px-0 has-[>svg]:ml-3 has-[>svg]:px-0"
          onClick={() => onIncrement(item.uniqueId)}
        >
          <Plus className="size-5 text-teal-400" />
        </Button>
      </div>
    </div>
  )
}
