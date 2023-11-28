import { inscritos } from "@/DTOS/eventos/inscritos";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    let Inscritos: Array<inscritos> = []
    const testcookies = cookies().get('token')
    console.log("Prueba print")
    console.log("Test Cookies"+testcookies)
    /*
    try {
        if (testcookies)
            await fetch('https://atmosferaform.localfix.mx/inscripcion/inscritos', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Inscritos = userInfo
                    console.log("UserInfo: "+userInfo)
                }).catch((error) => {
                    console.log("Error"+error)
                })

                return NextResponse.json(Inscritos)
    } catch (error) {
        console.log("Errores: "+error)
        return NextResponse.json(Inscritos)
    }*/
    return NextResponse.json(Inscritos)

}
