'use client'
import { useState } from "react"
import ModalGeneral from '@/Components/ModalGeneral/page'
import QrScanner from '@/Components/QrScanner/page'

const Page = () => {
    const [data, setData] = useState('')
    const [modal, setModal] = useState(false)

    const qrscanner = modal ? <QrScanner /> : null

    return (<>
        <ModalGeneral show={modal} close={() => setModal(false)} >
            {qrscanner}
        </ModalGeneral>
        <div className="container fixed-bottom">
            <div className="row w-100 h-100">
                <div className="">
                    <button className="btn btn-primary" onClick={() => setModal(!modal)}>
                        <i style={{ fontSize: "3rem" }} className="bi bi-camera"></i>
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default Page