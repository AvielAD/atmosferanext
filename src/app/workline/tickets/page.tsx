'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ticketdto } from '@/DTOS/workline/tickets/ticket.dto'
import AddTicket from '@/Components/Formularios/AddTicket/page'
import ModalGeneral from '@/Components/ModalGeneral/page'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Tickets = () => {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const { data, error } = useSWR('/api/workline/tickets', fetcher)
  const [uuidQr, setUuidQr] = useState("")

  if (!data) return <>loading...</>
  console.log(uuidQr)
  return (<>

    <ModalGeneral show={modal} close={() => setModal(false)} >
      <AddTicket close={setModal}></AddTicket>
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
      <button className='btn btn-primary' onClick={() => setModal(!modal)}>
        <i style={{ fontSize: "4rem" }} className='bi bi-plus-circle h1'
        ></i>

      </button>
    </div>

  </>)
}



export default Tickets