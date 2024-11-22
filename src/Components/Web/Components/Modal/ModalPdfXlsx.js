import { useState } from 'react';
import {
  Box,
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

const ModalPdfXlsx = ({
  open,
  close,
  isPedido,
  orcamento,
  color = 'detail4',
}) => {
  const [tipoRelatorio, setTipoRelatorio] = useState('normal');

  const handleTipoChange = (event) => {
    setTipoRelatorio(event.target.value);
  };

  return (
    <ModalStyle
      open={open}
      close={close}
      title="Gerar relatório de rotas"
      color={color}
      content={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            {/* <FormLabel
              id="tipo-relatorio-label"
              sx={{ color: '#fff', fontWeight: 'bold' }}
            >
              Selecione o tipo de relatório
            </FormLabel> */}
            {/* <RadioGroup
              row
              aria-labelledby="tipo-relatorio-label"
              value={tipoRelatorio}
              name="tipo-relatorio"
              onChange={handleTipoChange}
              sx={{
                '& .MuiRadio-root': {
                  color: '#ccc',
                },
                '& .Mui-checked': {
                  color: '#fff',
                },
                '& .MuiFormControlLabel-label': {
                  color: '#fff',
                },
              }}
            >
              <FormControlLabel
                value="normal"
                control={<Radio />}
                label="PDF"
              />
              <FormControlLabel
                value="avançada"
                control={<Radio />}
                label="EXCEL"
              />
            </RadioGroup> */}
            <RotasLayoutPDF />
          </FormControl>
        </Box>
      }
      action={<></>}
    />
  );
};

export default ModalPdfXlsx;
