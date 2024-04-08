'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import {  useRef, useState } from 'react'
import AddServicio from '@/Components/Formularios/AddServicio/page'
import ModalGeneral from '@/Components/ModalGeneral/page'
import { response } from '@/DTOS/response/response'
import { addDatadto } from '@/DTOS/formularios/form.dto'
import Toast from '@/Components/Toast'
import { serviciodto } from '@/DTOS/workline/servicios/servicio.dto'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Tickets = () => {
  const [dataForm, setDataForm] = useState({
    showModal: false,
    triggerToast: false,
    serverresponse: {} as response
  } as addDatadto)

  const { data:ServiciosData, error, mutate } = useSWR('/api/workline/servicios', fetcher)


  if (!ServiciosData) return <>loading...</>
  if(dataForm.triggerToast) mutate()
  return (<>
    <h1 className='text-center'>Servicios Workline</h1>

    <ModalGeneral showModal={dataForm.showModal} close={()=>setDataForm({...dataForm, showModal: false, triggerToast: true})} >
      <AddServicio dataform={dataForm} close={setDataForm}></AddServicio>
    </ModalGeneral>

    <div style={{ height: "80vh" }} className='container overflow-scroll'>

      <div className='row'>
        <table className="table w-100">
          <thead >
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Costo</th>
            </tr>
          </thead>
          <tbody>
            {
              ServiciosData?.map((item: serviciodto, index: number) => {
                return (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.costo}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>

    </div>
    <div className='container fixed-bottom'>
      <button className='btn btn-primary' onClick={() =>
          setDataForm({
            ...dataForm,
            showModal: true
          })}>
        <i style={{ fontSize: "3rem" }} className='bi bi-plus-circle'
        ></i>

      </button>

      <Toast show={dataForm.triggerToast}
        close={()=>setDataForm({...dataForm,triggerToast: false})}
        serverresponse={dataForm.serverresponse}></Toast>

    </div>

  </>)
}



export default Tickets