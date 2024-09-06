import { React, useEffect, useState } from 'react';
import ModalStyle from '../Modal/ModalStyle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider, IconButton } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import teste from '../../../../Assets/imgqrcode.png';

const ModalUser = ({ open, close, color }) => {

  return (
    <Box>
      <ModalStyle
        open={open}
        close={close}
        title={
          <>
            <Typography
              sx={{
                fontSize: 25,
                pt: 0,
                pb: 0,
                fontWeight: '700',
                color: '#FFFFFF', textTransform: 'uppercase',  fontWeight: 'bold'
              }}
            >
              QR CODE - ABC1234
            </Typography>
          </>
        }
        color={color}
        content={
          <>
            <Box>


<Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    height: '40vh',
    backgroundColor: '#ffffff',
    borderRadius: 8
}}>
  <img src={teste} alt="Descrição da Imagem" style={{ 
      maxWidth: '100%', 
      maxHeight: '100%', 
      }} 
  />
</Box>

            </Box>
          </>
        }
        action={
          <>
            
          </>
        }
      />
    </Box>
  );
};

export default ModalUser;
