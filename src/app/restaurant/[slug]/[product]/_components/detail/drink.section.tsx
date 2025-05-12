import { Minus } from '@/components/icons/minus'
import { Plus } from '@/components/icons/plus'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/formatter'

interface DrinkSectionProps {
  name: string
  price: number
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export function DrinkSection({
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
}: DrinkSectionProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDecrease}
            aria-label="Remover produto"
          >
            <Minus className="size-6 text-neutral-400" />
          </Button>
          <p className="flex w-2 justify-center text-sm font-bold text-neutral-700">
            {quantity}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={onIncrease}
            aria-label="Adicionar produto"
          >
            <Plus className="size-6 text-teal-400" />
          </Button>
        </div>
        <p className="text-sm font-semibold text-neutral-500">{name}</p>
      </div>
      <p className="text-sm font-bold text-purple-500">
        +{formatCurrency(price)}
      </p>
    </div>
  )
}
