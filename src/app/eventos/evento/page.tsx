'use client'
import { eventosview } from "@/DTOS/eventos/eventos"
import MenuAdd from "@/Components/AddMenu"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(r => r.json())
const deletefetcher = async (url: string) => fetch(url, { method: "DELETE" }).then(r => r.json())

const Evento = () => {
    const { data, error } = useSWR('/api/evento', fetcher)

    if (!data) return <>loading...</>
    return (<>
        <div>
            <table className="table overflow-x-scroll">
                <thead>
                    <tr>
                        <th scope="col">Curso</th>
                        <th scope="col">Inicio Curso</th>
                        <th scope="col">Inscritos</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map((item: eventosview, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{item.curso}</td>
                                    <td>{item.inicio.split("T")[0]}</td>
                                    <td className="text-center">{item.inscritos}</td>
                                    <td>
                                    <i onClick={
                                            () => 
                                            navigator.clipboard.writeText(`https://atmosferanext.vercel.app/formularios/${item.uuid}`)
                                        } className='m-2 bi bi-share'></i>

                                        <i onClick={
                                            () => deletefetcher(`/api/evento?id=${item.id}`)
                                        } className='m-2 bi bi-trash'></i>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>

            </table>
            <MenuAdd url='/eventos/evento/Add'></MenuAdd>


        </div>    </>)
}

export default Evento