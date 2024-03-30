'use client'
import { toastdatapropsdto } from "@/DTOS/toast/toast"
import { useEffect } from "react"
const Index = (props: toastdatapropsdto) => {

    useEffect(() => {
        if (props.show) {
            const toast = setInterval(() => {
                props.close()
            }, 3000)
            return () => clearInterval(toast)

        }

    }, [props.show])
    return Object.keys(props.serverresponse).length > 0 ? (<>
        <div className={`z-2 position-absolute bottom-0 end-50 ${props.show ? '' : 'visually-hidden'}`}>
            <div className="2">
                <div className=''>
                    <div
                        style={{ width: '100%', height: '100%', padding: '0.2rem' }}
                        className={`${props.serverresponse.succeeded ? 'bg-success' : 'bg-danger'} 
                        text-white border rounded-5`}>
                        <div className="d-flex justify-content-center align-items-center p-1">
                            <div className="text-white">
                                {props.serverresponse.message}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>) : null
}

export default Index