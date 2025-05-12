import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface AccompanimentsSectionProps {
  accompaniments: string[]
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

export function AccompanimentsSection({
  accompaniments,
  selected,
  setSelected,
}: AccompanimentsSectionProps) {
  const maxSelections = 2
  const isMaxReached = selected.length >= maxSelections

  const handleCheckboxChange = (item: string, checked: boolean) => {
    if (checked) {
      if (!isMaxReached) {
        setSelected((prev) => [...prev, item])
      }
    } else {
      setSelected((prev) => prev.filter((i) => i !== item))
    }
  }

  return (
    <div className="space-y-4.5">
      {accompaniments.map((item) => {
        const isChecked = selected.includes(item)
        const isDisabled = !isChecked && isMaxReached

        return (
          <div key={item} className="flex items-center gap-2.5">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) =>
                handleCheckboxChange(item, checked as boolean)
              }
              id={item}
              disabled={isDisabled}
              aria-disabled={isDisabled}
              aria-label={`Acompanhamento ${item}${isDisabled ? ' (limite de 2 seleções atingido)' : ''}`}
            />
            <Label htmlFor={item} className="text-sm text-neutral-500">
              {item}
            </Label>
          </div>
        )
      })}
    </div>
  )
}
