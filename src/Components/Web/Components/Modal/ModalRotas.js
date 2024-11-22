import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Divider } from '@mui/material';
import dayjs from 'dayjs';
import ModalMultCard from './ModalMultCard';
import ModalAprovarRota from './ModalAprovarRota';
import ModalReprovarRota from './ModalReprovarRota';
import ModalObsRota from './ModalObsRota';
import BoxStyleCard from '../Box/BoxStyleCard';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { GET_OBS_ROTAS } from '../../../../api';

const ModalRotas = ({ open, close, data, getRotas }) => {
  const [openAprovar, setOpenAprovar] = useState(false);
  const [openReprovar, setOpenReprovar] = useState(false);
  const [openObs, setOpenObs] = useState(false);
  const [obs, setObs] = useState(false);

  const openAprovarRota = () => setOpenAprovar(true);

  const closeAprovar = () => setOpenAprovar(false);

  const openReprovarRota = () => setOpenReprovar(true);

  const closeReprovar = () => setOpenReprovar(false);

  const openObsRota = () => setOpenObs(true);

  const closeObs = () => setOpenObs(false);

  const getObsRotas = async () => {
    const { url, options } = GET_OBS_ROTAS(data?.veiculo.placa, data?.COD_ROTA);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setObs(json);
      } else {
        console.log('Erro ao buscar veículos');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <ModalMultCard
        open={open}
        close={close}
        sx={{ flexDirection: 'column', width: '80vw' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <BoxStyleCard sx={{ flex: 1, minWidth: '45%' }}>
            <Typography variant="h4" sx={{ mb: 2, color: '#FFFFFF' }}>
              Informações de Partida
            </Typography>
            <Divider sx={{ mb: 1, backgroundColor: '#FFFFFF', height: 2 }} />
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                CEP: {data?.CEP_PARTIDA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Número: {data?.NUMERO_PARTIDA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Rua: {data?.RUA_PARTIDA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Bairro: {data?.BAIRRO_PARTIDA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Cidade: {data?.CIDADE_PARTIDA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Estado: {data?.ESTADO_PARTIDA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Data e Hora:{' '}
                {dayjs(data?.DATA_HORA_PARTIDA).format('DD/MM/YYYY - HH:mm')}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Complemento: {data?.COMPLEMENTO_PARTIDA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Descrição: {data?.DESCRICAO_PARTIDA}
              </Typography>
            </Box>
          </BoxStyleCard>

          <BoxStyleCard sx={{ flex: 1, minWidth: '45%' }}>
            <Typography variant="h4" sx={{ mb: 2, color: '#FFFFFF' }}>
              Informações de Chegada
            </Typography>
            <Divider sx={{ mb: 1, backgroundColor: '#FFFFFF', height: 2 }} />
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                CEP: {data?.CEP_CHEGADA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Número: {data?.NUMERO_CHEGADA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Rua: {data?.RUA_CHEGADA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Bairro: {data?.BAIRRO_CHEGADA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Cidade: {data?.CIDADE_CHEGADA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Estado: {data?.ESTADO_CHEGADA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Data e Hora:{' '}
                {dayjs(data?.DATA_HORA_CHEGADA).format('DD/MM/YYYY - HH:mm')}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Complemento: {data?.COMPLEMENTO_CHEGADA}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Descrição: {data?.DESCRICAO_CHEGADA}
              </Typography>
            </Box>
          </BoxStyleCard>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
            alignItems: 'stretch',
            flexWrap: 'wrap',
          }}
        >
          <BoxStyleCard
            sx={{
              flex: 1,
              minWidth: '65%',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: '#FFFFFF' }}>
              Observações da Rota
            </Typography>
            <Divider sx={{ mb: 1, backgroundColor: '#FFFFFF', height: 2 }} />
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Desvio de rota: {obs?.[0]?.DESVIOS || data?.DESVIOS}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Incidentes: {obs?.[0]?.INCIDENTES || data?.INCIDENTES}
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Rotas Alternativas:{' '}
                {obs?.[0]?.ROTA_ALTERNATIVA || data?.ROTA_ALTERNATIVA}
              </Typography>
              <Typography sx={{ fontSize: 18, mb: 4, color: '#FFFFFF' }}>
                Paradas não programadas realizadas:{' '}
                {obs?.[0]?.PARADAS || data?.PARADAS}
              </Typography>
            </Box>
          </BoxStyleCard>

          <BoxStyleCard
            sx={{
              flex: 1,
              minWidth: '30%',
              display: 'flex',
              flexDirection: 'column',
              px: 4,
              py: 2.5,
              gap: 2,
              height: '100%',
            }}
          >
            <Divider sx={{ mb: 1, backgroundColor: '#FFFFFF', height: 2 }} />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Button
                sx={{
                  textTransform: 'none',
                  color: 'red',
                  borderColor: 'red',
                  width: '100%',
                  height: 40,
                  '&:hover': {
                    color: '#e00000',
                    border: '2px solid #e00000',
                  },
                }}
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={openReprovarRota}
              >
                REPROVAR ROTA
              </Button>
              <Button
                sx={{
                  textTransform: 'none',
                  color: 'green',
                  borderColor: 'green',
                  width: '100%',
                  height: 40,
                  '&:hover': {
                    color: '#00c500',
                    border: '2px solid #00c500',
                  },
                }}
                variant="outlined"
                startIcon={<CheckIcon />}
                onClick={openAprovarRota}
              >
                APROVAR ROTA
              </Button>
              <Button
                sx={{
                  textTransform: 'none',
                  color: '#3366FF',
                  borderColor: '#3366FF',
                  width: '100%',
                  height: 40,
                  '&:hover': {
                    color: '#00ABFF',
                    border: '2px solid #00ABFF',
                  },
                }}
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={openObsRota}
              >
                ADICIONAR OBSERVAÇÕES
              </Button>
            </Box>
            <Divider sx={{ mb: 1, backgroundColor: '#FFFFFF', height: 2 }} />
          </BoxStyleCard>
        </Box>
      </ModalMultCard>
      <ModalAprovarRota
        open={openAprovar}
        close={closeAprovar}
        data={data}
        getRotas={getRotas}
      />
      <ModalReprovarRota
        open={openReprovar}
        close={closeReprovar}
        data={data}
        getRotas={getRotas}
      />
      <ModalObsRota
        open={openObs}
        close={closeObs}
        data={data}
        getObsRotas={getObsRotas}
        obs={obs}
      />
    </>
  );
};

export default ModalRotas;
