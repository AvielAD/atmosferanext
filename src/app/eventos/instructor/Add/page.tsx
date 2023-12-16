'use client'
import { Curso } from "@/DTOS/curso.dto";
import { CursoForm } from "@/DTOS/cursos/cursoform";
import { instructor, instructorForm } from "@/DTOS/instructor/instructor.dto";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

const addFetcher = async (url: string, data:instructorForm) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())

const Add = () => {
    const router = useRouter()
    //agregar curso

    return (<>
        <Formik
            initialValues={initialValues}
            validate={validations}
            onSubmit={async (values, { resetForm }) => {
                const instructorInfo: instructorForm = { 
                    nombre: values.nombre,
                    apellido: values.apellido,
                    email: values.email,
                }
                addFetcher('/api/instructor', instructorInfo).then((data)=>{
                    console.log(data)
                })
                resetForm()
                router.push('/eventos/instructor')
            }}
        >
            {(props) =>
            (<div >
                <Form className="row gy-1 px-4">
                    <h1 >Agregar Curso</h1>

                    <Field
                        type="text"
                        name="nombre"
                        autoComplete="off"
                        placeholder="Nombre"
                        className="form-control"
                    ></Field>
                    <ErrorMessage
                        name='nombre'
                    >{message =>
                        <div className="text-danger">
                            {message}
                        </div>
                        }</ErrorMessage>
                    <Field
                        type="text"
                        name="apellido"
                        autoComplete="off"
                        placeholder="Apellido"
                        className="form-control"

                    ></Field>
                    <ErrorMessage
                        name='apellido'
                    >{message =>
                        <div className="text-danger">
                            {message}
                        </div>
                        }</ErrorMessage>

                    <Field
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Email"
                        className="form-control"
                    ></Field>
                    <ErrorMessage
                        name='email'
                    >{message =>
                        <div className="text-danger">
                            {message}
                        </div>
                        }</ErrorMessage>

                    <button className="mt-5 btn btn-primary"
                        type="submit"
                    >Agregar</button>
                </Form>
            </div>)

            }

        </Formik>
    </>)
}
const validations = (values: instructorForm) => {
    let errors = {} as instructorForm;

    if (!values.nombre) {
        errors.nombre = 'Campo Requerido'
    }
    if (!values.apellido) {
        errors.apellido = 'Campo Requerido'
    }
    if (!values.email) {
        errors.email = 'Campo Requerido'
    }
    return errors
}
const initialValues: instructorForm = {
    nombre: "",
    apellido: "",
    email: ""
}


export default Add