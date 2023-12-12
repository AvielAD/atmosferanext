'use client'
import useSWR from 'swr'
import { Curso } from "@/DTOS/curso.dto"
import MenuAdd from "@/Components/AddMenu"
import { useRouter } from 'next/navigation'
import { codigodescuento, codigodescuentoupdate } from '@/DTOS/codigo/codigo.dto'

const fetcher = (url: string) => fetch(url).then(r => r.json())
const deletefetcher = async (url: string) => fetch(url, { method: "DELETE" }).then(r => r.json())

const Codigo = () => {
  const router = useRouter()
  //agregar curso
  const { data, error } = useSWR('/api/codigo', fetcher)

  if (!data) return <>loading...</>


  return (<>
    <h1 className='text-center'>Codigos de Descuento</h1>
    <div className='d-flex justify-content-center'>
      <table className="table w-lg-75">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Codigo</th>
            <th scope="col">Descuento</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {
            data.map((item: codigodescuentoupdate, index: number) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.nombre}</td>
                  <td>{item.codigo}</td>
                  <td>{item.descuento}</td>
                  <td>
                    <i onClick={
                      () => deletefetcher(`/api/curso?id=${item.id}`)
                    } className='m-2 bi bi-trash'></i>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>

    </div>
    <MenuAdd url='/eventos/codigodescuento/Add'></MenuAdd>

  </>)
}



export default Codigo