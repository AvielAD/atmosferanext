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
        <div style={{ height: "100vh" }} className="container">
            <div className="row w-100 h-100">
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary" onClick={() => setModal(!modal)}>
                        <i style={{ fontSize: "3rem" }} className="bi bi-camera"></i>
                    </button>

                </div>

            </div>


        </div>
    </>)
}

export default Page