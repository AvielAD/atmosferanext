'use client'
import { eventosview } from "@/DTOS/eventos/eventos"
import MenuAdd from "@/Components/AddMenu"
import useSWR from "swr"
import { useState } from "react"
import { response } from "@/DTOS/response/response"
import { useRouter } from "next/navigation"
import ToastPersonal from '@/Components/Toast'
const fetcher = (url: string) => fetch(url).then(r => r.json())
const deletefetcher = async (url: string) => fetch(url, { method: "DELETE" }).then(r => r.json())

const Evento = () => {
     const router = useRouter()

    const { data, error } = useSWR('/api/evento', fetcher)
    const [isVisibleToast, setIsVisibleToast] = useState(false)
    const [dataResponse, setDataResponse] = useState<response>({} as response)

    if (!data) return <>loading...</>

    const callDelete = (id: number) => {
        deletefetcher(`/api/curso?id=${id}`).then((data) => {
          setDataResponse(data)
    
        })
    
        setIsVisibleToast(true)
    
        const timer = setTimeout(() => {
          setIsVisibleToast(false)
          router.push('/eventos/evento')
        }, 3000)
    
        return ()=>clearTimeout(timer)
      }

    return (<>
    <h1 className="text-center">Eventos próximos</h1>
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
                                            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}formularios/${item.uuid}`)
                                        } className='m-2 bi bi-share'></i>

                                        <i onClick={() => callDelete(item.id)
                                        } className='m-2 bi bi-trash'></i>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>

            </table>
            <MenuAdd url='/eventos/evento/Add'></MenuAdd>
            <div className={`z-1 fixed-bottom d-flex justify-content-center ${isVisibleToast ? 'd-block' : 'd-none'}`}>

<ToastPersonal message={dataResponse.message} succedded={dataResponse.succeeded}></ToastPersonal>

</div>

        </div>    </>)
}

export default Evento