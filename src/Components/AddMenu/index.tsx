import { AddMenuDto } from "@/DTOS/menuNav/addmenu"
import { Fab } from "@mui/material"
import { useRouter } from "next/navigation"
import { Add } from "@mui/icons-material"

const AddMenu=(addMenu: AddMenuDto)=>{
    const router = useRouter()

    const clickMenu =()=>{
        router.push(addMenu.url)
    }
    return (
        <>
            <div className="float-end">
                <i onClick={()=>{ clickMenu() }} className="bi bi-plus-circle" style={{fontSize: "4rem"}}></i>
            </div>
        
            <Fab color="primary" aria-label="add">
                <Add ></Add>
            </Fab>
        </>
    )
}

export default AddMenu