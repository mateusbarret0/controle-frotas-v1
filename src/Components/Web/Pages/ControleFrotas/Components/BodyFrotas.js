import React from "react";
import { Box } from "@mui/material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Grid from "../../../Components/Grid/Grid";

const BodyFrotas = () => {
  const columns =[
    { field: 'modelo', headerName: 'Modelo' },
    { field: 'placa', headerName: 'Placa' },
    { field: 'capacidade', headerName: 'Capacidade' },
    { field: 'histórico', headerName: 'Histórico' },
    { field: 'qrCode', headerName: 'Qr Code' },
    { field: 'editar', headerName: 'Editar' },
    { field: 'apagar', headerName: 'Apagar' },
  ];

  const rows=[
    { modelo: 'modelo', placa: 'Modelo', capacidade: 'capacidade',  histórico: 'histórico', qrCode: 'qrCode', editar:'editar', apagar: 'apagar' },
  ];

  return (
    <Box sx={{ height: 670, width: "100%", color: "white"}}>
      <Grid columns={columns} rows={rows}/>
    </Box>
  );
};

export default BodyFrotas;
