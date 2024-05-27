// Import libraries needed
import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Box, Typography } from '@mui/material';
import { Class, People, School } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Method side Menu
const SideMenu = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  // Listening event click
  const handleMenuClick = (menuIndex, path) => {
    onSelect(menuIndex);
    setSelectedIndex(menuIndex);
    navigate(path);
  };
  // Render HTML with Materia UI components, to validate click in opcions menu
  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h6" sx={{ ml: 2, my: 5 }}>
        Opciones
      </Typography>
      <List component="nav">
        <ListItem
          button 
          onClick={() => handleMenuClick(0, '/')}
          sx={{
            px: 5,
            bgcolor: selectedIndex === 0 ? '#2C9AFF !important' : 'inherit',
            color: selectedIndex === 0 ? 'white !important' : 'inherit',
            '&:hover': {
              bgcolor: '#2C9AFF !important',
              color: 'white !important'
            }
          }}
        >
          <ListItemIcon sx={{ color: selectedIndex === 0 ? 'white !important' : 'inherit' }}>
            <Class />
          </ListItemIcon>
          <ListItemText primary="Gestionar Clases" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleMenuClick(1, '/teachers')}
          sx={{
            px: 5,
            bgcolor: selectedIndex === 1 ? '#2C9AFF !important' : 'inherit',
            color: selectedIndex === 1 ? 'white !important' : 'inherit',
            '&:hover': {
              bgcolor: '#2C9AFF !important',
              color: 'white !important'
            }
          }}
        >
          <ListItemIcon sx={{ color: selectedIndex === 1 ? 'white !important' : 'inherit' }}>
            <People />
          </ListItemIcon>
          <ListItemText primary="Gestionar Maestros" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleMenuClick(2, '/students')}
          sx={{
            px: 5,
            bgcolor: selectedIndex === 2 ? '#2C9AFF !important' : 'inherit',
            color: selectedIndex === 2 ? 'white !important' : 'inherit',
            '&:hover': {
              bgcolor: '#2C9AFF !important',
              color: 'white !important'
            }
          }}
        >
          <ListItemIcon sx={{ color: selectedIndex === 2 ? 'white !important' : 'inherit' }}>
            <School />
          </ListItemIcon>
          <ListItemText primary="Gestionar Estudiantes" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideMenu;
