import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Divider, IconButton, TextField } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Grid from '../../../Components/Grid/Grid';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModalEditVeiculo from '../../../Components/Modal/ModalEditVeiculo';
import ModalQrCode from '../../../Components/Modal/ModalQrCode';
import ModalDeleteVeiculo from '../../../Components/Modal/ModalDeleteVeiculo';
import { useNavigate } from 'react-router-dom';
import { GET_VEICULOS } from '../../../../../api';
import HeaderFrotas from './HeaderFrotas';
import ModalCadastroVeiculo from '../../../Components/Modal/ModalCadastroVeiculo';
import ModalCreateRotas from '../../../Components/Modal/ModalCreateRotas';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
const BodyFrotas = () => {
  const columns = [
    { field: 'modelo', headerName: 'MODELO', flex: 1 },
    { field: 'placa', headerName: 'PLACA', flex: 1 },
    { field: 'capacidade', headerName: 'CAPACIDADE', flex: 1 },
    { field: 'dt_ultim_manu', headerName: 'MANUTENÇÃO', flex: 1 },
    // {
    //   field: 'rota',
    //   headerName: 'ROTAS', flex: 1,
    //   cellRenderer: ({ data }) => (
    //     <Button sx={{ border: '1px solid #23f6bb', width: '50%' }} onClick={() => { setCreateRotas(true); setSelectedRow(data); }}>
    //       <IconButton size="large" sx={{ p: 0, width: '100%', color: '#23f6bb' }}>
    //         <MapIcon fontSize="small" />
    //       </IconButton>
    //     </Button>
    //   ),
    // },
    {
      field: 'histórico',
      headerName: 'HISTÓRICO', flex: 1,
      cellRenderer: ({ data }) => (
        <Button sx={{ border: '1px solid #00FF57', width: '50%' }} onClick={() => navigate('/historico')}>
          <IconButton size="large" sx={{ p: 0, width: '100%', color: '#00FF57' }}>
            <HistoryOutlinedIcon fontSize="small" />
          </IconButton>
        </Button>
      ),
    },
    {
      field: 'qrCode',
      headerName: 'QR CODE', flex: 1,
      cellRenderer: ({ data }) => (
        <Button sx={{ border: '1px solid #ffff', width: '50%' }} onClick={() => { setQr(true); setSelectedRow(data); }}>
          <IconButton size="large" sx={{ p: 0, width: '100%', color: '#ffff' }}>
            <QrCodeScannerOutlinedIcon fontSize="small" />
          </IconButton>
        </Button>
      ),
    },
    {
      field: 'editar',
      headerName: 'EDITAR', flex: 1,
      cellRenderer: ({ data }) => (
        <Button sx={{ border: '1px solid #FFAA00', width: '50%' }} onClick={() => { setOpenEdit(true); setSelectedRow(data); }}>
          <IconButton size="large" sx={{ p: 0, width: '100%', color: '#FFAA00' }}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Button>
      ),
    },
    {
      field: 'apagar',
      headerName: 'APAGAR', flex: 1,
      cellRenderer: ({ data }) => (
        <Button sx={{ border: '1px solid #FF3D71', width: '50%' }} onClick={() => { setDelete(true); setSelectedRow(data); }}>
          <IconButton size="large" sx={{ p: 0, width: '100%', color: '#FF3D71' }}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Button>
      ),
    },
  ];

  const gridRef = useRef(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openQr, setQr] = useState(false);
  const [openDelete, setDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const closeEdit = () => setOpenEdit(false);
  const closeQr = () => setQr(false);
  const closeDelete = () => setDelete(false);
  // const closeCreateRotas = () => setCreateRotas(false);
  
  const navigate = useNavigate();
  
  const getVeiculos = async () => {
    const { url, options } = GET_VEICULOS();
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setRows(json);
        console.log("🚀 ~ BodyFrotas ~ rows:", rows)
      } else {
        console.log('Erro ao buscar veículos');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    getVeiculos();
  }, []);

  const [openCadastro, setOpenCadastro] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = () => {
    setOpenCadastro(true);
  };

  const handleCloseModal = () => {
    setOpenCadastro(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  return (
    <>
      {/* <HeaderFrotas getVeiculos={getVeiculos} /> */}
      
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <TextField
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#FFFFFF', fontSize: '15px' }}>
              <SearchIcon sx={{ marginRight: 1 }} />
              Insira o modelo, a placa ou o motorista do veículo.
            </Box>
          }
          variant="filled"
          sx={{
            backgroundColor: '#192038',
            borderRadius: 3,
            color: '#FFFFFF',
            width: '40%',
          }}
          InputProps={{
            style: {
              color: '#FFFFFF',
              fontSize: '15px',
            },
          }}
          value={searchTerm}
          onChange={handleSearchChange} 
        />
        <Button
          sx={{
            textTransform: 'none',
            color: '#3366FF',
            borderColor: '#3366FF',
            width: '30%',
            height: 40,
            '&:hover': {
              color: '#FFFFFF',
              border: '2px solid #FFFFFF'
            }
          }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          CADASTRAR VEÍCULO
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />


      <Box sx={{ height: 670, width: '100%', color: 'white' }}>
        <Grid ref={gridRef} columns={columns} rows={rows} />
      </Box>

      <ModalCadastroVeiculo open={openCadastro} close={handleCloseModal} getVeiculos={getVeiculos} />
      <ModalEditVeiculo open={openEdit} close={closeEdit} data={selectedRow} getVeiculos={getVeiculos} /> 
      <ModalQrCode open={openQr} close={closeQr} data={selectedRow} />
      <ModalDeleteVeiculo open={openDelete} close={closeDelete} data={selectedRow} getVeiculos={getVeiculos} /> 
    </>
  );
};

export default BodyFrotas;
