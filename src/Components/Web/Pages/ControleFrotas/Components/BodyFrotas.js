import React, { useRef, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Grid from '../../../Components/Grid/Grid';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModalEditVeiculo from '../../../Components/Modal/ModalEditVeiculo';
import { useNavigate } from 'react-router-dom';

const BodyFrotas = () => {
  const columns = [
    { field: 'modelo', headerName: 'MODELO' },
    { field: 'placa', headerName: 'PLACA' },
    { field: 'capacidade', headerName: 'CAPACIDADE' },
    { field: 'manutencao', headerName: 'MANUTENÇÃO' },
    {
      field: 'histórico',
      headerName: 'HISTÓRICO',
      cellRenderer: () => (
        <Button sx={{ border: '1px solid #00FF57', width: '50%' }}>
          <IconButton
            size="large"
            sx={{ p: 0, width: '100%', color: '#00FF57' }}
            onClick={() => navigate('/historico')}
          >
            <HistoryOutlinedIcon fontSize="small" />
          </IconButton>
        </Button>
      ),
    },
    {
      field: 'qrCode',
      headerName: 'QR CODE',
      cellRenderer: () => (
        <Button sx={{ border: '1px solid #ffff', width: '50%' }}>
          <IconButton size="large" sx={{ p: 0, width: '100%', color: '#ffff' }}>
            <QrCodeScannerOutlinedIcon fontSize="small" />
          </IconButton>
        </Button>
      ),
    },
    {
      field: 'editar',
      headerName: 'EDITAR',
      cellRenderer: () => (
        <Button sx={{ border: '1px solid #FFAA00', width: '50%' }}>
          <IconButton
            size="large"
            sx={{ p: 0, width: '100%', color: '#FFAA00' }}
            onClick={() => setOpenEdit(true)}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Button>
      ),
    },
    {
      field: 'apagar',
      headerName: 'APAGAR',
      cellRenderer: () => (
        <Button sx={{ border: '1px solid #FF3D71', width: '50%' }}>
          <IconButton
            size="large"
            sx={{ p: 0, width: '100%', color: '#FF3D71' }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Button>
      ),
    },
  ];

  const rows = [
    {
      modelo: 'Fusca',
      placa: 'ABC1234',
      capacidade: '4 pessoas',
      histórico: 'Manutenção regular',
      qrCode: 'QR1234567890',
      editar: 'Editar',
      apagar: 'Apagar',
    },
    {
      modelo: 'Civic',
      placa: 'XYZ5678',
      capacidade: '5 pessoas',
      histórico: 'Troca de óleo recente',
      qrCode: 'QR0987654321',
      editar: 'Editar',
      apagar: 'Apagar',
    },
    {
      modelo: 'Onix',
      placa: 'LMN3456',
      capacidade: '5 pessoas',
      histórico: 'Revisão completa',
      qrCode: 'QR1122334455',
      editar: 'Editar',
      apagar: 'Apagar',
    },
    {
      modelo: 'Hilux',
      placa: 'GHI7890',
      capacidade: '4 pessoas',
      histórico: 'Troca de pneus',
      qrCode: 'QR5566778899',
      editar: 'Editar',
      apagar: 'Apagar',
    },
    {
      modelo: 'Gol',
      placa: 'JKL2345',
      capacidade: '5 pessoas',
      histórico: 'Inspeção recente',
      qrCode: 'QR6677889900',
      editar: 'Editar',
      apagar: 'Apagar',
    },
    {
      modelo: 'Pajero',
      placa: 'MNO6789',
      capacidade: '7 pessoas',
      histórico: 'Revisão de suspensão',
      qrCode: 'QR2233445566',
      editar: 'Editar',
      apagar: 'Apagar',
    },
    {
      modelo: 'Renegade',
      placa: 'PQR0123',
      capacidade: '5 pessoas',
      histórico: 'Troca de bateria',
      qrCode: 'QR3344556677',
      editar: 'Editar',
      apagar: 'Apagar',
    },
    {
      modelo: 'Kicks',
      placa: 'STU4567',
      capacidade: '5 pessoas',
      histórico: 'Troca de filtro de ar',
      qrCode: 'QR4455667788',
      editar: 'Editar',
      apagar: 'Apagar',
    },
    {
      modelo: 'Corolla',
      placa: 'VWX8901',
      capacidade: '5 pessoas',
      histórico: 'Troca de correia',
      qrCode: 'QR5566778899',
      editar: 'Editar',
      apagar: 'Apagar',
    },
    {
      modelo: 'Compass',
      placa: 'YZA2345',
      capacidade: '5 pessoas',
      histórico: 'Verificação de freios',
      qrCode: 'QR6677889900',
      editar: 'Editar',
      apagar: 'Apagar',
    },
  ];

  const gridRef = useRef(null);

  const [openEdit, setOpenEdit] = useState(false);
  const closeEdit = () => setOpenEdit(false);
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ height: 670, width: '100%', color: 'white' }}>
        <Grid ref={gridRef} columns={columns} rows={rows} />
      </Box>

      <ModalEditVeiculo open={openEdit} close={closeEdit} />
    </>
  );
};

export default BodyFrotas;
