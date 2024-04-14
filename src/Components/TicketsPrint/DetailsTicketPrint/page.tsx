import styles from './styles.module.scss'
import imgWhatsapp from './assets/WB.jpeg'
import Image from 'next/image'
import React from 'react'
import { ticketdetails } from '@/DTOS/TicketsPrint/ticketsprint.dto'

const Page = React.forwardRef<HTMLDivElement, ticketdetails>((props, ref) => {


  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.containerContent}>
        <div>
          <h1 className={styles.mainTitle}>WorkLine</h1>
          <p>Chapulco 26, La paz</p>
          <p> Hora Inicio: {props.horainicio}</p>
          <p> Hora Final: {props.horafin}</p>
        </div>

        <div className={styles.formularioCliente}>
          <p>Datos Cliente</p>
          <p>Nombre: {props.cliente}</p>
        </div>
        {
          props.servicios?.length > 0 ?  
          <div>
              {props.servicios.map((item, index)=>{
                return (<p key={index}>{item.nombre} ${item.costo}</p>)
              })}
          </div> : null
        }

        <div className={styles.formularioCliente}>
          <p>Total</p>
          <p>${props.total} mxn</p>
        </div>

        <div>
          <h5><i className="bi bi-browser-safari"></i> www.workline.mx</h5>
          <h4><i className="bi bi-whatsapp"></i> ##########</h4>
        </div>

       
      </div>
    </div>
  )
})
Page.displayName='NotaWorkLine'

export default Page