'use client'
import { Curso } from "@/DTOS/curso.dto";
import { eventorequest } from "@/DTOS/eventos/eventoform";
import { instructor } from "@/DTOS/instructor/instructor.dto";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const addFetcher = async (url: string, data: eventorequest) => fetch(url, { method: "POST", body: JSON.stringify(data) }).then(r => r.json())
const getFetcher = async (url: string) => fetch(url, { method: "GET" }).then(r => r.json())

const Add = () => {
    const [dataCursos, setDataCursos] = useState<Array<Curso>>([])
    const [dataInstructores, setDataInstructores] = useState<Array<instructor>>([])
    const [dateStart, setDateStart] = useState<string>('')
    const router = useRouter()
    //agregar curso

    useEffect(() => {
        getFetcher('/api/curso').then((data) => {
            setDataCursos(data)
        })

        getFetcher('/api/instructor').then((data) => {
            setDataInstructores(data)
        })
    }, [])

    const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateRead = event.target.value + "T06:00:00.000Z"
        setDateStart(dateRead)
    }

    const onSubmitAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const idcurso= event.currentTarget.idcurso.value 
        const idinstructor= event.currentTarget.idinstructor.value 

        if(idcurso){
            const newEvent:eventorequest = {
                idcurso: parseInt(idcurso),
                idusuario: parseInt(idinstructor),
                fechainiciopromocion: dateStart,
                fechafinpromocion: dateStart,
                fechainicio: dateStart
            }
            addFetcher('/api/evento', newEvent).then((data)=>{
                console.log(data)
                if(data.succeded)
                    router.push('/eventos/evento')
            })
        }
    }
    console.log(dateStart)

    return (<>
    <h1 className="text-center">Agregar Evento</h1>
        <form onSubmit={onSubmitAdd} className="m-3">
            <label className="form-label">Seleccionar Curso</label>
            <select name="idcurso" className="form-select" defaultValue={"DEFAULT"}>
                <option value={"DEFAULT"}> Seleccionar ...</option>
                {
                    dataCursos.map((item: Curso, index: number) => {
                        return <option key={index} value={item.id.toString()}>{item.nombre}</option>
                    })
                }
            </select>
            <label className="form-label">Seleccionar Instructor</label>
            <select name="idinstructor" className="form-select" defaultValue={'DEFAULT'}>
                <option value={"DEFAULT"}> Seleccionar ...</option>
                {
                    dataInstructores.map((item: instructor, index: number) => {
                        return <option key={index} value={item.id.toString()}>{item.nombre}</option>
                    })
                }

            </select>
            <label className="form-label">Fecha Inicio</label>
                <input className="form-control" type="date" onChange={handleDate} value={dateStart.split('T')[0]} />
                <button className="mt-5 btn btn-primary"
                    type="submit"
                >Agregar</button>
        </form>
    </>)
}

export default Add