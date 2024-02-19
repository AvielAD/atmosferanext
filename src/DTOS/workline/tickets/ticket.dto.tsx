export interface ticketdto{
    id: number,
    fechainicio: Date,
    fechafinal: Date,
    nombre: string,
    category: categorydto
}

export interface categorydto{
    id: number,
    nombre: string
}

export interface createTicketDto{
    nombre: string,
    idcatticket: number
}

export interface createTicketFormDto{
    nombre: string,
    idcatticket: string
}