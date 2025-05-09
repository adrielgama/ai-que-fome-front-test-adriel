'use client'

import { ProgressProvider } from '@bprogress/next/app'

export function ProgressProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProgressProvider
      height="4px"
      color="#ab33df"
      options={{
        showSpinner: false,
      }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  )
}
