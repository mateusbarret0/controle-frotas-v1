import React, { useRef, useState } from 'react';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { useLocation, useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ModalCadastroRotas from '../../Components/Modal/ModalCadastroRotas';
import ModalRotas from '../../Components/Modal/ModalRotas';
import Grid from '../../Components/Grid/Grid';
import dayjs from 'dayjs';

const Historico = () => {
  const columns = [
    { field: 'codigo', headerName: 'CÓDIGO', flex: 1 },
    {
      field: 'dtinicio',
      headerName: 'DATA INÍCIO',
      flex: 1,
      valueFormatter: (params) => {
        return dayjs(params.value).format('DD/MM/YYYY');
      },
    },
    {
      field: 'dtfinal',
      headerName: 'DATA FINAL',
      flex: 1,
      valueFormatter: (params) => {
        return dayjs(params.value).format('DD/MM/YYYY');
      },
    },
    { field: 'horainicio', headerName: 'HORA INÍCIO', flex: 1 },
    { field: 'horafinal', headerName: 'HORA FINAL', flex: 1 },
    { field: 'tempo', headerName: 'TEMPO', flex: 1 },
    {
      field: 'rota',
      headerName: 'ROTA',
      flex: 1,
      cellRenderer: () => (
        <Button
          sx={{ border: '1px solid #FFAA00', width: '50%' }}
          onClick={() => setOpenRotas(true)}
        >
          <IconButton
            size="large"
            sx={{ p: 0, width: '100%', color: '#FFAA00' }}
          >
            <AltRouteIcon fontSize="small" />
          </IconButton>
        </Button>
      ),
    },
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
  ];

  const location = useLocation();
  const veiculo = location.state?.veiculo;
  const gridRef = useRef(null);
  const [openRotas, setOpenRotas] = useState(false);
  const [openCadastro, setOpenCadastro] = useState(false);
  const closeRotas = () => setOpenRotas(false);

  const handleClick = (e) => {
    setOpenCadastro(true);
  };

  const handleCloseModal = () => {
    setOpenCadastro(false);
  };
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography
          sx={{
            color: '#FFFFFF',
            textTransform: 'uppercase',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          {veiculo ? `${veiculo.modelo} / ${veiculo.placa}` : 'Veículo'}{' '}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, width: '50%' }}>
          <Button
            sx={{
              textTransform: 'none',
              color: '#3366FF',
              borderColor: '#3366FF',
              width: '30%',
              height: 40,
              '&:hover': {
                color: '#FFFFFF',
                border: '2px solid #FFFFFF',
              },
            }}
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            // onClick={handleClick}
          >
            GERAR RELATÓRIO
          </Button>
          <Button
            sx={{
              textTransform: 'none',
              color: '#3366FF',
              borderColor: '#3366FF',
              width: '30%',
              height: 40,
              '&:hover': {
                color: '#FFFFFF',
                border: '2px solid #FFFFFF',
              },
            }}
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleClick}
          >
            CADASTRAR ROTA
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <ModalCadastroRotas open={openCadastro} close={handleCloseModal} />
      <Box sx={{ height: 670, width: '100%', color: 'white' }}>
        <Grid ref={gridRef} columns={columns} rows={rows} />
      </Box>

      <ModalRotas open={openRotas} close={closeRotas} />
    </>
  );
};

export default Historico;
