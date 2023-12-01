'use client'
import useSWR from 'swr'
import { Curso } from "@/DTOS/curso.dto"

const fetcher = (url: string) => fetch(url).then(r => r.json())
const deletefetcher = async (url: string) => fetch(url, { method: "DELETE" }).then(r => r.json())

const Curso = () => {
  //agregar curso
  const { data, error } = useSWR('/api/curso', fetcher)

  if (!data) return <>loading...</>


  return (<>
    <div>
      <table className="table">
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
  </>)
}



export default Curso