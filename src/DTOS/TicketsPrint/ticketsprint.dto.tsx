import { serviciodto } from "../workline/servicios/servicio.dto"
import { servicedto } from "../workline/tickets/ticket.dto"

export interface ticketqr{
    uuidqr: string,
    subject: string
}

export interface ticketdetails{
    cliente: string,
    horainicio: string,
    horafin: string,
    tiempo: string,
    plan: string,
    total: string,
    servicios: Array<servicedto>
}