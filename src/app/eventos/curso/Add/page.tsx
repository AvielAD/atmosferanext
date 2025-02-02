'use client'
import { CursoDto } from "@/DTOS/curso.dto";
import { CursoForm } from "@/DTOS/cursos/cursoform";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

const addFetcher = async (url: string, data:CursoDto) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())

const Add = () => {
    const router = useRouter()
    //agregar curso

    return (<>
        <Formik
            initialValues={initialValues}
            validate={validations}
            onSubmit={async (values, { resetForm }) => {
                const cursoInfo: CursoDto = { 
                    id: 0,
                    nombre: values.nombre,
                    descripcion: values.descripcion,
                    temario: values.temario,
                    costo: parseFloat(values.costo)
                }
                addFetcher('/api/curso', cursoInfo).then((data)=>{
                    console.log(data)
                })
                resetForm()
                router.push('/eventos/curso')
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
                        name="descripcion"
                        autoComplete="off"
                        placeholder="Descripcion"
                        className="form-control"

                    ></Field>
                    <ErrorMessage
                        name='descripcion'
                    >{message =>
                        <div className="text-danger">
                            {message}
                        </div>
                        }</ErrorMessage>

                    <Field
                        type="text"
                        name="temario"
                        autoComplete="off"
                        placeholder="temario"
                        className="form-control"
                    ></Field>
                    <ErrorMessage
                        name='temario'
                    >{message =>
                        <div className="text-danger">
                            {message}
                        </div>
                        }</ErrorMessage>

                    <Field
                        type="text"
                        name="costo"
                        autoComplete="off"
                        placeholder="Costo"
                        className="form-control"

                    ></Field>
                    <ErrorMessage
                        name='costo'
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
const validations = (values: CursoForm) => {
    let errors = {} as CursoForm;

    if (!values.nombre) {
        errors.nombre = 'Campo Requerido'
    }
    if (!values.descripcion) {
        errors.descripcion = 'Campo Requerido'
    }
    if (!values.temario) {
        errors.temario = 'Campo Requerido'
    }
    if (!values.costo) {
        errors.costo = 'Campo Requerido'
    }
    return errors
}
const initialValues: CursoForm = {
    nombre: "",
    descripcion: "",
    temario: "",
    costo: ""
}


export default Add