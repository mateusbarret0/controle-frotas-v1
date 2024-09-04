import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { NavLink } from 'react-router-dom';
import { Tooltip, Typography } from '@mui/material';
import { isMobileOnly } from 'react-device-detect';
import { React, useState } from 'react';

const MenuList = ({ setOpenModal, setOpenDrawer }) => {
  const handleDrawer = () => {
    isMobileOnly && setOpenDrawer(false);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Tooltip
        title={<Typography sx={{ fontSize: '1rem' }}>Controle de Frotas</Typography>}
        arrow
        placement="right"
      >
        <NavLink to="/" key="frotas" onClick={handleDrawer} sx={{color: 'white'}}>
          <ListItem button >
            <ListItemIcon>
              <AirportShuttleIcon sx={{color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary="Controle de Frotas" sx={{color: 'white'}}/>
          </ListItem>
        </NavLink>
      </Tooltip>
    </Box>
  );
};

export default MenuList;

// OK