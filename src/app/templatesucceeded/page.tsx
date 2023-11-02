import styles from './styles.module.scss'

const TemplateSucceeded=()=>{
    return (
        <>
            <div className={styles.containerSucceded}>
                <div className={styles.containerContentSucceeded}>
                    <h1>Registro Exitoso</h1>
                    <p>Recibira un correo con las intrucciones de pago</p>
                </div>
            </div>
        </>
    )
}

export default TemplateSucceeded