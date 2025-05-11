import { ChevronRight, Heart, Share2 } from 'lucide-react'
import Image from 'next/image'

import CopyLinkButton from '@/components/copy-link-button'
import { Bike } from '@/components/icons/bike'
import { Star } from '@/components/icons/star'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatCurrency } from '@/lib/formatter'
import { Restaurant } from '@/types/restaurants'

interface RestaurantHeaderProps {
  restaurant: Restaurant
}

const ICON_SIZES = {
  share: 18,
  heart: 18,
  chevronSmall: 10,
  chevronMedium: 12,
  star: 16,
}

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  const {
    name,
    logo,
    deliveryFee,
    deliveryTime,
    distance,
    freeDeliveryThreshold,
    rating,
    closedAt,
    minimumOrder,
  } = restaurant

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <HeaderSection name={name} logo={logo} />
        <ActionSection />
      </div>
      <div className="space-y-1 text-sm font-bold text-neutral-500">
        <DeliveryInfo
          deliveryFee={deliveryFee}
          deliveryTime={deliveryTime}
          distance={distance}
          freeDeliveryThreshold={freeDeliveryThreshold}
        />
        <RatingAndHours rating={rating} closedAt={closedAt} />
        <MinimumOrder minimumOrder={minimumOrder} />
      </div>
    </div>
  )
}

function HeaderSection({ name, logo }: Pick<Restaurant, 'name' | 'logo'>) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logo}
        alt={name}
        width={36}
        height={36}
        className="rounded-xs object-cover ring-2 ring-neutral-100"
        aria-label="Logo do restaurante"
      />
      <h1 className="text-xl font-extrabold">{name}</h1>
    </div>
  )
}

function ActionSection() {
  return (
    <div className="flex items-center justify-between p-1">
      <div className="flex items-center gap-3 text-purple-500 transition-colors">
        <DropdownMenu>
          <DropdownMenuTrigger
            data-slot="dropdown-menu-trigger"
            aria-label="Compartilhar"
          >
            <Share2
              className="rotate-180 cursor-pointer hover:text-purple-500/80"
              size={ICON_SIZES.share}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <CopyLinkButton />
            <DropdownMenuItem variant="link">Whatsapp</DropdownMenuItem>
            <DropdownMenuItem variant="link">Instagram</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Heart
          className="cursor-pointer hover:text-purple-500/80"
          size={ICON_SIZES.heart}
        />
      </div>
      <div className="flex cursor-pointer items-center gap-1 text-xs font-bold text-teal-400 transition-colors hover:text-teal-600">
        <p>mais infos</p>
        <ChevronRight size={ICON_SIZES.chevronSmall} />
      </div>
    </div>
  )
}

function DeliveryInfo({
  deliveryFee,
  deliveryTime,
  distance,
  freeDeliveryThreshold,
}: Pick<
  Restaurant,
  'deliveryFee' | 'deliveryTime' | 'distance' | 'freeDeliveryThreshold'
>) {
  return (
    <div className="space-y-1 text-sm font-bold text-neutral-500">
      <div className="flex items-center gap-1.5 text-xs">
        <div className="flex items-center gap-1 text-sm text-purple-500">
          <Bike />
          <span>{formatCurrency(deliveryFee)}</span>
          <ChevronRight size={ICON_SIZES.chevronMedium} />
        </div>
        <span className="text-neutral-400">•</span>
        <p>hoje, {deliveryTime}</p>
        <span className="text-neutral-400">•</span>
        <p>{distance}km</p>
      </div>
      <p className="max-w-fit rounded-sm bg-teal-50 px-2 py-1.5 text-xs text-teal-600">
        {deliveryFee === 0
          ? 'grátis'
          : `entrega grátis acima de ${formatCurrency(freeDeliveryThreshold!)}`}
      </p>
    </div>
  )
}

function RatingAndHours({
  rating,
  closedAt,
}: Pick<Restaurant, 'rating' | 'closedAt'>) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500">
      <Star size={ICON_SIZES.star} className="text-yellow-400" />
      <p className="flex items-center gap-0.5">
        {rating} de 5 <ChevronRight size={ICON_SIZES.chevronMedium} />
      </p>
      <span className="text-neutral-400">•</span>
      <p className="text-green-500">fecha às {closedAt}</p>
    </div>
  )
}

function MinimumOrder({ minimumOrder }: Pick<Restaurant, 'minimumOrder'>) {
  return (
    <p className="text-xs font-bold text-neutral-500">
      pedido mínimo: {formatCurrency(minimumOrder)}
    </p>
  )
}
