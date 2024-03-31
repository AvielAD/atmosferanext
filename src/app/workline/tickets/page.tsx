'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ticketdto } from '@/DTOS/workline/tickets/ticket.dto'
import AddTicket from '@/Components/Formularios/AddTicket/page'
import ModalGeneral from '@/Components/ModalGeneral/page'
import Toast from '@/Components/Toast/index'
import { toastdatadto, toastpersonal } from '@/DTOS/toast/toast'
import { addDatadto } from '@/DTOS/formularios/form.dto'
import { response } from '@/DTOS/response/response'
const fetcher = (url: string) => fetch(url).then(r => r.json())

const Tickets = () => {
  const router = useRouter()
  const { data, error } = useSWR('/api/workline/tickets', fetcher)

  const [dataForm, setDataForm] = useState({
    showModal: false,
    triggerToast: false,
    serverresponse: {} as response
  } as addDatadto)

  if (!data) return <>loading...</>
  return (<>

    <ModalGeneral showModal={dataForm.showModal} close={()=>setDataForm({...dataForm, showModal: false, triggerToast: true})} >
      <AddTicket dataform={dataForm} close={setDataForm}></AddTicket>
    </ModalGeneral>

    <div style={{ height: "80vh" }} className='container overflow-scroll'>
      <h1 className='row text-center'>Tickets Abiertos</h1>

      <div className='row'>

        <table className="table w-100">
          <thead >
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Categoria</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item: ticketdto, index: number) => {
                return (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.category.nombre}</td>
                    <td className='d-flex justify-content-evenly'>
                      <i onClick={
                        () => router.push(`/workline/tickets/Details/${item.uuid}`)

                      } className='bi bi-eye w-50'></i>
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
      <button className='btn btn-primary'
        onClick={() =>
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