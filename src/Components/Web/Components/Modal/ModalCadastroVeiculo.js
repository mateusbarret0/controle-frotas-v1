import { React, useEffect, useState } from 'react';
import ModalStyle from '../Modal/ModalStyle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Divider, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CREATE_VEICULOS, GET_VEICULOS } from '../../../../api';

const ModalCadastroVeiculo = ({ open, close, color }) => {
  const [loading, setLoading] = useState(false);
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [ano, setAno] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [dataProxManutencao, setDataProxManutencao] = useState('');
  const [dataUltManutencao, setDataUltManutencao] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [motorista, setMotorista] = useState('');

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

  const createVeiculo = async () => {
    const { url, options } = CREATE_VEICULOS(); 
    const body = {
      modelo,
      placa,
      ano,
      capacidade,
      dataProxManutencao,
      dataUltManutencao,
      empresa,
      motorista,
    };
  
    try {
      const response = await fetch(url, {
        ...options,
        body: JSON.stringify(body), 
      });
      const json = await response.json();
      if (response.ok) {
        console.log('Veículo cadastrado com sucesso!');
        setModelo('');
        setPlaca('');
        setAno('');
        setCapacidade('');
        setDataProxManutencao('');
        setDataUltManutencao('');
        setEmpresa('');
        setMotorista('');
      } else {
        console.log('Erro ao cadastrar veículo:', json);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <Box>
      <ModalStyle
        loading={loading}
        open={open}
        close={close}
        title={
          <>
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: '700',
                  color: 'white',
                  mr: 42,
                }}
              >
                Cadastrar novo veículo
              </Typography>

              <FormControl sx={{ width: 200 }}>
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
                    borderRadius: 3,
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
            <Box sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ width: '100%', display: 'flex', gap: 2, mb: 2 }}>
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    sx={{
                      backgroundColor: '#192038',
                      borderRadius: 3,
                      color: '#FFFFFF',
                      width: '50%',
                      fontSize: '1rem',
                    }}
                    id="modelo"
                    label="Insira o modelo do veículo:"
                    variant="outlined"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: '#192038',
                      borderRadius: 3,
                      color: '#FFFFFF',
                      width: '25%',
                      fontSize: '1rem',
                    }}
                    id="placa"
                    label="Placa:"
                    variant="outlined"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: '#192038',
                      borderRadius: 3,
                      color: '#FFFFFF',
                      width: '25%',
                      fontSize: '1rem',
                    }}
                    id="ano"
                    label="Ano:"
                    variant="outlined"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                  />
                </ThemeProvider>
              </Box>

              <Box sx={{ width: '100%', display: 'flex', gap: 2, mb: 2 }}>
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    sx={{
                      backgroundColor: '#192038',
                      borderRadius: 3,
                      color: '#FFFFFF',
                      width: '33%',
                      fontSize: '1rem',
                    }}
                    id="capacidade"
                    label="Capacidade:"
                    variant="outlined"
                    value={capacidade}
                    onChange={(e) => setCapacidade(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: '#192038',
                      borderRadius: 3,
                      color: '#FFFFFF',
                      width: '33%',
                      fontSize: '1rem',
                    }}
                    id="dataProxManutencao"
                    label="Data da próxima manutenção:"
                    variant="outlined"
                    value={dataProxManutencao}
                    onChange={(e) => setDataProxManutencao(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: '#192038',
                      borderRadius: 3,
                      color: '#FFFFFF',
                      width: '33%',
                      fontSize: '1rem',
                    }}
                    id="dataUltManutencao"
                    label="Data da última manutenção:"
                    variant="outlined"
                    value={dataUltManutencao}
                    onChange={(e) => setDataUltManutencao(e.target.value)}
                  />
                </ThemeProvider>
              </Box>
              <Box sx={{ width: '100%', display: 'flex', gap: 2, mb: 2 }}>
                <ThemeProvider theme={darkTheme}>
                  <TextField
                    sx={{
                      backgroundColor: '#192038',
                      borderRadius: 3,
                      color: '#FFFFFF',
                      width: '50%',
                      fontSize: '1rem',
                    }}
                    id="empresa"
                    label="Empresa responsável:"
                    variant="outlined"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                  />
                  <TextField
                    sx={{
                      backgroundColor: '#192038',
                      borderRadius: 3,
                      color: '#FFFFFF',
                      width: '50%',
                      fontSize: '1rem',
                    }}
                    id="motorista"
                    label="Motorista responsável:"
                    variant="outlined"
                    value={motorista}
                    onChange={(e) => setMotorista(e.target.value)}
                  />
                </ThemeProvider>
              </Box>
            </Box>
          </>
        }
        action={
          <>
            <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
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
                onClick={createVeiculo}
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
