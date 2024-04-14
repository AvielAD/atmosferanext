import { response } from "@/DTOS/response/response";
import { ListServicios } from "@/DTOS/workline/caja/caja.dto";
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:ListServicios = await req.json()
    
    try {
        if (testcookies)
            await fetch('https://backwl.atmosfera.la/api/caja', {
                method: "POST",
                body: JSON.stringify(data),
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