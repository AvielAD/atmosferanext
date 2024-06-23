'use client'
import { createTicketDto, createTicketFormDto } from "@/DTOS/workline/tickets/ticket.dto";
import { Field, Form, Formik, FormikProps, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { object, string, number, date, InferType } from 'yup';

const addFetcher = async (url: string, data: createTicketDto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())

const Add = () => {
    const router = useRouter()
    const formTicket = {
        idcatticket: '',
        nombre: 'General'
    } as createTicketFormDto

    const submitAdd = async (values: createTicketFormDto) => {
        const newTicket = {
            idcatticket: parseInt(values.idcatticket),
            nombre: values.nombre
        } as createTicketDto

        addFetcher('/api/workline/tickets', newTicket).then((data) => {
            if (data.succeeded)
                router.push('/workline/tickets')
        })
    }

    return (<>
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 col-10">
                <div className="h1 text-center">Agregar Ticket</div>
                <Formik
                    initialValues={formTicket}
                    onSubmit={submitAdd}
                    validationSchema={addTicketSchema}
                >
                    {
                        (props: FormikProps<any>) => (
                            <Form>
                                <Field as="select" name="idcatticket" className="form-select">
                                    <option value="">Seleccionar Opcion...</option>
                                    <option value="1">Limitado</option>
                                    <option value="2">Ilimitado</option>
                                </Field>
                                <ErrorMessage name="idcatticket">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                <Field
                                    name="nombre"
                                    className="form-control mt-4"
                                ></Field>
                                <ErrorMessage name="nombre">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

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
    idcatticket: string().required('Campo Requerido'),
    nombre: string().required('Campo Requerido')
})

/**
 *         <h1 className="text-center">Iniciar Ticket</h1>
        <form onSubmit={onSubmitAdd} className="m-3">
            <label className="form-label">Seleccionar Modalidad</label>
            <select
                onChange={
                    (e: ChangeEvent<HTMLSelectElement>) =>
                        setFormTicket({
                            ...formTicket,
                            idcatticket: e.target.value
                        })
                }
                className="form-select" defaultValue={"DEFAULT"}>

                <option value={"DEFAULT"}> Seleccionar ...</option>
                <option value={"1"}> Paquete Limitado</option>
                <option value={"2"}> Paquete Ilimitado</option>

            </select>
            <label className="form-label">Nombre</label>
            <input
                className="form-control"
                type="text"
                value={formTicket.nombre}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormTicket({
                            ...formTicket,
                            nombre: e.target.value
                        })
                }

            />
            <button className="mt-5 btn btn-primary"
                type="submit"
            >Agregar</button>
        </form>
 */