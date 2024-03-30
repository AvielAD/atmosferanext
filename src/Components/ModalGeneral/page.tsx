import { dataFormsModalDto } from "@/DTOS/formularios/form.dto"
const Page = (props: dataFormsModalDto) => {
    return props.showModal ? (
        <>

            <div className={`${props.showModal ? 'd-block' : 'd-none'}`}>
                <div onClick={() => props.close()} style={{ height: '100vh', backgroundColor: 'rgba(128,128,128,0.5)' }}
                    className="w-100 z-1 position-absolute" >
                    <div className="d-flex h-75 justify-content-center align-items-center overflow-auto">
                        <div onClick={(e) => e.stopPropagation()} className="w-75 h-100 bg-primary rounded-3">
                            <div className="d-flex justify-content-center">
                                <div className="w-75">
                                    {props.children}

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    ) : null
}

export default Page