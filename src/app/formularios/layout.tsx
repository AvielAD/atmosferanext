import type { Metadata } from 'next'
import styles from './styles.module.scss'

export const metadata: Metadata = {
  title: 'Atmósfera | Formulario',
  description: 'Formulario de Registro',
}

export default function FormulariosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <div className="">
            <div className="">
                {children}
            </div>
        </div>
    </>
  )
}
