import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Providers} from "./provider";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Atmósfera',
  description: 'Generated by create next app',
}

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers> 
        </body>
    </html>
  )
}
