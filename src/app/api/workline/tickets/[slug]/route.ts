import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ticketallDto } from "@/DTOS/workline/tickets/ticket.dto";

export async function GET(req: NextRequest, {params}: {params: {slug: string}}) {
    let EventosView = {} as ticketallDto
    const testcookies = cookies().get('token')

    const uuidsearch = params.slug
    try {
        if (testcookies)
            await fetch(`https://backwl.atmosfera.la/api/tickets/${uuidsearch}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${testcookies.value}`
                }
            })
                .then((response) => response.json())
                .then((userInfo) => {
                    EventosView = userInfo
                    console.log(userInfo)
                }).catch((error) => {
                })

        if(EventosView)
            return NextResponse.json(EventosView)
        else
            return NextResponse.json({})
                
    } catch (error) {
        return NextResponse.json(EventosView)
    }
}
