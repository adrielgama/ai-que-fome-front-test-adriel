import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const inter = Nunito({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'O aiqfome é o melhor app de delivery da sua cidade e região',
  description:
    'Peça seu delivery pelo aiqfome ou torne-se um lojista ou licenciado parceiro para fazer parte do 2º maior app de delivery do Brasil e líder do interior',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
