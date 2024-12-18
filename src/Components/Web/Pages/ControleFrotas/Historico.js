import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { useLocation, useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ModalCadastroRotas from '../../Components/Modal/ModalCadastroRotas';
import ModalRotas from '../../Components/Modal/ModalRotas';
import Grid from '../../Components/Grid/Grid';
import { GET_ROTAS } from '../../../../api';
import CircleIcon from '@mui/icons-material/Circle';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import dayjs from 'dayjs';
import ModalPdfXlsx from '../../Components/Modal/ModalPdfXlsx';
import MapComponent from '../../Components/Maps/Teste';

const Historico = () => {
  const columns = [
    {
      field: 'cod_rota',
      headerName: 'CÓD ROTA',
      flex: 0.6,
      cellStyle: { textAlign: 'center' },
      headerClass: 'header-center',
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 0.4,
      cellRenderer: ({ data }) => {
        const statusConfig = (status) => {
          switch (status) {
            case 'Aprovado':
              return { color: '#03ef55', tooltip: 'Rota Aprovada' };
            case 'Reprovado':
              return { color: '#ff3d71', tooltip: 'Rota Reprovada' };
            default:
              return { color: '#ffc107', tooltip: 'Rota Não Verificada' };
          }
        };

        const { color, tooltip } = statusConfig(data.status);

        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Tooltip title={tooltip} arrow>
              <IconButton sx={{ color }}>
                <CircleIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: 'partida.data_hora',
      headerName: 'DATA INÍCIO',
      flex: 1,
      valueFormatter: (params) => {
        return dayjs(params.value).format('DD/MM/YYYY - HH:mm');
      },
    },
    { field: 'partida.cidade', headerName: 'CIDADE ORIGEM', flex: 1 },
    { field: 'partida.estado', headerName: 'UF', flex: 0.3 },
    {
      field: 'chegada.data_hora',
      headerName: 'DATA TÉRMINO',
      flex: 1,
      valueFormatter: (params) => {
        return dayjs(params.value).format('DD/MM/YYYY - HH:mm');
      },
    },
    { field: 'chegada.cidade', headerName: 'CIDADE DESTINO', flex: 1 },
    { field: 'chegada.estado', headerName: 'UF', flex: 0.3 },
    {
      field: 'tempo_gasto',
      headerName: 'TEMPO GASTO',
      flex: 1,
      valueGetter: (params) => {
        const inicio = dayjs(params.data.partida.data_hora);
        const chegada = dayjs(params.data.chegada.data_hora);
        return chegada.diff(inicio, 'minute');
      },
      valueFormatter: (params) => {
        const hours = Math.floor(params.value / 60);
        const minutes = params.value % 60;
        return `${hours}h ${minutes}m`;
      },
    },
    {
      field: 'rota',
      headerName: 'OBS ROTA',
      flex: 1,
      cellRenderer: ({ data }) => (
        <Button
          sx={{ border: '1px solid #FFAA00', width: '50%' }}
          onClick={() => {
            setSelectedRota({ ...data, veiculo });
            setOpenRotas(true);
          }}
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

  const location = useLocation();
  const veiculo = location.state?.veiculo;
  const gridRef = useRef(null);
  const [openRotas, setOpenRotas] = useState(false);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openRelatorio, setOpenRelatorio] = useState(false);
  const [openInfoRota, setOpenInfoRota] = useState(false);
  const [rows, setRows] = useState(false);
  const [selectedRota, setSelectedRota] = useState(null);
  console.log('🚀 - Historico - selectedRota:', selectedRota);
  const closeRotas = () => setOpenRotas(false);

  const handleClick = (e) => {
    setOpenCadastro(true);
  };

  const handleCloseModal = () => {
    setOpenCadastro(false);
  };
  const handleOpenRelatorio = (e) => {
    setOpenRelatorio(true);
  };

  const handleCloseRelatorio = () => {
    setOpenRelatorio(false);
  };
  const handleCloseInfoRota = () => {
    setOpenInfoRota(false);
  };

  const getRotas = async () => {
    const { url, options } = GET_ROTAS(veiculo.cod_veiculo);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setRows(json);
      } else {
        console.log('Erro ao buscar veículos');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    getRotas();
  }, []);

  const onRowClick = (event) => {
    console.log('aa');
    setSelectedRota(event.data);
    setOpenInfoRota(true);
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
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '50%',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            sx={{
              textTransform: 'none',
              color: '#3366FF',
              borderColor: '#3366FF',
              width: '35%',
              height: 40,
              '&:hover': {
                color: '#FFFFFF',
                border: '2px solid #FFFFFF',
              },
            }}
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleOpenRelatorio}
          >
            GERAR RELATÓRIO
          </Button>
          <Button
            sx={{
              textTransform: 'none',
              color: '#3366FF',
              borderColor: '#3366FF',
              width: '35%',
              height: 40,
              '&:hover': {
                color: '#FFFFFF',
                border: '2px solid #FFFFFF',
              },
            }}
            variant="outlined"
            startIcon={<AddRoadIcon />}
            onClick={handleClick}
          >
            CADASTRAR ROTA
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <ModalCadastroRotas
        open={openCadastro}
        close={handleCloseModal}
        getRotas={getRotas}
        veiculo={veiculo}
      />
      <Box sx={{ height: 670, width: '100%', color: 'white' }}>
        <Grid
          ref={gridRef}
          columns={columns}
          rows={rows}
          onRowClick={onRowClick}
        />
      </Box>
      {/* <MapComponent /> */}
      <ModalRotas
        open={openRotas}
        close={closeRotas}
        data={selectedRota}
        getRotas={getRotas}
      />
      <ModalPdfXlsx
        open={openRelatorio}
        close={handleCloseRelatorio}
        cod_veiculo={veiculo.cod_veiculo}
      />
    </>
  );
};

export default Historico;
