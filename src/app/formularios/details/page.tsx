
import styles from './styles.module.scss'

const Details = () => {
    return (
        <>
            <div className={`w-100 ${styles.bgDetails}`}>
                <div className={`row w-75`}>
                    <div className='col'>
                        <div className=''>
                            <div className={`rounded ${styles.bgHeaderDetails}`}>20%</div>
                            <div>Promocion</div>
                        </div>
                    </div>
                    <div className='col'>
                        <div>
                            <div className={`rounded ${styles.bgHeaderDetails}`}>$4500</div>
                            <div>a solo $3600</div>
                        </div>
                    </div>
                    <div className='col'>
                        <div>
                            <div className={`rounded ${styles.bgHeaderDetails}`}>27</div>
                            <div>Finaliza</div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className={`rounded ${styles.bgHeaderDetails}`}>
                            <div>Inscribirme</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className={`${styles.bgSectionForm}`}>
                        <div>Curso profesional de diseño web</div>
                        <div>Presencial Programacion diseño</div>
                        <div>imagen</div>
                        <p>En este curso verás lo multifacetico en la creación de un sitio web: por un lado verás las técnicas básicas para planificar una web, organizar la información en wireframes, y crear una gramática visual con tipografía, paletas de colores, espaciados, composición, ilustración, UI & UX . Después te adentrarás a la construcción usando de manera profesional HTML, CSS, y JavaScript.</p>
                        <p>Aprenderás a escribir tu propio código y cambiarás tu forma de ver (y de diseñar) la web, entendiendo cómo funciona por dentro y por fuera, cómo diseñar una web responsive para que sea más efectiva. Y si el diseño no es lo tuyo, este curso puede suponer una buena base para comenzar en el mundo del Desarrollo Web Front-end.</p>
                        <div>
                            <div>$4500 16hrs de curso</div>
                            <div>Barra</div>
                            <div>20% de descuento liquidando antes del 1 de enero</div>
                            <div className={`rounded ${styles.bgHeaderDetails}`}>
                                <div>Inscribirme</div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.bgSectionForm}`}>
                        <div>Temario, Horarios, Inscripcion</div>
                    </div>


                    <div className={`${styles.bgSectionForm}`}>
                    <div>Temario, descripcion</div>
                        <div>Horarios</div>
                        <div>Inscripcion</div>

                    </div>
                </div>
                <div className='col'>
                    <div className={`${styles.bgSectionForm}`}>imagen atmosfera</div>
                    <div className={`${styles.bgSectionForm}`}>
                        <p>beneficios</p>
                        <div>Crea tu propia startup</div>
                        <div>duplica tus ingresos</div>
                        <div>iniciate en tecnologia</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details