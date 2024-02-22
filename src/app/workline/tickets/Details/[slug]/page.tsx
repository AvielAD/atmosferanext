'use client'

import useSWR from "swr"
import { ticketallDto } from "@/DTOS/workline/tickets/ticket.dto"
import { useEffect, useState } from "react"

const fetcher = (url: string) => fetch(url).then(r => r.json())
const updateTicket = (url: string) => fetch(url,{method: 'PUT'}).then(r => r.json())

const Details = ({ params }: { params: { slug: string } }) => {
    let allInfo = {} as ticketallDto
    const uuid = params.slug
    const reparacionDetail = useSWR(`/api/workline/tickets/${uuid}`, fetcher)
    const dataCancel = useSWR(`/api/workline/tickets/close/${uuid}`, updateTicket)

    if (!reparacionDetail.data) return <>loading...</>
    if (reparacionDetail.data) allInfo = reparacionDetail.data


    console.log(dataCancel.data)
    return (<>
        <h2>Detalles</h2>
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
                <p>Minutos Transcurridos: {dataCancel.data?.data.minutos.toString().split(".")[0]}</p>
            </div>

            <div className="col-4 text-justify">
                <h2>Tipo</h2>
                <p>Plan: {allInfo?.category.nombre}</p>

            </div>

        </div>


    </>)
}

export default Details