import Image from 'next/image'
import styles from './page.module.scss'
import TopNavBar from '../Components/TopNavBar'
import HomeInicio from '../Components/Home'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>

        <div className={styles.NavBarSection}>
          <TopNavBar />
        </div>
  
        <div>
          <HomeInicio />
        </div>
 
      </div>
    </main>
  )
}
