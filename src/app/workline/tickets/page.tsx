'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ticketdto } from '@/DTOS/workline/tickets/ticket.dto'
import AddTicket from '@/Components/Formularios/AddTicket/page'
import ModalGeneral from '@/Components/ModalGeneral/page'
import QRCode from 'react-qr-code'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Tickets = () => {
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const { data, error } = useSWR('/api/workline/tickets', fetcher)
  const [uuidQr, setUuidQr] = useState("")

  if (!data) return <>loading...</>
  console.log(uuidQr)
  return (<>

    <ModalGeneral show={modal} close={()=>setModal(false)} >
      <AddTicket close={setModal}></AddTicket>
    </ModalGeneral>


    <h1 className='text-center'>Tickets Abiertos</h1>
    <div className='container d-flex justify-content-center'>
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
                      <i onClick={
                        () => setUuidQr(item.uuid)
                      } className='bi bi-qr-code w-50'></i>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <div className='row fs-1'>
          <i className='bi bi-plus-circle h1'
            onClick={() => setModal(!modal)}></i>
        </div>
      </div>
    </div>

  </>)
}



export default Tickets