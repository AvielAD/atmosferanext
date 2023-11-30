import { Curso } from "@/DTOS/curso.dto"
import { cookies } from "next/headers"
const Curso = async () => {
    //agregar curso

    const testcookies = cookies().get('token')
    let Cursos: Array<Curso> = []
    if (testcookies)
    await fetch('https://atmosferaform.localfix.mx/api/curso',{
          method: 'GET',
          credentials: 'include',
          headers: {
              'Authorization': `Bearer ${testcookies.value}`
          }
      })
      .then((response) => response.json())
      .then((data) => {
        Cursos = data
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
            <th scope="col">Descripcion</th>
            <th scope="col">Costo</th>
          </tr>
        </thead>
        <tbody>

        {
          Cursos.map((item: Curso, index: number) => {
            return <>
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{item.nombre}</td>
                <td>{item.descripcion}</td>
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



export default Curso