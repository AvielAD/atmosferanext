import type { Metadata } from 'next'
import styles from './styles.module.scss'

export const metadata: Metadata = {
  title: 'Atmósfera | .net core',
  description: 'Formulario de Registro',
}

export default function FormulariosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <div className={styles.containerFormulario}>
            <div className={styles.containerContentFormulario}>
                {children}
            </div>
        </div>
    </>
  )
}
