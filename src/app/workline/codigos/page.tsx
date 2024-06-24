'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import AddCodigo from '@/Components/Formularios/AddCodigo/page'
import ModalGeneral from '@/Components/ModalGeneral/page'
import { codigosdescuentodto } from '@/DTOS/workline/codigos/codigos.dto'
import { DateTime } from 'luxon'
import QrPrint from '@/Components/TicketsPrint/QrTicketPrint/page'
import ReactToPrint from 'react-to-print'
import { response } from '@/DTOS/response/response'
import { addDatadto } from '@/DTOS/formularios/form.dto'
import Toast from '@/Components/Toast'

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
import { FormatDateMed, FormatDateNotIso } from "@/Utilities/DateTimeHelpers/DateFormat"

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Tickets = () => {
  const router = useRouter()
  const [dataForm, setDataForm] = useState({
    showModal: false,
    triggerToast: false,
    serverresponse: {} as response
  } as addDatadto)
  //const componentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<(HTMLDivElement | null)[]>([]);
  const componentClickRef = useRef<(HTMLButtonElement | null)[]>([]);

  const { data, error, mutate } = useSWR('/api/workline/codigos', fetcher)

  const printTicket = (index: number) => {
    if (componentRef.current) {
      componentRef.current[index]?.click()
    }
  }

  if (!data) return <>loading...</>
  if (dataForm.triggerToast) mutate()

    console.log(data)
  return (<>


    <Grid container rowSpacing={2} >
      <Grid item xs={12}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: '48rem' }} >
            <Table stickyHeader>
              <TableHead sx={{ color: 'white' }}>
                <TableRow>
                  <StyledTableCell>Codigo</StyledTableCell>
                  <StyledTableCell>Vencimiento</StyledTableCell>
                  <StyledTableCell>Descuento</StyledTableCell>
                  <StyledTableCell>QR</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data?.map((item: codigosdescuentodto, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <TableCell>{item.nombre}</TableCell>
                        <TableCell>{FormatDateNotIso(item.fechavigencia)}</TableCell>
                        <TableCell>{item.descuento}</TableCell>
                        <TableCell>
                          <ReactToPrint key={index + 100}
                            trigger={() => <button className='btn btn-primary' name={"button: " + index} ref={(el) => componentClickRef.current[index] = el}> <i className='bi bi-qr-code'></i> </button>}
                            content={() => componentRef.current[index]}
                          />
                        </TableCell>
                        <TableCell sx={{ display: 'none' }}>
                          <QrPrint subject='Codigo de Descuento' ref={(el) => { componentRef.current[index] = el }} uuidqr={item.uuidkey}></QrPrint>
                        </TableCell>

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
      <AddCodigo dataform={dataForm} close={setDataForm}></AddCodigo>
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