
import { inscritos } from "@/DTOS/eventos/inscritos"

const Inscrito = async () => {

  let Inscritos: Array<inscritos> = []
  fetch('http://localhost:3000/api/inscritos')
  .then((response)=>response.json())
  .then((data)=>{
    console.log(data)
  }).catch((error)=>{
    console.log(error)
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

        </tbody>
        {
          Inscritos.map((item: inscritos, index: number) => {
            return <>
              <tr>
                <th scope="row">{index}</th>
                <td>{item.nombre}</td>
                <td>{item.apellidop}</td>
                <td>{item.curso}</td>
                <td>{item.costo}</td>
              </tr>

            </>
          })
        }
      </table>


    </div>
  </>)
}

export default Inscrito