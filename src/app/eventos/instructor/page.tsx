'use client'
import useSWR from 'swr'
import { Curso } from "@/DTOS/curso.dto"
import MenuAdd from "@/Components/AddMenu"
import { useRouter } from 'next/navigation'
import { instructor } from '@/DTOS/instructor/instructor.dto'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Instructor = () => {
  const router = useRouter()
  //agregar curso
  const { data, error } = useSWR('/api/instructor', fetcher)

  if (!data) return <>loading...</>

  return (<>
  <h1 className='text-center'>Instructores Disponibles</h1>
    <div className='d-flex justify-content-center'>
      <table className="table w-lg-75">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Costo</th>
          </tr>
        </thead>
        <tbody>

          {
            data.map((item: instructor, index: number) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.email}</td>
                </tr>
              )
            })
          }
        </tbody>

      </table>

    </div>
    <MenuAdd url='/eventos/instructor/Add'></MenuAdd>

  </>)
}



export default Instructor