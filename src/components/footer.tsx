'use client'

import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

interface FooterProps {
  showAction?: boolean
  onAction?: () => void
}

export default function Footer({ showAction = false, onAction }: FooterProps) {
  const pathname = usePathname()
  const isOnCartPage = pathname === '/cart'

  if (isOnCartPage) return null
  return (
    <footer className="space-y-4 bg-neutral-100 px-4 py-6">
      {showAction && !isOnCartPage ? (
        <div className="md:flex md:flex-col md:items-center md:gap-3 lg:container lg:mx-auto">
          <p className="text-center text-sm font-bold text-purple-700">
            feito com 💜 em maringá-PR
          </p>
          <Button
            className="w-full md:max-w-xs"
            size="xl"
            variant="aiquefome"
            onClick={onAction}
          >
            ver ticket
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-center text-sm font-bold text-purple-700">
            feito com 💜 em maringá-PR
          </p>
          <p className="text-center font-bold text-purple-700">
            aiqfome.com © 2007-2023 aiqfome LTDA . <br />
            CNPJ: 09.186.786/0001-58
          </p>
        </div>
      )}
    </footer>
  )
}
