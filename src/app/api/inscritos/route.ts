import { inscritos } from "@/DTOS/eventos/inscritos";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    let Inscritos: Array<inscritos> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://atmosferaform.localfix.mx/inscripcion/inscritos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Inscritos = userInfo
                }).catch((error) => {
                })

        return NextResponse.json(Inscritos)
    } catch (error) {
        return NextResponse.json(Inscritos)
    }

}
