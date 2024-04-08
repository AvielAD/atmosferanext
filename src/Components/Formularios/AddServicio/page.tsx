'use client'
import { addDataPropsFormDto, addDatadto, adddto } from "@/DTOS/formularios/form.dto";
import { servicioinputdto } from "@/DTOS/workline/servicios/servicio.dto";
import { createTicketDto, createTicketFormDto, servicedto } from "@/DTOS/workline/tickets/ticket.dto";
import { Field, Form, Formik, FormikProps, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { number, object, string } from 'yup';

const addFetcher = async (url: string, data: servicedto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())

const Add = (props: addDataPropsFormDto) => {
    const router = useRouter()
    const formTicket = {
        costo: '0',
        nombre: ''
    } as servicioinputdto

    const submitAdd = async (values: servicioinputdto) => {
        const newTicket = {
            costo: parseFloat(values.costo),
            nombre: values.nombre
        } as servicedto

        addFetcher('/api/workline/servicios', newTicket).then((data) => {
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

    return (<>
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 col-10">
                    <div className="h3 text-center">Agregar Servicio</div>
                    <Formik
                        initialValues={formTicket}
                        onSubmit={submitAdd}
                        validationSchema={addTicketSchema}
                    >
                        {
                            (props: FormikProps<any>) => (
                                <Form>
                                    <Field
                                        name="nombre"
                                        className="form-control mt-4"
                                    ></Field>
                                    <ErrorMessage name="nombre">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <Field
                                        name="costo"
                                        className="form-control mt-4"
                                    ></Field>
                                    <ErrorMessage name="costo">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="mt-5 btn btn-primary col-8">Agregar</button>
                                    </div>
                                </Form>
                            )
                        }

                    </Formik>
                </div>
            </div>
        </div>
    </>)
}

export default Add


const addTicketSchema = object({
    nombre: string().typeError('valor no permitido').required('Campo Requerido'),
    costo: number().min(1, 'Ingrese una cantidad').required('Campo Requerido')
})

