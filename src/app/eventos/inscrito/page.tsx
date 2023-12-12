
'use client'
import { inscritos } from "@/DTOS/eventos/inscritos"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Inscrito = () => {
  const { data, error } = useSWR('/api/inscritos', fetcher)
  if (!data) return <>loading...</>
  return (<>
  <h1 className="text-center">Inscritos en Cursos Activos</h1>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Curso</th>
            <th scope="col">Costo</th>
          </tr>
        </thead>
        <tbody>

        {
          
          data.map((item: inscritos, index: number) => {
            return (
              <tr key={index}>
                <th scope="row">{data.length-index}</th>
                <td>{item.nombre}</td>
                <td>{item.apellidop}</td>
                <td>{item.curso}</td>
                <td>{item.costo}</td>
              </tr>

            )
          })
        }
        </tbody>

      </table>


    </div>
  </>)
}

export default Inscrito