'use client'
import useSWR from 'swr'
import { Curso } from "@/DTOS/curso.dto"
import MenuAdd from "@/Components/AddMenu"
import { useRouter } from 'next/navigation'
import ToastPersonal from '@/Components/Toast'
import { useState } from 'react'
import { response } from '@/DTOS/response/response'

const fetcher = (url: string) => fetch(url).then(r => r.json())
const deletefetcher = async (url: string) => fetch(url, { method: "DELETE" }).then(r => r.json())

const Curso = () => {
  const router = useRouter()
  //agregar curso
  const { data, error } = useSWR('/api/curso', fetcher)
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

    return ()=>clearTimeout(timer)
  }

  return (<>
    <h1 className='text-center'>Cursos Disponibles</h1>
    <div className='d-flex justify-content-center'>
      <table className="table w-lg-75">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Costo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {
            data.map((item: Curso, index: number) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index}</th>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.costo}</td>
                  <td>
                    <i onClick={
                      () => {
                        callDelete(item.id)
                      }
                    } className='m-2 bi bi-trash'></i>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>

    </div>

    <div className={`z-1 fixed-bottom d-flex justify-content-center ${isVisibleToast ? 'd-block' : 'd-none'}`}>

      <ToastPersonal message={dataResponse.message} succedded={dataResponse.succeeded}></ToastPersonal>

    </div>
    <MenuAdd url='/eventos/curso/Add'></MenuAdd>
  </>)
}



export default Curso