import { Curso } from "@/DTOS/curso.dto";
import { inscritos } from "@/DTOS/eventos/inscritos";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    let Cursos: Array<Curso> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://atmosferaform.localfix.mx/api/curso', {
                method: 'GET',
                credentials: 'include',
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

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    let Cursos: Array<Curso> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch(`https://atmosferaform.localfix.mx/api/curso?id=${id}`, {
                method: 'DELETE',
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
        console.log("Errores: "+error)
        return NextResponse.json(Cursos)
    }
}