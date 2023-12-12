'use client'
import { codigodescuento, codigodescuentoform } from "@/DTOS/codigo/codigo.dto";
import { Curso } from "@/DTOS/curso.dto";
import { CursoForm } from "@/DTOS/cursos/cursoform";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

const addFetcher = async (url: string, data:codigodescuento) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())

const Add = () => {
    const router = useRouter()
    //agregar curso

    return (<>
        <Formik
            initialValues={initialValues}
            validate={validations}
            onSubmit={async (values, { resetForm }) => {
                const cursoInfo: codigodescuento = { 
                    nombre: values.nombre,
                    codigo: values.codigo,
                    descuento: parseFloat(values.descuento),
                }
                addFetcher('/api/codigo', cursoInfo).then((data)=>{
                    console.log(data)
                })
                resetForm()
                router.push('/eventos/codigodescuento')
            }}
        >
            {(props) =>
            (<div >
                <Form className="row gy-1 px-4">
                    <h1 >Agregar Código Descuento</h1>

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
                        name="codigo"
                        autoComplete="off"
                        placeholder="Código"
                        className="form-control"

                    ></Field>
                    <ErrorMessage
                        name='codigo'
                    >{message =>
                        <div className="text-danger">
                            {message}
                        </div>
                        }</ErrorMessage>

                    <Field
                        type="text"
                        name="descuento"
                        autoComplete="off"
                        placeholder="Descuento"
                        className="form-control"
                    ></Field>
                    <ErrorMessage
                        name='descuento'
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
const validations = (values: codigodescuentoform) => {
    let errors = {} as codigodescuentoform;

    if (!values.nombre) {
        errors.nombre = 'Campo Requerido'
    }
    if (!values.codigo) {
        errors.codigo = 'Campo Requerido'
    }
    if (!values.descuento) {
        errors.descuento = 'Campo Requerido'
    }
    return errors
}
const initialValues: codigodescuentoform = {
    nombre: "",
    codigo: "",
    descuento: "",
}


export default Add