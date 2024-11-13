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

const Historico = () => {
  const columns = [
    { field: 'ID', headerName: 'CÓDIGO', flex: 0.5 },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 0.5,
      cellRenderer: ({ data }) => {
        const iconColor = data.status === 'ativo' ? '#03ef55' : '#ff3d71';
        const tooltipText =
          data.status === 'ativo' ? 'Usuário Ativo' : 'Usuário Inativo';

        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Tooltip title={tooltipText} arrow>
              <IconButton sx={{ color: iconColor }}>
                <CircleIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    { field: 'RUA_PARTIDA', headerName: 'RUA PARTIDA', flex: 1 },
    { field: 'NUMERO_PARTIDA', headerName: 'NÚMERO PARTIDA', flex: 1 },
    { field: 'CIDADE_PARTIDA', headerName: 'CIDADE PARTIDA', flex: 1 },
    { field: 'ESTADO_PARTIDA', headerName: 'UF', flex: 0.3 },
    { field: 'RUA_CHEGADA', headerName: 'RUA CHEGADA', flex: 1 },
    { field: 'NUMERO_CHEGADA', headerName: 'NÚMERO CHEGADA', flex: 1 },
    { field: 'CIDADE_CHEGADA', headerName: 'CIDADE CHEGADA', flex: 1 },
    { field: 'ESTADO_CHEGADA', headerName: 'UF', flex: 0.3 },
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

  const location = useLocation();
  const veiculo = location.state?.veiculo;
  const gridRef = useRef(null);
  const [openRotas, setOpenRotas] = useState(false);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [rows, setRows] = useState(false);
  const closeRotas = () => setOpenRotas(false);

  const handleClick = (e) => {
    setOpenCadastro(true);
  };

  const handleCloseModal = () => {
    setOpenCadastro(false);
  };

  const getRotas = async () => {
    const { url, options } = GET_ROTAS();
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setRows(json);
        console.log('🚀 ~ BodyFrotas ~ rows:', rows);
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
            // onClick={handleClick}
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
      />
      <Box sx={{ height: 670, width: '100%', color: 'white' }}>
        <Grid ref={gridRef} columns={columns} rows={rows} />
      </Box>

      <ModalRotas open={openRotas} close={closeRotas} />
    </>
  );
};

export default Historico;
