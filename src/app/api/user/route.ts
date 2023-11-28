import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET (){
    const cookiesTest = cookies().getAll()
    console.log(JSON.stringify(cookiesTest))

    return NextResponse.json({message: "Completado"})
    //return Response.json({message: "Completado"})
}
