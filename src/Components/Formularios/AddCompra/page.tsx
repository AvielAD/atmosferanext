'use client'
import { addDataPropsFormDto, addDatadto, adddto } from "@/DTOS/formularios/form.dto";
import { ListServicios, ServicioCompraInputDto } from "@/DTOS/workline/caja/caja.dto";
import { serviciodto, servicioinputdto } from "@/DTOS/workline/servicios/servicio.dto";
import { createTicketDto, createTicketFormDto, servicedto } from "@/DTOS/workline/tickets/ticket.dto";
import { Field, Form, Formik, FormikProps, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { number, object, string } from 'yup';

const addFetcher = async (url: string, data: ListServicios) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
const fetcher = (url: string) => fetch(url).then(r => r.json())

const Add = (props: addDataPropsFormDto) => {
    let ArrayServicios = [] as Array<serviciodto>
    const { data: ServiciosData, error, mutate } = useSWR('/api/workline/servicios', fetcher)
    const [arrayServ, setArrayServ] = useState([] as Array<number>)

    const router = useRouter()
    const formTicket = {
        idservicio: '0',
    } as ServicioCompraInputDto

    const submitAdd = async (values: ServicioCompraInputDto) => {
        setArrayServ([...arrayServ, parseInt(values.idservicio)])

    }
    const AddCompra = async () =>{
            let newListServicios= {} as ListServicios
            newListServicios.servicios = arrayServ
            if(arrayServ.length>0)
            addFetcher('/api/workline/caja', newListServicios).then((data) => {
                props.close({
                    ...props.dataform,
                    serverresponse: {
                        message: data.message,
                        succeeded: data.succeeded
                    },
                    triggerToast: true,
                    showModal: false
                })
            })
    }

    if (ServiciosData) ArrayServicios = ServiciosData

    return (<>
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 col-10">
                    <div className="h3 text-center">Agregar Compra</div>
                    <Formik
                        initialValues={formTicket}
                        onSubmit={submitAdd}
                        validationSchema={addTicketSchema}
                    >
                        {
                            (props: FormikProps<any>) => (
                                <Form>
                                    <Field as="select" name="idservicio" className="form-select text-dark">
                                        <option value={0}>Seleccionar Equipo...</option>
                                        {
                                            ServiciosData?.map((item: serviciodto, index: number) => {
                                                return <option className="" key={index} value={item.id}>
                                                    <p className="text-end">{item.costo}</p>
                                                    <p>{item.nombre}</p>
                                                    </option>
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="idservicio">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="mt-5 btn btn-primary col-8">Agregar</button>
                                    </div>
                                </Form>
                            )
                        }

                    </Formik>
                    <div>
                        <p>Lista Productos</p>
                        {
                            arrayServ?.map((item, index) => {
                                return (<p key={index}>{ArrayServicios?.find(x => x.id == item)?.nombre}</p>)
                            })
                        }
                        <div className="row d-flex justify-content-center">
                            <button onClick={()=>AddCompra()} className="mt-5 btn btn-primary col-8">Agregar Compra</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Add


const addTicketSchema = object({
    idservicio: number().min(1, 'Ingrese una cantidad').required('Campo Requerido')
})

