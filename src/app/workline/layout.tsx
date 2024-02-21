import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Providers} from "./provider";
import TopNavBar from '../../Components/TopNavBar'
import { menunav, menuoption } from '@/DTOS/menuNav/menunav';

const inter = Inter({ subsets: ['latin'] })

const menusrutas: Array<menuoption> = [
  {
    nombreruta: "Inicio", 
    urlruta: "/workline/"
  },
  {
    nombreruta: "Tickets", 
    urlruta: "/workline/tickets"
  },
  {
    nombreruta: "Servicios", 
    urlruta: "/workline/tickets"
  }
] 

export const metadata: Metadata = {
  title: 'Atmósfera',
  description: 'Capacitación presencial',
}

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <TopNavBar rutas={menusrutas}/>
        <Providers>{children}</Providers> 
    </div>
  )
}
