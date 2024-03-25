import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";
import { response } from "@/DTOS/response/response";
import { assigndcodigodto, codigosdescuentoinputdto } from "@/DTOS/workline/codigos/codigos.dto";

export async function PUT(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:assigndcodigodto = await req.json()
    
    try {
        if (testcookies)
            await fetch('https://backwl.atmosfera.la/api/assigncode', {
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