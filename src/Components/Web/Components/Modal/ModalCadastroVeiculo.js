import { React, useEffect, useState } from 'react';
import ModalStyle from '../Modal/ModalStyle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Divider, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ModalCadastroVeiculo = ({ open, close, color }) => {
  const [loading, setLoading] = useState(false);

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
              Cadastrar novo veículo
            </Typography>

    <FormControl sx={{ width: 200,  }}>
      <InputLabel id="demo-simple-select-label" sx={{ color: '#FFFFFF' }}>
        Tipo de Veículo
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Tipo de Veículo"
        sx={{
          color: '#FFFFFF', 
          backgroundColor: '#192038',
           borderRadius: 3
        }}
      >
        <MenuItem value={10}>Van</MenuItem>
        <MenuItem value={20}>Ônibus</MenuItem>
      </Select>
    </FormControl>
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
                <TextField sx={{
                    backgroundColor: '#192038',
                    borderRadius: 3,
                    color: '#FFFFFF',
                    width: '50%',  
                    fontSize: '1rem'
                    }} 
                    id="outlined-basic" label="Insira o modelo do veículo:" variant="outlined" />
                <TextField sx={{
                    backgroundColor: '#192038',
                    borderRadius: 3,
                    color: '#FFFFFF',
                    width: '25%',  
                    fontSize: '1rem'
                    }} 
                    id="outlined-basic" label="Placa:" variant="outlined" />
                <TextField sx={{
                    backgroundColor: '#192038',
                    borderRadius: 3,
                    color: '#FFFFFF',
                    width: '25%',  
                    fontSize: '1rem'
                    }} 
                    id="outlined-basic" label="Ano:" variant="outlined" />
                </ThemeProvider>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', gap: 2,  mb: 2  }}>
                <ThemeProvider theme={darkTheme}>

                <TextField sx={{
                    backgroundColor: '#192038',
                    borderRadius: 3,
                    color: '#FFFFFF',
                    width: '33%',  
                    fontSize: '1rem'
                    }} 
                    id="outlined-basic" label="Capacidade:" variant="outlined" />
                <TextField sx={{
                    backgroundColor: '#192038',
                    borderRadius: 3,
                    color: '#FFFFFF',
                    width: '33%',  
                    fontSize: '1rem'
                    }} 
                    id="outlined-basic" label="Data da próxima manutenção:" variant="outlined" />
                <TextField sx={{
                    backgroundColor: '#192038',
                    borderRadius: 3,
                    color: '#FFFFFF',
                    width: '33%',  
                    fontSize: '1rem'
                    }} 
                    id="outlined-basic" label="Data da última manutenção:" variant="outlined" />
                                    </ThemeProvider>

                </Box>
                <Box sx={{ width: '100%', display: 'flex', gap: 2,  mb: 2  }}>
                <ThemeProvider theme={darkTheme}>
                <TextField sx={{
                    backgroundColor: '#192038',
                    borderRadius: 3,
                    color: '#FFFFFF',
                    width: '50%',  
                    fontSize: '1rem'
                    }} 
                    id="outlined-basic" label="Empresa responsável:" variant="outlined" />
                <TextField sx={{
                    backgroundColor: '#192038',
                    borderRadius: 3,
                    color: '#FFFFFF',
                    width: '50%',  
                    fontSize: '1rem'
                    }} 
                    id="outlined-basic" label="Motorista responsável:" variant="outlined" />
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
            border: '2px solid #e00000'}
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
            border: '2px solid #00c500'}
            }}
            variant="outlined"
            startIcon={<CheckIcon />}
            // onClick={handleClick}
        >
            CADASTRAR
        </Button>
  </Box>
          </>
        }
      />
    </Box>
  );
};

export default ModalCadastroVeiculo;