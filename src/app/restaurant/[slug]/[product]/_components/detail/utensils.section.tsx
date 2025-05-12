import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { formatCurrency } from '@/lib/formatter'
import { OptionItem } from '@/types/products'

interface ProductUtensilsProps {
  utensils: OptionItem[]
  selectedUtensils: string
  setSelectedUtensils: React.Dispatch<React.SetStateAction<string>>
}

export function UtensilsSection({
  utensils,
  selectedUtensils,
  setSelectedUtensils,
}: ProductUtensilsProps) {
  return (
    <RadioGroup
      className="w-full space-y-4"
      value={selectedUtensils}
      onValueChange={setSelectedUtensils}
    >
      {utensils?.map((utensils, index) => (
        <div
          key={utensils.name}
          className="flex w-full items-center justify-between space-x-2 px-2"
        >
          <div className="flex items-center gap-2.5">
            <RadioGroupItem value={utensils.name} id={`r-utensils${index}`} />
            <Label
              htmlFor={`r-utensils${index}`}
              className="flex items-center gap-2.5 text-sm text-neutral-500"
            >
              {utensils.name.toLocaleLowerCase()}
            </Label>
          </div>
          {utensils.price !== 0 && (
            <p className="text-sm font-bold text-purple-500">
              +{formatCurrency(utensils.price)}
            </p>
          )}
        </div>
      ))}
    </RadioGroup>
  )
}
