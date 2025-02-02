import { response } from "@/DTOS/response/response";
import { createTicketDto, ticketdto } from "@/DTOS/workline/tickets/ticket.dto"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {params}: {params: {slug: string}}) {
    let Response = {} as response
    const testcookies = cookies().get('token')
    const uuidsearch = params.slug
    
    try {
        if (testcookies)
            await fetch(`https://backwl.softwarp.net/api/tickets/${uuidsearch}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    Response = userInfo
                }).catch((error) => {
                })
                return NextResponse.json(Response)
    } catch (error) {
        return NextResponse.json(Response)
    }
}