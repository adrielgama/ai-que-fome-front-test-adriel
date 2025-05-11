import { Button } from '@/components/ui/button'

interface CartSummaryProps {
  meetsFreeDelivery: boolean
  meetsMinimumOrder: boolean
  formattedFinalTotal: string
  formattedDeliveryFee: string
  formattedMinimumOrder: string
}

export default function CartSummary({
  meetsFreeDelivery,
  meetsMinimumOrder,
  formattedFinalTotal,
  formattedDeliveryFee,
  formattedMinimumOrder,
}: CartSummaryProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 flex justify-between rounded-t-xl bg-white p-4 shadow-[0px_0px_15px_0px_#00000026]">
      <div className="container mx-auto flex w-full items-center justify-between gap-2">
        <div className="flex flex-col items-start">
          <p className="text-sm font-bold text-neutral-900">subtotal</p>
          <p className="text-xl font-extrabold text-purple-500">
            {formattedFinalTotal}
          </p>
          {!meetsFreeDelivery && (
            <p className="font-semi1bold text-xs text-neutral-500">
              inclui frete de {formattedDeliveryFee}
            </p>
          )}
        </div>

        <Button size="xl" variant="aiquefome" disabled={!meetsMinimumOrder}>
          {meetsMinimumOrder
            ? 'ir para pagamento'
            : `mínimo de ${formattedMinimumOrder}`}
        </Button>
      </div>
    </div>
  )
}
