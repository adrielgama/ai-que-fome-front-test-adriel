import Link from 'next/link'

import { Plus } from '@/components/icons/plus'

interface AddMoreItemsProps {
  slug?: string
}

export default function AddMoreItems({ slug }: AddMoreItemsProps) {
  return (
    <Link
      href={`/restaurant/${slug}`}
      className="flex items-center justify-center gap-2 pb-6"
      aria-label="Adicionar mais produtos"
    >
      <Plus className="size-5 text-teal-400" />
      <p className="text-sm font-semibold text-neutral-700">
        adicionar mais produtos
      </p>
    </Link>
  )
}
