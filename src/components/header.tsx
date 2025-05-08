import { ChevronRight, MapPin } from 'lucide-react'
import { AiqBranding } from './icons/aiqbranding'
import { User as UserIcon } from './icons/user'

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between gap-6 bg-purple-500 px-4 text-white">
      <div className="flex items-center gap-6 md:gap-12">
        <AiqBranding />
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
    </header>
  )
}
