import { Box, Modal, Typography } from "@mui/material"
import { ModalUi } from "./modal.dto"

const Index = (props: ModalUi)=>{
    return(
        <>
            <Modal 
                open={props.showModal}
                onClose={()=>props.close()}
            >
                <Box>
                    <Typography>
                        Text in modal
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}