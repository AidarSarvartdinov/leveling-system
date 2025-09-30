import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Solo Leveling Education System',
  description: 'Геймифицированная система обучения',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="antialiased font-orbitron bg-black">
        {children}
      </body>
    </html>
  )
}
