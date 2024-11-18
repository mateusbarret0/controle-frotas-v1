import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Divider } from '@mui/material';
import dayjs from 'dayjs';
import ModalMultCard from './ModalMultCard';
import ModalAprovarRota from './ModalAprovarRota';
import ModalReprovarRota from './ModalReprovarRota';
import BoxStyleCard from '../Box/BoxStyleCard';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const ModalRotas = ({ open, close, data }) => {
  const [openAprovar, setOpenAprovar] = useState(false);
  const [openReprovar, setOpenReprovar] = useState(false);

  const openAprovarRota = () => setOpenAprovar(true);

  const closeAprovar = () => setOpenAprovar(false);

  const openReprovarRota = () => setOpenReprovar(true);

  const closeReprovar = () => setOpenReprovar(false);

  return (
    <>
      <ModalMultCard
        open={open}
        close={close}
        sx={{ flexDirection: 'column', width: '60vw' }}
      >
        <BoxStyleCard>
          <Typography variant="h4" sx={{ mb: 2, color: '#FFFFFF' }}>
            Informações de Partida
          </Typography>
          <Divider sx={{ mb: 1, backgroundColor: '#FFFFFF', height: 2 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ width: '50%', textAlign: 'left' }}>
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
            </Box>
            <Box sx={{ width: '50%', textAlign: 'left' }}>
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
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Descrição: {data?.DESCRICAO_PARTIDA}
              </Typography>
            </Box>
          </Box>
        </BoxStyleCard>

        <BoxStyleCard>
          <Typography variant="h4" sx={{ mb: 2, color: '#FFFFFF' }}>
            Informações de Chegada
          </Typography>
          <Divider sx={{ mb: 1, backgroundColor: '#FFFFFF', height: 2 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ width: '50%', textAlign: 'left' }}>
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
            </Box>
            <Box sx={{ width: '50%', textAlign: 'left' }}>
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
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ fontSize: 18, color: '#FFFFFF' }}>
                Descrição: {data?.DESCRICAO_CHEGADA}
              </Typography>
            </Box>
          </Box>
        </BoxStyleCard>

        <BoxStyleCard
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: 4,
            py: 2.5,
            gap: 2,
          }}
        >
          <Divider sx={{ mb: 1, backgroundColor: '#FFFFFF', height: 2 }} />

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
              onClick={openReprovarRota}
            >
              REPROVAR ROTA
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
              onClick={openAprovarRota}
            >
              APROVAR ROTA
            </Button>
          </Box>
        </BoxStyleCard>
      </ModalMultCard>
      <ModalAprovarRota open={openAprovar} close={closeAprovar} data={data} />
      <ModalReprovarRota
        open={openReprovar}
        close={closeReprovar}
        data={data}
      />
    </>
  );
};

export default ModalRotas;
