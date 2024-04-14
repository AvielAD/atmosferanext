'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ticketdto } from '@/DTOS/workline/tickets/ticket.dto'
import AddTicket from '@/Components/Formularios/AddTicket/page'
import AddCompra from '@/Components/Formularios/AddCompra/page'
import ModalGeneral from '@/Components/ModalGeneral/page'
import Toast from '@/Components/Toast/index'
import { addDatadto } from '@/DTOS/formularios/form.dto'
import { response } from '@/DTOS/response/response'
const fetcher = (url: string) => fetch(url).then(r => r.json())

const Tickets = () => {
  const router = useRouter()
  const { data, error, mutate } = useSWR('/api/workline/tickets', fetcher)

  const [dataForm, setDataForm] = useState({
    showModal: false,
    triggerToast: false,
    serverresponse: {} as response
  } as addDatadto)

  const [dataForm2, setDataForm2] = useState({
    showModal: false,
    triggerToast: false,
    serverresponse: {} as response
  } as addDatadto)
  if (!data) return <>loading...</>
  if (dataForm.triggerToast) mutate()
  if (dataForm2.triggerToast) mutate()

  return (<>

    <ModalGeneral showModal={dataForm.showModal} close={() => setDataForm({ ...dataForm, showModal: false })} >
      <AddTicket dataform={dataForm} close={setDataForm}></AddTicket>
    </ModalGeneral>

    <ModalGeneral showModal={dataForm2.showModal} close={() => setDataForm2({ ...dataForm2, showModal: false })} >
      <AddCompra dataform={dataForm2} close={setDataForm2}></AddCompra>
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
              data?.map((item: ticketdto, index: number) => {
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
      <div className='row'>

        <div className='col'>
          <button className='btn btn-primary'
            onClick={() =>
              setDataForm({
                ...dataForm,
                showModal: true
              })}>
            <i style={{ fontSize: "1rem" }} className='bi bi-plus-circle'
            >Ticket</i>
          </button>

        </div>

        <div className='col'>
          <button className='btn btn-primary'
            onClick={() =>
              setDataForm2({
                ...dataForm2,
                showModal: true
              })}>
            <i style={{ fontSize: "1rem" }} className='bi bi-plus-circle'
            >Venta</i>
          </button>

        </div>

        <div className='col'>
          <Toast show={dataForm.triggerToast}
            close={() => setDataForm({ ...dataForm, triggerToast: false })}
            serverresponse={dataForm.serverresponse}></Toast>
          <Toast show={dataForm2.triggerToast}
            close={() => setDataForm2({ ...dataForm2, triggerToast: false })}
            serverresponse={dataForm2.serverresponse}></Toast>

        </div>

      </div>

    </div>

  </>)
}



export default Tickets