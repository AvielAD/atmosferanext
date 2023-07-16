'use client'
import Link from "next/link"
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from "react"

const index = () => {
    const [menu, setMenu] = useState(false);
    const wrapperRef = useRef(null) as any
    const logowrapRef= useRef(null) as any

    useEffect(()=>{
        const handleOutSideClick=(event:any)=>{
            if(menu && wrapperRef.current && logowrapRef.current &&
                !wrapperRef.current.contains(event.target) && !logowrapRef.current.contains(event.target)){
               setMenu(false)
               console.log('Click')
            }
        }
                
        document.addEventListener('click', handleOutSideClick)
        return ()=>{
            document.removeEventListener('click', handleOutSideClick)
        }
    })

    return (
        <>
            <div className={styles.containerNavBar}>
                <div className={styles.containerContentNavBar}>
                    <div>
                        <Link href=''>A</Link>
                    </div>

                    <div className={styles.menuTop}>
                        <i ref={logowrapRef} className="bi bi-list" onClick={() => setMenu(!menu)}></i>
                    </div>

                    <div ref={wrapperRef}
                    className={`${styles.menuTopMobile} 
                    ${menu ? styles.menuView : styles.menuHidden}`}>
                        <ul className={styles.listMenu}>
                            <Link href=''>Inicio</Link>
                            <Link href=''>Nosotros</Link>
                            <Link href=''>Team</Link>
                            <Link href=''>Contacto</Link>
                        </ul>

                    </div>

                    <ul>
                        <Link href=''>Inicio</Link>
                        <Link href=''>Nosotros</Link>
                        <Link href=''>Team</Link>
                        <Link href=''>Contacto</Link>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default index