import Image from 'next/image'
import styles from './page.module.scss'
import TopNavBar from '../Components/TopNavBar'
import HomeInicio from '../Components/Home'
import CardsLanding from '../Components/CardsLanding'
import { menuoption } from '@/DTOS/menuNav/menunav'

const menusrutas: Array<menuoption> = [
  {
    nombreruta: "Inicio", 
    urlruta: ""
  },
  {
    nombreruta: "Nosotros", 
    urlruta: ""
  },
  {
    nombreruta: "Team", 
    urlruta: ""
  },
  {
    nombreruta: "Contacto", 
    urlruta: ""
  }
] 

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>

        <div className={styles.NavBarSection}>
          <TopNavBar rutas={menusrutas}/>
        </div>
  
        <div>
          <HomeInicio />
        </div>

        <div>
          <CardsLanding/>
        </div>
 
      </div>
    </main>
  )
}
