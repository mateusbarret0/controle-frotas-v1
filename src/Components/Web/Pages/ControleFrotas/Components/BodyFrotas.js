import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Grid from '../../../Components/Grid/Grid';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModalEditVeiculo from '../../../Components/Modal/ModalEditVeiculo';
import ModalQrCode from '../../../Components/Modal/ModalQrCode';
import { useNavigate } from 'react-router-dom';
import { GET_VEICULOS } from '../../../../../api';

const BodyFrotas = () => {
  const columns = [
    { field: 'modelo', headerName: 'MODELO', flex: 1 },
    { field: 'placa', headerName: 'PLACA', flex: 1 },
    { field: 'capacidade', headerName: 'CAPACIDADE', flex: 1 },
    { field: 'manutencao', headerName: 'MANUTENÇÃO', flex: 1 },
    // {
    //   field: 'histórico',
    //   headerName: 'HISTÓRICO', flex: 1,
    //   cellRenderer: () => (
    //     <Button sx={{ border: '1px solid #00FF57', width: '50%' }}
    //     onClick={() => navigate('/historico')}>
    //       <IconButton
    //         size="large"
    //         sx={{ p: 0, width: '100%', color: '#00FF57' }}
            
    //       >
    //         <HistoryOutlinedIcon fontSize="small" />
    //       </IconButton>
    //     </Button>
    //   ),
    // },
    // {
    //   field: 'qrCode',
    //   headerName: 'QR CODE', flex: 1,
    //   cellRenderer: () => (
    //     <Button sx={{ border: '1px solid #ffff', width: '50%' }}
    //     onClick={() => setQr(true)}>
    //       <IconButton size="large" sx={{ p: 0, width: '100%', color: '#ffff' }}>
    //         <QrCodeScannerOutlinedIcon fontSize="small" />
    //       </IconButton>
    //     </Button>
    //   ),
    // },
    // {
    //   field: 'editar',
    //   headerName: 'EDITAR', flex: 1,
    //   cellRenderer: () => (
    //     <Button sx={{ border: '1px solid #FFAA00', width: '50%' }} 
    //     onClick={() => setOpenEdit(true)}
    //     >
    //       <IconButton
    //         size="large"
    //         sx={{ p: 0, width: '100%', color: '#FFAA00' }}
    //       >
    //         <EditOutlinedIcon fontSize="small" />
    //       </IconButton>
    //     </Button>
    //   ),
    // },
    // {
    //   field: 'apagar',
    //   headerName: 'APAGAR', flex: 1,
    //   cellRenderer: () => (
    //     <Button sx={{ border: '1px solid #FF3D71', width: '50%' }}>
    //       <IconButton
    //         size="large"
    //         sx={{ p: 0, width: '100%', color: '#FF3D71' }}
    //       >
    //         <DeleteOutlineOutlinedIcon fontSize="small" />
    //       </IconButton>
    //     </Button>
    //   ),
    // },
  ];

  const gridRef = useRef(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openQr, setQr] = useState(false);
  const [rows, setRows] = useState(false)
  const closeEdit = () => setOpenEdit(false);
  const closeQr = () => setQr(false);
  
    const navigate = useNavigate();

    
const getVeiculos = async () => {
  const { url, options } = GET_VEICULOS();
  console.log("🚀 ~ getVeiculos ~ options:", options)
  console.log("🚀 ~ getVeiculos ~ url:", url)
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
      getVeiculos();
    }, []);

  return (
    <>
      <Box sx={{ height: 670, width: '100%', color: 'white' }}>
        <Grid ref={gridRef} columns={columns} rows={rows} />
      </Box>

      <ModalEditVeiculo open={openEdit} close={closeEdit} />
      <ModalQrCode open={openQr} close={closeQr} />
    </>
  );
};

export default BodyFrotas;
