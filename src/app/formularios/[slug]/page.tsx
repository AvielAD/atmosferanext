'use client'
import axios from 'axios';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { eventosview } from '@/DTOS/eventos/eventos';

const instanceAxios = axios.create({
    baseURL: 'https://atmosferaform.localfix.mx',
})

const FormularioDynamic = ({ params }: { params: { slug: string } }) => {
    const [dataEvento, setDataEvento] = useState<eventosview>({} as eventosview)

    const router = useRouter()

    useEffect(() => {
        //if (params.slug)
        const fetchData = () => {
            instanceAxios.get('/inscripcion/inscritobyid', {
                params: {
                    id: params.slug
                }
            }).then((response) => {
                setDataEvento(response.data)
            }).catch(error => {

            })
        }
        fetchData()
    }, [params.slug])

    if (!dataEvento) return <>loading....</>

    return (
        <>

            <div className={styles.containerFormComponent}>
                <Formik
                    initialValues={initialValues}
                    validate={validations}
                    onSubmit={(values, { resetForm }) => {
                        values.ideventocurso = params.slug
                        values.codigodescuento = values.codigodescuento === "" ? null : values.codigodescuento;

                        instanceAxios.post('/formularios/inscribir', values)
                            .then((response: any) => {
                                router.push('/templatesucceeded')
                            })
                            .catch((error) => {
                                console.log(error)
                                alert(error.response.data.message)
                            })
                    }}
                >
                    {(props) =>
                    (<div className={styles.containerContentFormComponent}>
                        <Form className={styles.FormStyles}>
                            
                            <h1 className={styles.FormStyleTitle}>Curso | {dataEvento.curso}</h1>

                            <Field
                                type="text"
                                name="email"
                                autoComplete="off"
                                placeholder="Email"
                                className={styles.FormStyleField}

                            ></Field>
                            <ErrorMessage
                                name='email'
                            >{message =>
                                <div className={styles.FormStyleErrorMessage}>
                                    {message}
                                </div>
                                }</ErrorMessage>
                            <Field
                                type="text"
                                name="nombre"
                                autoComplete="off"
                                placeholder="Nombre"
                                className={styles.FormStyleField}
                            ></Field>
                            <ErrorMessage
                                name='nombre'
                            >{message =>
                                <div className={styles.FormStyleErrorMessage}>
                                    {message}
                                </div>
                                }</ErrorMessage>


                            <Field
                                type="text"
                                name="apellidop"
                                autoComplete="off"
                                placeholder="Apellido"
                                className={styles.FormStyleField}
                            ></Field>
                            <ErrorMessage
                                name='apellidop'
                            >{message =>
                                <div className={styles.FormStyleErrorMessage}>
                                    {message}
                                </div>
                                }</ErrorMessage>

                            <Field
                                type="text"
                                name="apellidom"
                                autoComplete="off"
                                placeholder="Apellido 2"
                                className={styles.FormStyleField}
                            ></Field>


                            <Field
                                type="text"
                                name="codigodescuento"
                                autoComplete="off"
                                placeholder="Codigo de Descuento"
                                className={styles.FormStyleField}
                            ></Field>
                            <button
                                type="submit"
                                className={styles.FormStyleButton}
                            >Inscribirme</button>
                        </Form>
                    </div>)

                    }

                </Formik>
            </div>
        </>
    )
}

const validations = (values: FormularioAtmos) => {
    let errors = {} as FormularioAtmos;

    if (!values.nombre) {
        errors.nombre = 'Campo Requerido'
    }
    if (!values.email) {
        errors.email = 'Campo Requerido'
    }
    if (!values.apellidop) {
        errors.apellidop = 'Campo Requerido'
    }
    const validationEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!validationEmail.test(values.email.toString()))
        errors.email = 'Correo electronico no valido';

    return errors
}
const initialValues: FormularioAtmos = {
    nombre: "",
    email: "",
    apellidop: "",
    apellidom: "",
    ideventocurso: "",
    codigodescuento: ""
}

export default FormularioDynamic