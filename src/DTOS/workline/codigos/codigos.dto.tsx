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
    uuidkey: string,
    replicas: number,
    terminado: boolean,
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

