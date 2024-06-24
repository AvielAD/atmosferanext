'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import AddServicio from '@/Components/Formularios/AddServicio/page'
import ModalGeneral from '@/Components/ModalGeneral/page'
import { response } from '@/DTOS/response/response'
import { addDatadto } from '@/DTOS/formularios/form.dto'
import Toast from '@/Components/Toast'
import { serviciodto } from '@/DTOS/workline/servicios/servicio.dto'

import { Box, Button, Fab, Grid, Icon, Modal, styled } from "@mui/material"
import { StyledTableCell, StyledTableRow } from "@/Utilities/TableHelpers/StyledTable"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add } from '@mui/icons-material'


const fetcher = (url: string) => fetch(url).then(r => r.json())

const Tickets = () => {
  const [dataForm, setDataForm] = useState({
    showModal: false,
    triggerToast: false,
    serverresponse: {} as response
  } as addDatadto)

  const { data: ServiciosData, error, mutate } = useSWR('/api/workline/servicios', fetcher)


  if (!ServiciosData) return <>loading...</>
  if (dataForm.triggerToast) mutate()
  return (<>

    <Grid container rowSpacing={2} >
      <Grid item xs={12}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: '48rem' }} >
            <Table stickyHeader>
              <TableHead sx={{ color: 'white' }}>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Producto</StyledTableCell>
                  <StyledTableCell>Costo $</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  ServiciosData?.map((item: serviciodto, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.nombre}</TableCell>
                        <TableCell>{item.costo}</TableCell>
                      </StyledTableRow>)
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>

    <Modal
      open={dataForm.showModal}
      onClose={() => setDataForm({ ...dataForm, showModal: false, triggerToast: true })}
    >
      <AddServicio dataform={dataForm} close={setDataForm}></AddServicio>
    </Modal>

    <Box display={"flex"} sx={{ position: "sticky", bottom: 16, right: 16}}>
      <Fab color='primary' onClick={() =>
        setDataForm({
          ...dataForm,
          showModal: true
        })}>
        <Add></Add>
      </Fab>
    </Box>

    <Box sx={{ position: "sticky", bottom: 16, right: 16, zIndex: 5 }}>
      <Toast show={dataForm.triggerToast}
        close={() => setDataForm({ ...dataForm, triggerToast: false })}
        serverresponse={dataForm.serverresponse}></Toast>
    </Box>


  </>)
}



export default Tickets