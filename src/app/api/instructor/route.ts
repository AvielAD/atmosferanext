import { instructor } from "@/DTOS/instructor/instructor.dto";
import { response } from "@/DTOS/response/response";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    let Instructor: Array<instructor> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://atmosferaform.softwarp.net/api/instructor', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Instructor = userInfo
                }).catch((error) => {
                })

                return NextResponse.json(Instructor)
    } catch (error) {
        return NextResponse.json(Instructor)
    }
}

export async function POST(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:instructor = await req.json()
    try {
        if (testcookies)
            await fetch('https://atmosferaform.localfix.mx/api/instructor', {
                method: "POST",
                body: JSON.stringify({
                    nombre: data.nombre,
                    apellido: data.apellido,
                    email: data.email
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
