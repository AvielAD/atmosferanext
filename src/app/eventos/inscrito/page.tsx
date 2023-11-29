
import { inscritos } from "@/DTOS/eventos/inscritos"
import { cookies } from "next/headers"

const Inscrito = async () => {
  const testcookies = cookies().get('token')
  let Inscritos: Array<inscritos> = []
  if (testcookies)
  await fetch('https://atmosferaform.localfix.mx/inscripcion/inscritos',{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${testcookies.value}`
        }
    })
    .then((response) => response.json())
    .then((data) => {
      Inscritos = data
    })
    .catch((error) => {
    })

  return (<>
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
          Inscritos.map((item: inscritos, index: number) => {
            return <>
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{item.nombre}</td>
                <td>{item.apellidop}</td>
                <td>{item.curso}</td>
                <td>{item.costo}</td>
              </tr>

            </>
          })
        }
        </tbody>

      </table>


    </div>
  </>)
}

export default Inscrito