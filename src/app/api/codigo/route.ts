import { codigodescuento } from "@/DTOS/codigo/codigo.dto";
import { response } from "@/DTOS/response/response";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    let Cursos: Array<codigodescuento> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://atmosferaform.localfix.mx/api/codigo', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Cursos = userInfo
                }).catch((error) => {
                })

                return NextResponse.json(Cursos)
    } catch (error) {
        return NextResponse.json(Cursos)
    }
}
export async function POST(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:codigodescuento = await req.json()
    
    try {
        if (testcookies)
            await fetch('https://atmosferaform.localfix.mx/api/codigo', {
                method: "POST",
                body: JSON.stringify({
                    nombre: data.nombre,
                    codigo: data.codigo,
                    descuento: data.descuento,
                }),
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Response = userInfo
                }).catch((error) => {
                console.log(error)

                })
                return NextResponse.json(Response)
    } catch (error) {
        return NextResponse.json(Response)
    }
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    let Response={} as response
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch(`https://atmosferaform.localfix.mx/api/codigo?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`,
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Response = userInfo
                }).catch((error) => {
                })

                return NextResponse.json(Response)
    } catch (error) {
        console.log("Errores: "+error)
        return NextResponse.json(Response)
    }
}