import { React, useEffect, useState } from 'react';
import ModalStyle from '../Modal/ModalStyle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Divider, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ModalDeleteVeiculo = ({ open, close, color, data }) => {
    const [loading, setLoading] = useState(false);
    console.log("🚀 ~ ModalEditVeiculo ~ data:", data)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#192038',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
      },
    },
  });
  return (
    <Box>
      <ModalStyle
        loading={loading}
        open={open}
        close={close}
        title={
          <>
          <Box sx={{display: 'flex'}}>
            <Typography
              sx={{
                fontSize: 25,
               
                fontWeight: '700',
                color: 'white',
                mr: 42
              }}
            >
              Excluir Veículo
            </Typography>
         </Box>
          </>
        }
        color={color}
        content={
          <>
            <Box
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
                <Box sx={{ width: '100%', display: 'flex', gap: 2, mb: 2 }}>
                <ThemeProvider theme={darkTheme}>

                    <Typography>Tem certeza que deseja excluir o veículo {data?.modelo} - {data?.placa}</Typography>
                </ThemeProvider>
                </Box>

            </Box>
          </>
        }
        action={
          <>
          <Box sx={{width: '100%', display: 'flex', gap: 2}}>
          <Button
                sx={{
                  textTransform: 'none',
                  color: 'red',
                  borderColor: 'red',
                  width: '50%',
                  height: 40,
                  '&:hover': {
                    color: '#e00000',
                    border: '2px solid #e00000',
                  },
                }}
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={close}
              >
                CANCELAR
              </Button>

              <Button
                sx={{
                  textTransform: 'none',
                  color: 'green',
                  borderColor: 'green',
                  width: '50%',
                  height: 40,
                  '&:hover': {
                    color: '#00c500',
                    border: '2px solid #00c500',
                  },
                }}
                variant="outlined"
                startIcon={<CheckIcon />}
                // onClick={createVeiculo}
              >
                DELETAR
              </Button>
  </Box>
          </>
        }
      />
    </Box>
  );
};

export default ModalDeleteVeiculo;