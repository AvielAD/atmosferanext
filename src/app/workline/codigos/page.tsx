'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import {  useRef, useState } from 'react'
import AddCodigo from '@/Components/Formularios/AddCodigo/page'
import ModalGeneral from '@/Components/ModalGeneral/page'
import { codigosdescuentodto } from '@/DTOS/workline/codigos/codigos.dto'
import { DateTime } from 'luxon'
import QrPrint from '@/Components/TicketsPrint/QrTicketPrint/page'
import ReactToPrint from 'react-to-print'
import { response } from '@/DTOS/response/response'
import { addDatadto } from '@/DTOS/formularios/form.dto'
import Toast from '@/Components/Toast'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Tickets = () => {
  const router = useRouter()
  const [dataForm, setDataForm] = useState({
    showModal: false,
    triggerToast: false,
    serverresponse: {} as response
  } as addDatadto)
  //const componentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<(HTMLDivElement | null)[]>([]);
  const componentClickRef = useRef<(HTMLButtonElement | null)[]>([]);

  const { data, error } = useSWR('/api/workline/codigos', fetcher)

  const printTicket = (index: number) => {
    if (componentRef.current) {
      componentRef.current[index]?.click()
    }
  }

  if (!data) return <>loading...</>

  return (<>
    <h1 className='text-center'>Codigos Descuento</h1>

    <ModalGeneral showModal={dataForm.showModal} close={()=>setDataForm({...dataForm, showModal: false, triggerToast: true})} >
      <AddCodigo dataform={dataForm} close={setDataForm}></AddCodigo>
    </ModalGeneral>

    <div style={{ height: "80vh" }} className='container overflow-scroll'>

      <div className='row'>
        <table className="table w-100">
          <thead >
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Vencimiento</th>
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
                    <td>{item.descuento} %</td>
                    <td className=''>
                      <ReactToPrint key={index + 100}
                        trigger={() => <button className='btn btn-primary' name={"button: " + index} ref={(el) => componentClickRef.current[index] = el}> <i className='bi bi-qr-code'></i> </button>}
                        content={() => componentRef.current[index]}
                      />
                      <div className='d-none'>
                        <QrPrint subject='Codigo de Descuento' ref={(el) => { componentRef.current[index] = el }} uuidqr={item.uuidkey}></QrPrint>
                      </div>
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
      <button className='btn btn-primary' onClick={() =>
          setDataForm({
            ...dataForm,
            showModal: true
          })}>
        <i style={{ fontSize: "3rem" }} className='bi bi-plus-circle'
        ></i>

      </button>

      <Toast show={dataForm.triggerToast}
        close={()=>setDataForm({...dataForm,triggerToast: false})}
        serverresponse={dataForm.serverresponse}></Toast>

    </div>

  </>)
}



export default Tickets