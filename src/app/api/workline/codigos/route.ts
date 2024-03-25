import { codigodescuento } from "@/DTOS/codigo/codigo.dto";
import { response } from "@/DTOS/response/response";
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    let ticketsView: Array<codigodescuento> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://backwl.atmosfera.la/api/codigos/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    ticketsView = userInfo
                    //console.log(userInfo)
                }).catch((error) => {
                })

                return NextResponse.json(ticketsView)
    } catch (error) {
        return NextResponse.json(ticketsView)
    }
}
