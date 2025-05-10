import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/lib/formatter'
import { OptionItem } from '@/types/products'

interface OthersSectionProps {
  others: OptionItem[]
  selectedOthers: string[]
  setSelectedOthers: React.Dispatch<React.SetStateAction<string[]>>
}

export function OthersSection({
  others,
  selectedOthers,
  setSelectedOthers,
}: OthersSectionProps) {
  const maxSelections = 2
  const isMaxReached = selectedOthers.length >= maxSelections

  const handleCheckboxChange = (item: string, checked: boolean) => {
    if (checked) {
      if (!isMaxReached) {
        setSelectedOthers((prev) => [...prev, item])
      }
    } else {
      setSelectedOthers((prev) => prev.filter((i) => i !== item))
    }
  }

  return (
    <div className="space-y-4.5">
      {others.map((item) => {
        const isChecked = selectedOthers.includes(item.name)
        const isDisabled = !isChecked && isMaxReached

        return (
          <div
            key={item.name}
            className="flex items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2.5">
              <Checkbox
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(item.name, checked as boolean)
                }
                id={item.name}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-label={`Acompanhamento ${item.name}${isDisabled ? ' (limite de 2 seleções atingido)' : ''}`}
              />
              <Label htmlFor={item.name} className="text-sm text-neutral-500">
                {item.name}
              </Label>
            </div>
            <span className="text-sm font-bold text-purple-500">
              +{formatCurrency(item.price)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
