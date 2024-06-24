'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ticketdto } from '@/DTOS/workline/tickets/ticket.dto'
import AddTicket from '@/Components/Formularios/AddTicket/page'
import AddCompra from '@/Components/Formularios/AddCompra/page'
import ModalGeneral from '@/Components/ModalGeneral/page'
import Toast from '@/Components/Toast/index'
import { addDatadto } from '@/DTOS/formularios/form.dto'
import { response } from '@/DTOS/response/response'
import { Alert, Box, Button, Grid, Modal, Typography } from '@mui/material'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '@/Utilities/TableHelpers/StyledTable'

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { LocalActivity, MonetizationOn } from '@mui/icons-material'

const fetcher = (url: string) => fetch(url).then(r => r.json())
const actions = [
  { icon: <LocalActivity />, name: 'Ticket' },
  { icon: <MonetizationOn />, name: 'Venta' },
];

const Tickets = () => {
  const router = useRouter()
  const { data, error, mutate } = useSWR('/api/workline/tickets', fetcher)

  const [dataForm, setDataForm] = useState({
    showModal: false,
    triggerToast: false,
    serverresponse: {} as response
  } as addDatadto)

  const [dataForm2, setDataForm2] = useState({
    showModal: false,
    triggerToast: false,
    serverresponse: {} as response
  } as addDatadto)
  if (!data) return <>loading...</>
  if (dataForm.triggerToast) mutate()
  if (dataForm2.triggerToast) mutate()

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '35rem' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Ticket</StyledTableCell>
                    <StyledTableCell >Tipo</StyledTableCell>
                    <StyledTableCell >Acciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data?.map((item: ticketdto, index: number) => {
                      return (
                        <StyledTableRow key={item.id}>
                          <StyledTableCell>{item.nombre}</StyledTableCell>
                          <StyledTableCell>{item.category.nombre}</StyledTableCell>
                          <StyledTableCell className='d-flex justify-content-evenly'>
                            <i onClick={
                              () => router.push(`/workline/tickets/Details/${item.uuid}`)

                            } className='bi bi-eye w-50'></i>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    })

                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Box display={"flex"} sx={{ position: "sticky", bottom: 16, right: 16, zIndex: 5 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<LocalActivity />}
            tooltipTitle={"Ticket"}
            onClick={() =>
              setDataForm({
                ...dataForm,
                showModal: true
              })}
          />
          <SpeedDialAction
            icon={<MonetizationOn />}
            tooltipTitle={"Venta"}
            onClick={() =>
              setDataForm2({
                ...dataForm2,
                showModal: true
              })}
          />
        </SpeedDial>
      </Box>

      <Modal
        open={dataForm.showModal}
        onClose={() => setDataForm({ ...dataForm, showModal: false })}>
        <Box>
          <AddTicket dataform={dataForm} close={setDataForm}></AddTicket>
        </Box>
      </Modal>

      <Modal
        open={dataForm2.showModal}
        onClose={() => setDataForm2({ ...dataForm2, showModal: false })}>
        <Box>
          <AddCompra dataform={dataForm2} close={setDataForm2}></AddCompra>

        </Box>
      </Modal>
      <Box sx={{ position: "sticky", bottom: 16, right: 16 }}>
        <Toast show={dataForm.triggerToast}
          close={() => setDataForm({ ...dataForm, triggerToast: false })}
          serverresponse={dataForm.serverresponse}></Toast>
      </Box>
      <Box sx={{ position: "sticky", bottom: 16, right: 16 }}>
        <Toast show={dataForm2.triggerToast}
          close={() => setDataForm2({ ...dataForm2, triggerToast: false })}
          serverresponse={dataForm2.serverresponse}></Toast>
      </Box>

    </>)
}



export default Tickets