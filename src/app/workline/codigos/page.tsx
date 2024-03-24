'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ticketdto } from '@/DTOS/workline/tickets/ticket.dto'
import AddCodigo from '@/Components/Formularios/AddCodigo/page'
import ModalGeneral from '@/Components/ModalGeneral/page'
import { codigodescuento } from '@/DTOS/codigo/codigo.dto'
import { codigosdescuentodto } from '@/DTOS/workline/codigos/codigos.dto'
import { DateTime } from 'luxon'
import QrPrint from '@/Components/TicketsPrint/QrTicketPrint/page'
import { useReactToPrint } from 'react-to-print'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Tickets = () => {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  //const componentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<(HTMLDivElement | null)[]>([]);

  const handlePrint= useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,  })
  const { data, error } = useSWR('/api/workline/codigos', fetcher)

  if (!data) return <>loading...</>

  return (<>
    <h1 className='text-center'>Codigos Descuento</h1>
   
    <ModalGeneral show={modal} close={() => setModal(false)} >
      <AddCodigo close={setModal}></AddCodigo>
    </ModalGeneral>


    <div style={{ height: "80vh" }} className='container overflow-scroll'>

      <div className='row'>

        <table className="table w-100">
          <thead >
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Vencimiento</th>
              <th scope="col">Categoria</th>
              <th scope="col">Descuento</th>
              <th scope="col">QR</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item: codigosdescuentodto, index: number) => {
                return (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{DateTime.fromISO(item.fechavigencia.toString()).toLocaleString(DateTime.DATE_MED)}</td>
                    <td>{item.idcatcodigo}</td>
                    <td>{item.descuento} %</td>
                    <td className='d-none'>
                        <QrPrint subject='Codigo de Descuento' ref={(el)=>{componentRef.current[index]=el}} uuidqr={item.uuidkey}></QrPrint>
                    </td>
                    <td>
                      <button className='btn btn-primary'
                       onClick={()=>{handlePrint(null, () => componentRef.current[index])}}
                      >
                      <i className="bi bi-qr-code"></i>

                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>

    </div>
    <div className='container fixed-bottom'>
      <button className='btn btn-primary' onClick={() => setModal(!modal)}>
        <i style={{ fontSize: "4rem" }} className='bi bi-plus-circle h1'
        ></i>

      </button>
    </div>

  </>)
}



export default Tickets