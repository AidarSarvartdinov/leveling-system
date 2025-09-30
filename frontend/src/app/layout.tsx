import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Leveling Education System',
  description: 'Education System with Gamification',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="antialiased font-orbitron">
        {children}
      </body>
    </html>
  )
}
