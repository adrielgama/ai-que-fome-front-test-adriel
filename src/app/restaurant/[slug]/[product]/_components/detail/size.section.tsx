import { Dollar } from '@/components/icons/dollar'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { formatCurrency } from '@/lib/formatter'
import { Sizes } from '@/types/products'

interface ProductSizesProps {
  sizes: Sizes
  selectedSize: string
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>
}

export function SizesSection({
  sizes,
  selectedSize,
  setSelectedSize,
}: ProductSizesProps) {
  return (
    <RadioGroup
      className="w-full space-y-4"
      value={selectedSize}
      onValueChange={setSelectedSize}
    >
      {sizes?.map((size, index) => {
        const hasDiscount = !!size.discount

        return (
          <div
            key={size.label}
            className="flex w-full items-center justify-between space-x-2 px-2"
          >
            <div className="flex items-center gap-2.5">
              <RadioGroupItem value={size.label} id={`r-size${index}`} />
              <Label
                htmlFor={`r-size${index}`}
                className="flex items-center gap-2.5 text-sm text-neutral-500"
              >
                {hasDiscount && <Dollar size={18} className="text-green-500" />}
                {size.label.toLocaleLowerCase()}
              </Label>
            </div>
            <div className="flex items-center text-sm font-bold text-neutral-500">
              {hasDiscount ? (
                <>
                  <p className="mr-1 text-xs text-neutral-500">
                    de {formatCurrency(size.price)} por
                  </p>
                  <span className="text-green-500">
                    {formatCurrency(size.discount!)}
                  </span>
                </>
              ) : (
                <p className="text-sm text-purple-500">
                  {formatCurrency(size.price)}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </RadioGroup>
  )
}
