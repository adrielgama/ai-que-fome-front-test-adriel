import { formatCurrency } from '@/lib/formatter'
import { TicketItem } from '@/store/product-store'

interface CartItemOptionsProps {
  item: TicketItem
}

export function CartItemOptions({ item }: CartItemOptionsProps) {
  return (
    <div className="mt-2 space-y-1 text-xs font-bold text-neutral-500">
      {item.selectedSize && (
        <p>
          • tamanho <br />{' '}
          <span className="ml-2.5 font-semibold">
            {item.selectedSize.toLowerCase()}
          </span>
        </p>
      )}
      {!!item.selectedAccompaniments?.length && (
        <p>
          • acompanhamentos <br />{' '}
          <span className="ml-2.5 flex flex-col font-semibold">
            {item.selectedAccompaniments.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </span>
        </p>
      )}
      {Object.keys(item.selectedDrinks || {}).length > 0 && (
        <p>
          • vai querer bebida? <br />{' '}
          <span className="ml-2.5 flex flex-col font-semibold">
            {Object.entries(item.selectedDrinks || {}).map(([name, qty]) => {
              const unitPrice =
                item.options?.drinks?.find((d) => d.name === name)?.price ?? 0
              const total = qty * unitPrice

              return (
                <span key={name} className="inline-flex items-center gap-3">
                  <span className="text-xs">{name}</span>
                  <span className="font-bold text-teal-400">
                    +{formatCurrency(total)}
                  </span>
                </span>
              )
            })}
          </span>
        </p>
      )}
      {!!item.selectedUtensils && (
        <p>
          • talheres <br />
          <span className="ml-2.5 font-semibold">
            {item.selectedUtensils}
            {(() => {
              const utensil = item.options?.utensils?.find(
                (u) => u.name === item.selectedUtensils
              )
              if (utensil?.price) {
                return (
                  <span className="ml-2.5 font-bold text-teal-400">
                    +{formatCurrency(utensil.price)}
                  </span>
                )
              }
              return null
            })()}
          </span>
        </p>
      )}
      {!!item.selectedOthers?.length && (
        <p>
          • mais alguma coisa? <br />
          <span className="ml-2.5 flex flex-col font-semibold">
            {item.selectedOthers.map((name) => {
              const price =
                item.options?.others?.find((o) => o.name === name)?.price ?? 0
              return (
                <span key={name}>
                  {name}{' '}
                  <span className="ml-2.5 font-bold text-teal-400">
                    +{formatCurrency(price)}
                  </span>
                </span>
              )
            })}
          </span>
        </p>
      )}
    </div>
  )
}
