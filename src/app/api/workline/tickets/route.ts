import { response } from "@/DTOS/response/response";
import { createTicketDto, ticketdto } from "@/DTOS/workline/tickets/ticket.dto"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    let ticketsView: Array<ticketdto> = []
    const testcookies = cookies().get('token')
    try {
        if (testcookies)
            await fetch('https://backwl.softwarp.net/api/tickets', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    ticketsView = userInfo
                }).catch((error) => {
                })

                return NextResponse.json(ticketsView)
    } catch (error) {
        return NextResponse.json(ticketsView)
    }
}

export async function POST(req: NextRequest) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const data:createTicketDto = await req.json()
    
    try {
        if (testcookies)
            await fetch('https://backwl.atmosfera.la/api/tickets', {
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
