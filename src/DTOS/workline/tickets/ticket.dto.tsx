export interface ticketdto{
    id: number,
    fechainicio: Date,
    fechafinal: Date,
    nombre: string,
    uuid: string,
    category: categorydto,
    
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

export interface servicedto{
    id: string,
    nombre:string,
    costo: number,
}
export interface ticketallDto{
    id: number,
    fechainicio: Date,
    fechafinal: Date,
    nombre: string,
    uuid: string,
    total: number,
    category: categorydto,
    servicios: Array<servicedto>
}