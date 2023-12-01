import { eventosview } from "@/DTOS/eventos/eventos"
import { cookies } from "next/headers"

import moment from "moment"
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
            <table className="table overflow-x-scroll">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Costo</th>
                        <th scope="col">Inicio Curso</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        Eventos.map((item: eventosview, index: number) => {
                            return <>
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.curso}</td>
                                    <td>{item.costo}</td>
                                    <td>{item.inicio.split("T")[0]}</td>
                                </tr>

                            </>
                        })
                    }
                </tbody>

            </table>


        </div>    </>)
}

export default Evento