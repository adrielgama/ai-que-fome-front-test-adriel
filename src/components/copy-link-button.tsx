'use client'

import { DropdownMenuItem } from './ui/dropdown-menu'

export default function CopyLinkButton() {
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <DropdownMenuItem variant="link" onClick={handleCopy}>
      Copiar link
    </DropdownMenuItem>
  )
}
