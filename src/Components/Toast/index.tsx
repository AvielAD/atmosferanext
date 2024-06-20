'use client'
import { toastdatapropsdto } from "@/DTOS/toast/toast"
import { Alert } from "@mui/material"
import { useEffect } from "react"
const Index = (props: toastdatapropsdto) => {

    useEffect(() => {
        if (props.show) {
            const toast = setInterval(() => {
                props.close()
            }, 3000)
            return () => clearInterval(toast)

        }

    })
    return Object.keys(props.serverresponse).length > 0 ? (<>
        <div className={`z-2 position-absolute bottom-0 end-0 ${props.show ? '' : 'visually-hidden'}`}>
            <Alert severity={`${props.serverresponse.succeeded ? 'success' : 'error'}`}>
                {props.serverresponse.message}
            </Alert>
        </div>
    </>) : null
}


export default Index