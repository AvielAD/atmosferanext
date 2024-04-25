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
        <div>
            <p>Text example</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit id quo, qui quidem magni itaque officia deserunt, aliquam minima perferendis voluptatem error magnam ipsam ad iusto rerum obcaecati. Eum.</p>
        </div>
        
    </>)
}

export default Page