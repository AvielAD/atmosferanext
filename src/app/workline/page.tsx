'use client'
import { useState } from "react"
import ModalGeneral from '@/Components/ModalGeneral/page'
import QrScanner from '@/Components/QrScanner/page'
import { addDatadto } from "@/DTOS/formularios/form.dto"
import { response } from "@/DTOS/response/response"

const Page = () => {
    const [modal, setModal] = useState(false)
    const [dataForm, setDataForm] = useState({
        showModal: false,
        triggerToast: false,
        serverresponse: {} as response
    } as addDatadto)
    const qrscanner = dataForm.showModal ? <QrScanner /> : null

    return (<>
        <ModalGeneral showModal={dataForm.showModal} close={() => setDataForm({ ...dataForm, showModal: false, triggerToast: true })} >
            {qrscanner}
        </ModalGeneral>
        <div className="container fixed-bottom">
                    <button className="btn btn-primary" onClick={() =>
                        setDataForm({
                            ...dataForm,
                            showModal: true
                        })}>
                        <i style={{ fontSize: "2.5rem" }} className="bi bi-camera"></i>
                        <p>Cerrar Ticket</p>
                    </button>
        </div>
    </>)
}

export default Page