import { CursoDto } from "@/DTOS/curso.dto";
import { inscritos } from "@/DTOS/eventos/inscritos";
import { response } from "@/DTOS/response/response";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    let Cursos: Array<CursoDto> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://atmosferaform.softwarp.net/api/curso', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Cursos = userInfo
                    console.log(Cursos)

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
    const data:CursoDto = await req.json()
    console.log("Body: "+ JSON.stringify(data))
    
    try {
        if (testcookies)
            await fetch('https://atmosferaform.localfix.mx/api/curso', {
                method: "POST",
                body: JSON.stringify({
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    temario: data.temario,
                    costo: data.costo
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

export async function PUT(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:CursoDto = await req.json()
    console.log("Body: "+ JSON.stringify(data))
    
    try {
        if (testcookies)
            await fetch('https://atmosferaform.localfix.mx/api/curso', {
                method: "PUT",
                body: JSON.stringify({
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    temario: data.temario,
                    costo: data.costo
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
            await fetch(`https://atmosferaform.localfix.mx/api/curso?id=${id}`, {
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