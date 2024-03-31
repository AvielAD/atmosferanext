'use client'
import { addDataPropsFormDto, adddto } from "@/DTOS/formularios/form.dto";
import { codigosdescuentoformdto, codigosdescuentoinputdto } from "@/DTOS/workline/codigos/codigos.dto";
import { Field, Form, Formik, FormikProps, ErrorMessage, FieldProps } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { date, number, object, string } from 'yup';

const addFetcher = async (url: string, data: codigosdescuentoinputdto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())

const Add = (props: addDataPropsFormDto) => {
    const router = useRouter()
    const formTicket = {
        nombre: '',
        descripcion: '',
        fechavigencia: '',
        replicas: '1',
        idcatcodigo: '',
        descuento: ''
    } as codigosdescuentoformdto

    const submitAdd = async (values: codigosdescuentoformdto) => {
        if (values.idcatcodigo == "1") {
            const newCodigo = {
                idcatcodigo: parseInt(values.idcatcodigo),
                nombre: values.nombre,
                descripcion: values.descripcion,
                fechavigencia: new Date(values.fechavigencia),
                replicas: parseInt(values.replicas),
                descuento: parseFloat(values.descuento)
            } as codigosdescuentoinputdto

            addFetcher('/api/workline/codigos/normal', newCodigo).then((data) => {
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
        else if (values.idcatcodigo == "2") {
            const newCodigo = {
                idcatcodigo: parseInt(values.idcatcodigo),
                nombre: values.nombre,
                replicas: parseInt(values.idcatcodigo),
                descripcion: values.descripcion,
                fechavigencia: new Date(values.fechavigencia),
                descuento: parseFloat(values.descuento)
            } as codigosdescuentoinputdto

            addFetcher('/api/workline/codigos/daypass', newCodigo).then((data) => {
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

    }

    return (<>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 col-10">
                    <div className="h4 text-center">Agregar Codigo</div>
                    <Formik
                        initialValues={formTicket}
                        onSubmit={submitAdd}
                        validationSchema={addTicketSchema}
                    >
                        {
                            (props: FormikProps<any>) => (
                                <Form>
                                    <label className="w-100">
                                        Categoria Codigo
                                        <Field as="select" name="idcatcodigo" className="form-select">
                                            <option value="">Seleccionar Opcion...</option>
                                            <option value="1">Normal</option>
                                            <option value="2">Day Pass</option>
                                        </Field>
                                        <ErrorMessage name="idcatcodigo">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    </label>
                                    <label className="w-100">
                                        Nombre:
                                        <Field
                                            name="nombre"
                                            className="form-control"
                                        ></Field>
                                        <ErrorMessage name="nombre">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    </label>

                                    <label className="w-100">
                                        Descripcion:
                                        <Field
                                            name="descripcion"
                                            className="form-control"
                                            as="textarea"
                                            rows={3}

                                        ></Field>
                                        <ErrorMessage name="descripcion">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    </label>

                                    <Field
                                        name="fechavigencia"
                                        className="form-control"
                                        component={customDate}
                                        label="Vencimiento"
                                    ></Field>
                                    <ErrorMessage name="fechavigencia">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    <label className={`w-100`}>
                                        Replicas:
                                        <Field
                                            name="replicas"
                                            className="form-control"
                                            disabled={props.values.idcatcodigo === "2"}

                                        ></Field>
                                        <ErrorMessage name="replicas">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>

                                    </label>

                                    <label className="w-100">
                                        Valor Descuento %
                                        <Field
                                            name="descuento"
                                            className="form-control"
                                        ></Field>
                                        <ErrorMessage name="descuento">{(msg) => (<div className="text-danger text-center">{msg}</div>)}</ErrorMessage>
                                    </label>

                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="btn btn-secondary col-8">Agregar</button>
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
const today = new Date()
today.setHours(0,0,0,0)

const addTicketSchema = object({
    nombre: string().required('Campo Requerido'),
    descripcion: string().required('Campo Requerido'),
    fechavigencia: date().min(today, 'Fecha vencimiento expirada').required('Campo Requerido'),
    replicas: number().min(1, 'Minimo instancias').typeError('valor no permitido').required('Campo Requerido'),
    descuento: number().min(1, 'El valor no puede ser negativo').typeError('valor no permitido').required('Campo Requerido'),
    idcatcodigo: number().min(1, 'Seleccione una Opcion').typeError('Seleccione una Opcion').required('Seleccione una opcion'),
})

const customDate = (props: FieldProps) => (
    <div className="w-100">
        <label className="w-100">
            Vencimiento
            <input className="form-control" type="date" {...props.field} />
        </label>
    </div>
)

const customArea = (props: FieldProps) => {
    <div>
        <textarea name="" id="" cols={30} rows={10}></textarea>
    </div>
}