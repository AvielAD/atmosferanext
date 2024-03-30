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
            <div className="row w-100 h-100">
                <div className="">
                    <button className="btn btn-primary" onClick={() =>
                        setDataForm({
                            ...dataForm,
                            showModal: true
                        })}>
                        <i style={{ fontSize: "3rem" }} className="bi bi-camera"></i>
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default Page