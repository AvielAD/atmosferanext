'use client'

import useSWR from "swr"
import { ticketallDto } from "@/DTOS/workline/tickets/ticket.dto"
import { useState } from "react"

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Details = ({ params }: { params: { slug: string } }) => {
    let allInfo = {} as ticketallDto
    const uuid = params.slug
    const [updateP, setUpdateP] = useState(false)
    const reparacionDetail = useSWR(`/api/workline/tickets/${uuid}`, fetcher)

    if (!reparacionDetail.data) return <>loading...</>
    if (reparacionDetail.data) allInfo = reparacionDetail.data

    const updateTicket = (uuid: string)=>{
        if(uuid!== "")
        fetch(`/api/workline/tickets/close/${uuid}`,{
            method: 'PUT'
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.succeeded){
                setUpdateP(!updateP)
            }
        })
    }

    return (<>
        <h2>Detalles</h2>
        <div className="fs-1 d-flex justify-content-center">
            <i
            onClick={()=>updateTicket(allInfo.uuid)} 
            className="bi bi-arrow-clockwise"></i>
        </div>
        <div className="row">
            <div className="col-6">
                <h2>Cliente</h2>
                <p>Nombre: {allInfo?.nombre}</p>
            </div>

            <div className="col-6">
                <h2>Costo</h2>
                <p>Total: ${allInfo?.total} mxn</p>

            </div>

        </div>
        <div className="row">
            <div className="col-8">
                <h2>Tiempo</h2>
                <p>Fecha {allInfo.fechainicio.split(" ")[0]} </p>
                <p>Hora Inicio: {allInfo?.fechainicio.split(" ")[1]} </p>
                <p>Fecha {allInfo.fechafinal.split(" ")[0]} </p>
                <p>Hora Actual: {allInfo?.fechafinal.split(" ")[1]} </p>
            </div>

            <div className="col-4 text-justify">
                <h2>Tipo</h2>
                <p>Plan: {allInfo?.category.nombre}</p>

            </div>

        </div>


    </>)
}

export default Details