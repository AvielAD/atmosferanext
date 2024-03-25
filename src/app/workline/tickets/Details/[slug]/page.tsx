'use client'

import useSWR from "swr"
import { ticketallDto } from "@/DTOS/workline/tickets/ticket.dto"
import { useEffect, useRef, useState } from "react"
import { DateTime } from 'luxon'
import { useReactToPrint } from "react-to-print"
import QrPrint from '@/Components/TicketsPrint/QrTicketPrint/page'
import TicketPrint from '@/Components/TicketsPrint/DetailsTicketPrint/page'
import QrScannerDiscount from '@/Components/QrScannerDiscount/page'
import ModalGeneral from '@/Components/ModalGeneral/page'

const fetcher = (url: string) => fetch(url).then(r => r.json())
const updateTicket = (url: string) => fetch(url, { method: 'PUT' }).then(r => r.json())


const Details = ({ params }: { params: { slug: string } }) => {
    let allInfo = {} as ticketallDto
    const [modal, setModal] = useState(false)
    const uuid = params.slug
    const reparacionDetail = useSWR(`/api/workline/tickets/${uuid}`, fetcher)
    const dataCancel = useSWR(`/api/workline/tickets/update/${uuid}`, updateTicket)

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const componentRef2 = useRef<HTMLDivElement>(null);
    const handlePrint2 = useReactToPrint({
        content: () => componentRef2.current,
    })

    if (!reparacionDetail.data) return <>loading...</>
    if (reparacionDetail.data) {
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


    const qrscanner = modal ? <QrScannerDiscount uuidticket={uuid}/> : null



    return (<>
        <div className="d-none">
            <QrPrint ref={componentRef} uuidqr={allInfo?.uuid} subject="Seguimiento Consumo"></QrPrint>
        </div>

        <ModalGeneral show={modal} close={() => setModal(false)} >
            {qrscanner}
        </ModalGeneral>


        <div className="d-none">
            <TicketPrint ref={componentRef2}
                cliente={allInfo.nombre}
                horainicio={allInfo.fechainicio.toString()}
                horafin={allInfo.fechafinal.toString()}
                tiempo={"5"}
                plan={allInfo.category.nombre}
                total={allInfo.total.toString()}
            ></TicketPrint>
        </div>
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

                <div className="col-4">
                    <h2>Plan</h2>
                    <p>{allInfo?.category.nombre}</p>
                </div>

            </div>
            <div className="row gx-1 gy-1">
                <h2 className="text-center">Acciones</h2>

                <div className="col-6">
                    <button className="btn btn-success w-100" disabled={allInfo.estado == "Finalizado"}>
                        <i style={{ fontSize: '2rem' }} className="bi bi-qr-code" onClick={handlePrint}></i>
                        <p>QR</p>
                    </button>
                </div>


                <div className="col-6">
                    <button className="btn btn-primary w-100" disabled={allInfo.estado !== "Finalizado"}>
                        <i style={{ fontSize: '2rem' }} className="bi bi-printer" onClick={handlePrint2}></i>
                        <p>Ticket</p>
                    </button>

                </div>

                <div className="col-6">
                    <button className="btn btn-secondary w-100" disabled={allInfo.estado == "Finalizado"}>
                        <i style={{ fontSize: '2rem' }} className="bi bi-window-plus" onClick={handlePrint2}></i>
                        <p>Cupon</p>
                    </button>
                </div>

                <div className="col-6">
                    <button className="btn btn-danger w-100" disabled={allInfo.estado == "Finalizado"}>
                        <i style={{ fontSize: '2rem'}} className="bi bi-sign-stop-fill" onClick={() => closeTicket()}></i>
                        <p>Cerrar</p>
                    </button>
                </div>


            </div>
        </div>
    </>)
}

export default Details