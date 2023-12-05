import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Providers} from "./provider";
import TopNavBar from '../../Components/TopNavBar'
import { menunav, menuoption } from '@/DTOS/menuNav/menunav';

const inter = Inter({ subsets: ['latin'] })

const menusrutas: Array<menuoption> = [
  {
    nombreruta: "Inscritos", 
    urlruta: "/eventos/inscrito"
  },
  {
    nombreruta: "Cursos", 
    urlruta: "/eventos/curso"
  },
  {
    nombreruta: "Eventos", 
    urlruta: "/eventos/evento"
  },
  {
    nombreruta: "Links Forms", 
    urlruta: "/eventos/linkforms"
  },
] 

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
    <div>
        <TopNavBar rutas={menusrutas}/>
        <Providers>{children}</Providers> 
    </div>
  )
}
