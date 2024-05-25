// SideMenu.jsx
import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { Class, People, School } from '@mui/icons-material';
import { useState } from 'react';

const SideMenu = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    onSelect(index);
  };

  return (
    <Box sx={{ pt: 2 }}>
      <List component="nav">
        <ListItem 
          button 
          selected={selectedIndex === 0} 
          onClick={() => handleListItemClick(0)}
          sx={{
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
          selected={selectedIndex === 1} 
          onClick={() => handleListItemClick(1)}
          sx={{
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
          selected={selectedIndex === 2} 
          onClick={() => handleListItemClick(2)}
          sx={{
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
