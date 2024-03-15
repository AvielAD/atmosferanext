'use client'
import { useState } from "react"
import ModalGeneral from '@/Components/ModalGeneral/page'
import QrScanner from '@/Components/QrScanner/page'

const Page = () => {
    const [data, setData] = useState('')
    const [modal, setModal] = useState(false)

    const qrscanner  = modal ? <QrScanner /> : null

    return (<>
        <ModalGeneral show={modal} close={() => setModal(false)} >
            {qrscanner}
        </ModalGeneral>
        <div>
            prueba dashboard workline

            <button onClick={()=>setModal(!modal)}>Iniciar Lector</button>
        </div>
    </>)
}

export default Page