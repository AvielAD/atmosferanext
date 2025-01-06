import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";
import { response } from "@/DTOS/response/response";
import { assigndcodigoinputdto, codigosdescuentoinputdto } from "@/DTOS/workline/codigos/codigos.dto";

export async function PUT(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:assigndcodigoinputdto = await req.json()
    
    try {
        if (testcookies)
            await fetch('https://backwl.softwarp.net/api/assigncode', {
                method: "PUT",
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