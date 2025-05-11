import { ChevronRight, MapPin } from 'lucide-react'
import Link from 'next/link'

import { AiqBranding } from './icons/aiqbranding'
import { User as UserIcon } from './icons/user'

export default function Header() {
  return (
    <header className="h-20 bg-purple-500 px-4 pt-4 text-white">
      <div className="flex items-center justify-between gap-6 lg:container lg:mx-auto">
        <div className="flex items-center gap-6 md:gap-12">
          <Link href="/" aria-label="Ir para página inicial">
            <AiqBranding />
          </Link>
          <div className="flex items-center gap-2.5">
            <MapPin />
            <div className="flex flex-col gap-0.5 font-bold">
              <p className="text-sm text-purple-200">entregando em</p>
              <div className="flex items-center gap-1">
                <h1>Rua Mandaguari, 198</h1>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
        <UserIcon />
      </div>
    </header>
  )
}
