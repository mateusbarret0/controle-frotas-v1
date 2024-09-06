import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useState } from "react";
import ModalCadastroVeiculo from "../../../Components/Modal/ModalCadastroVeiculo";

const HeaderFrotas = () => {
  const [openCadastro, setOpenCadastro] = useState(false)

  const handleClick = (e) => {
    setOpenCadastro(true); 
  };

  const handleCloseModal = () => {
    setOpenCadastro(false);
  };

return (
<>

<Box
  sx={{
    width: '100%',
    display: 'flex',  
    justifyContent: 'space-between',  
    alignItems: 'center',  
    mb: 2
  }}
>
  <Typography sx={{color: '#FFFFFF', textTransform: 'uppercase', fontSize: '2rem', fontWeight: 'bold'}}>
    Chevrolet Astra - ABC1234
  </Typography>
  <Button
    sx={{
      textTransform: 'none',
      color: '#3366FF',
      borderColor: '#3366FF',
      width: '30%',
      height: 40,
      '&:hover': {
            color: '#FFFFFF',
            border: '2px solid #FFFFFF'}
    }}
    variant="outlined"
    startIcon={<PictureAsPdfIcon />}
    onClick={handleClick}
  >
    GERAR RELATÓRIO
  </Button>


</Box>

<Divider sx={{mb: 2}} />

<ModalCadastroVeiculo open={openCadastro} close={handleCloseModal}/>
</>
  );
};

export default HeaderFrotas;
