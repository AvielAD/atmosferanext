'use client'
import { Curso } from "@/DTOS/curso.dto";
import { createTicketDto, createTicketFormDto } from "@/DTOS/workline/tickets/ticket.dto";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const addFetcher = async (url: string, data: createTicketDto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
const getFetcher = async (url: string) => fetch(url, { method: "GET" }).then(r => r.json())



const Add = () => {
    const [formTicket, setFormTicket] = useState({
        idcatticket: '',
        nombre: 'General'
    } as createTicketFormDto)
    const router = useRouter()
    //agregar curso


    const onSubmitAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newTicket = {
            idcatticket: parseInt(formTicket.idcatticket),
            nombre: formTicket.nombre
        } as createTicketDto

        addFetcher('/api/workline/tickets', newTicket).then((data) => {
            if (data.succeeded)
                router.push('/workline/tickets')
        })
    }

    return (<>
        <h1 className="text-center">Iniciar Ticket</h1>
        <form onSubmit={onSubmitAdd} className="m-3">
            <label className="form-label">Seleccionar Modalidad</label>
            <select
                onChange={
                    (e: ChangeEvent<HTMLSelectElement>) =>
                        setFormTicket({
                            ...formTicket,
                            idcatticket: e.target.value
                        })
                }
                className="form-select" defaultValue={"DEFAULT"}>

                <option value={"DEFAULT"}> Seleccionar ...</option>
                <option value={"1"}> Paquete Limitado</option>
                <option value={"2"}> Paquete Ilimitado</option>

            </select>
            <label className="form-label">Nombre</label>
            <input
                className="form-control"
                type="text"
                value={formTicket.nombre}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormTicket({
                            ...formTicket,
                            nombre: e.target.value
                        })
                }

            />
            <button className="mt-5 btn btn-primary"
                type="submit"
            >Agregar</button>
        </form>
    </>)
}

export default Add