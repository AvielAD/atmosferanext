import styles from './styles.module.scss'
import React from 'react'
import QRCode from 'react-qr-code'
import { ticketqr } from '@/DTOS/TicketsPrint/ticketsprint.dto'
const Page = React.forwardRef<HTMLDivElement, ticketqr>((props, ref) => {
  return (
    <div key={props.uuidqr} ref={ref} className={styles.container}>
      <div className={styles.containerContent}>
        <div>
          <h1 className={styles.mainTitle}>WorkLine</h1>
          <h2>{props.subject}</h2>
          <p>Cowork</p>
          <p>Chapulco 26, la Paz</p>
        </div>

        <div>
          <h5><i className="bi bi-browser-safari"></i> www.workline.mx</h5>
          <h4><i className="bi bi-whatsapp"></i> ##########</h4>
        </div>

        <div className={styles.containerImage}>
            <QRCode value={props.uuidqr}></QRCode>
        </div>
      </div>
    </div>
  )
})
Page.displayName='Promocional WorkLine'

export default Page