import Image from 'next/image'
import Link from 'next/link'

interface RestaurantHeaderProps {
  restaurant: { slug?: string; logo?: string; name?: string } | null
}

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  if (!restaurant) return null

  return (
    <Link
      href={`/restaurante/${restaurant.slug}`}
      className="flex items-center gap-2 p-4"
      aria-label="Restaurante selecionado"
    >
      <Image
        src={restaurant.logo ?? ''}
        alt={restaurant.name ?? ''}
        width={32}
        height={32}
        className="rounded border border-neutral-100 object-cover"
      />
      <div className="flex flex-col gap-0.5 font-bold">
        <h3 className="text-sm text-neutral-500">seus itens em</h3>
        <h1 className="text-base text-neutral-900">{restaurant.name}</h1>
      </div>
    </Link>
  )
}
