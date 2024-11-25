import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import ModalStyle from './ModalStyle';
import RotasLayoutPDF from '../Relatorios/PDF/RotasLayoutPDF';
import TableViewIcon from '@mui/icons-material/TableView';

const ModalPdfXlsx = ({ open, close, placa, orcamento, color = 'detail4' }) => {
  return (
    <ModalStyle
      open={open}
      close={close}
      title="Gerar relatório de rotas"
      color={color}
      content={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <RotasLayoutPDF placa={placa} />
            <Button
              // onClick={handlePrint}
              variant="outlined"
              startIcon={<TableViewIcon sx={{ fontSize: '1.5vw' }} />}
              sx={{
                mt: 2,
                fontSize: 15,
                textTransform: 'none',
                color: '#2d7930',
                height: 40,
                borderColor: '#2d7930',
                '&:hover': {
                  color: '#FFFFFF',
                  border: '2px solid #FFFFFF',
                },
              }}
            >
              Gerar Relatório EXCEL
            </Button>
          </FormControl>
        </Box>
      }
      action={<></>}
    />
  );
};

export default ModalPdfXlsx;
