import { addDatadto } from "@/DTOS/formularios/form.dto"

export interface codigosdescuentodto{
    id: number,
    nombre: string,
    descripcion: string,
    fechavigencia: Date,
    uuidkey: string,
    replicas: number,
    terminado: boolean,
    idcatcodigo: number,
    descuento: number
}

export interface codigosdescuentoinputdto{
    nombre: string,
    descripcion: string,
    fechavigencia: Date,
    replicas: number,
    idcatcodigo: number,
    descuento: number
}
export interface codigosdescuentoformdto{
    nombre: string,
    descripcion: string,
    fechavigencia: string,
    replicas: string,
    idcatcodigo: string,
    descuento: string
}

export interface assigndcodigoinputdto{
    idcodigouuid: string,
    idticket: number
}
export interface assignpropdto{
    idticket: number,
    dataForm: addDatadto,
    closemodal: Function
}
