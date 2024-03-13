'use client'
import useSWR from 'swr'
import { Curso } from "@/DTOS/curso.dto"
import MenuAdd from "@/Components/AddMenu"
import { useRouter } from 'next/navigation'
import ToastPersonal from '@/Components/Toast'
import { useState } from 'react'
import { response } from '@/DTOS/response/response'
import { ticketdto } from '@/DTOS/workline/tickets/ticket.dto'

const fetcher = (url: string) => fetch(url).then(r => r.json())
const deletefetcher = async (url: string) => fetch(url, { method: "DELETE" }).then(r => r.json())

const Tickets = () => {
  const router = useRouter()
  //agregar curso
  const { data, error } = useSWR('/api/workline/tickets', fetcher)
  const [isVisibleToast, setIsVisibleToast] = useState(false)
  const [dataResponse, setDataResponse] = useState<response>({} as response)

  if (!data) return <>loading...</>

  const callDelete = (id: number) => {
    deletefetcher(`/api/curso?id=${id}`).then((data) => {
      setDataResponse(data)

    })

    setIsVisibleToast(true)

    const timer = setTimeout(() => {
      setIsVisibleToast(false)
      router.push('/eventos/curso')
    }, 3000)

    return () => clearTimeout(timer)
  }

  return (<>
    <h1 className='text-center'>Tickets Abiertos</h1>
    <div className='container d-flex justify-content-center'>
      <table className="table w-100">
        <thead>
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
                      () => router.push(`/workline/tickets/Details/${item.uuid}`)

                    } className='bi bi-qr-code w-50'></i>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>

    </div>

  </>)
}



export default Tickets