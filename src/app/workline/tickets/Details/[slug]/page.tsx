'use client'

import useSWR from "swr"
import { ticketallDto } from "@/DTOS/workline/tickets/ticket.dto"
import { useEffect, useState } from "react"
import {DateTime} from 'luxon'
const fetcher = (url: string) => fetch(url).then(r => r.json())
const updateTicket = (url: string) => fetch(url, { method: 'PUT' }).then(r => r.json())


const Details = ({ params }: { params: { slug: string } }) => {
    let allInfo = {} as ticketallDto
    
    const uuid = params.slug
    const reparacionDetail = useSWR(`/api/workline/tickets/${uuid}`, fetcher)
    const dataCancel = useSWR(`/api/workline/tickets/update/${uuid}`, updateTicket)

    if (!reparacionDetail.data) return <>loading...</>
    if (reparacionDetail.data){ 
        allInfo = reparacionDetail.data
    }

    const closeTicket = () => {
        console.log('cerrando ticket')
        fetch(`/api/workline/tickets/close/${uuid}`, {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })

    }



    return (<>
        <div className="container">
            <h2 className="text-center h1 mb-5">Detalle Ticket</h2>
            <div className="row">
                <div className="col-6">
                    <h2>Cliente</h2>
                    <p>Nombre: {allInfo?.nombre}</p>
                </div>

                <div className="col-6">
                    <h2>Costo</h2>
                    <p>Total: ${allInfo?.total} mxn</p>
                    <h2>Minutos</h2>
                </div>

            </div>
            <div className="row">
                <div className="col-8">
                    <h2>Tiempo</h2>
                    <p>Estado: {allInfo.estado}</p>
                    <p>Fecha {allInfo.fechainicio.split(" ")[0]} </p>
                    <p>Hora Inicio: {allInfo?.fechainicio.split(" ")[1]} </p>
                    <p>Minutos Transcurridos: {dataCancel?.data?.data?.minutos?.toString().split(".")[0] ?? 0}</p>
                </div>

                <div className="col-4 text-justify">
                    <h2>Tipo</h2>
                    <p>Plan: {allInfo?.category.nombre}</p>

                </div>

                <div className="mt-5 d-flex justify-content-center " >
                    <i className="fs-1 bi bi-sign-stop-fill"
                        onClick={() => closeTicket()}
                        
                        ></i>
                        
                </div>
            </div>

        </div>
    </>)
}

export default Details