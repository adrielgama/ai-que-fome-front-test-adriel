import React from 'react'

import { SearchIcon } from 'lucide-react'

import { Input } from './ui/input'

export default function Search() {
  return (
    <div className="bg-purple-500 pb-4">
      <div className="relative px-4">
        <SearchIcon className="absolute top-1/2 left-6 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          placeholder="busque pela loja ou culinária"
          className="h-10 rounded-md bg-white pl-8 text-sm font-semibold text-neutral-700 shadow-none outline outline-neutral-200 placeholder:text-neutral-500/70"
        />
      </div>
    </div>
  )
}
