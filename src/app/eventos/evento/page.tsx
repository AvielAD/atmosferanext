import { eventosview } from "@/DTOS/eventos/eventos"
import { cookies } from "next/headers"


const Evento = async () => {

    const testcookies = cookies().get('token')
    let Eventos: Array<eventosview> = []
    if (testcookies)
        await fetch('https://atmosferaform.localfix.mx/api/evento', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${testcookies.value}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                Eventos = data
            })
            .catch((error) => {
            })

    return (<>
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Costo</th>
                        <th scope="col">Inicio Promocion</th>
                        <th scope="col">Fin Promocion</th>
                        <th scope="col">Inicio Curso</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        Eventos.map((item: eventosview, index: number) => {
                            return <>
                                <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td>{item.curso}</td>
                                    <td>{item.costo}</td>
                                    <td>{item.iniciopromocion}</td>
                                    <td>{item.finpromocion}</td>
                                    <td>{item.inicio}</td>
                                </tr>

                            </>
                        })
                    }
                </tbody>

            </table>


        </div>    </>)
}

export default Evento