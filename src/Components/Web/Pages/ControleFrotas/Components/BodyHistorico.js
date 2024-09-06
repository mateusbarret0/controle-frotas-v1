import React, { useRef, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Grid from '../../../Components/Grid/Grid';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ModalRotas from '../../../Components/Modal/ModalRotas';
import { useNavigate } from 'react-router-dom';

const BodyFrotas = () => {
  const columns = [
        { field: 'codigo', headerName: 'CÓDIGO', flex: 1 },
        { field: 'dtinicio', headerName: 'DATA INÍCIO', flex: 1 },
        { field: 'dtfinal', headerName: 'DATA FINAL', flex: 1 },
        { field: 'horainicio', headerName: 'HORA INÍCIO', flex: 1 },
        { field: 'horafinal', headerName: 'HORA FINAL', flex: 1 },
        { field: 'tempo', headerName: 'TEMPO', flex: 1 },
        { field: 'rota', headerName: 'ROTA',flex: 1, cellRenderer: () => (
        <Button sx={{ border: '1px solid #FFAA00', width: '50%' }}
        onClick={() => setOpenRotas(true)}
        >
          <IconButton
            size="large"
            sx={{ p: 0, width: '100%', color: '#FFAA00' }}
          >
            <AltRouteIcon fontSize="small" />
          </IconButton>
        </Button>
      ), },
  ];

  const rows = [
    {
      id: 1,
      codigo: '001',
      dtinicio: '01/09/2024',
      dtfinal: '05/09/2024',
      horainicio: '08:00',
      horafinal: '12:00',
      tempo: '4h',
      rota: 'Rota 1',
    },
    {
      id: 2,
      codigo: '002',
      dtinicio: '02/09/2024',
      dtfinal: '06/09/2024',
      horainicio: '09:00',
      horafinal: '13:00',
      tempo: '4h',
      rota: 'Rota 2',
    },
    {
      id: 3,
      codigo: '003',
      dtinicio: '03/09/2024',
      dtfinal: '07/09/2024',
      horainicio: '10:00',
      horafinal: '14:00',
      tempo: '4h',
      rota: 'Rota 3',
    },
    {
      id: 4,
      codigo: '004',
      dtinicio: '04/09/2024',
      dtfinal: '08/09/2024',
      horainicio: '11:00',
      horafinal: '15:00',
      tempo: '4h',
      rota: 'Rota 4',
    },
    {
      id: 5,
      codigo: '005',
      dtinicio: '05/09/2024',
      dtfinal: '09/09/2024',
      horainicio: '12:00',
      horafinal: '16:00',
      tempo: '4h',
      rota: 'Rota 5',
    },
    {
      id: 6,
      codigo: '006',
      dtinicio: '06/09/2024',
      dtfinal: '10/09/2024',
      horainicio: '13:00',
      horafinal: '17:00',
      tempo: '4h',
      rota: 'Rota 6',
    },
    {
      id: 7,
      codigo: '007',
      dtinicio: '07/09/2024',
      dtfinal: '11/09/2024',
      horainicio: '14:00',
      horafinal: '18:00',
      tempo: '4h',
      rota: 'Rota 7',
    },
    {
      id: 8,
      codigo: '008',
      dtinicio: '08/09/2024',
      dtfinal: '12/09/2024',
      horainicio: '15:00',
      horafinal: '19:00',
      tempo: '4h',
      rota: 'Rota 8',
    },
    {
      id: 9,
      codigo: '009',
      dtinicio: '09/09/2024',
      dtfinal: '13/09/2024',
      horainicio: '16:00',
      horafinal: '20:00',
      tempo: '4h',
      rota: 'Rota 9',
    },
    {
      id: 10,
      codigo: '010',
      dtinicio: '10/09/2024',
      dtfinal: '14/09/2024',
      horainicio: '17:00',
      horafinal: '21:00',
      tempo: '4h',
      rota: 'Rota 10',
    },
  ];

  const gridRef = useRef(null);

  const [openRotas, setOpenRotas] = useState(false);
  const closeRotas = () => setOpenRotas(false);

  return (
    <>
      <Box sx={{ height: 670, width: '100%', color: 'white' }}>
        <Grid ref={gridRef} columns={columns} rows={rows} />
      </Box>

      <ModalRotas open={openRotas} close={closeRotas} />
    </>
  );
};

export default BodyFrotas;
