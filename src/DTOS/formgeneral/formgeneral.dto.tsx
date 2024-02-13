interface DataFormDto {
    titulo: string,
    parrafo1: string,
    parrafo2: string,
    costoTotal: string,
    horasCurso: string,
    bonoTiempo: string,
    Temario: {
        titulo: string,
        parrafo1: string,
        listTemas: Array<string>
    },
    Horario: {
        inicioCurso: string,
        horario: string,
        lugar: string,
        costo: string,
        modalidad: string
    },
    Inscripcion: {
        titulo: string,
        parrafo1: string,
        list: Array<string>,
        parrafo2: string
    }

}