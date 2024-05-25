// App.jsx
import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import SideMenu from './views/SideMenu';
import AddClassForm from './views/AddClassForm';
import ClassTable from './views/ClassTable';

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const renderContent = () => {
    switch (selectedMenu) {
      case 0:
        return (
          <Box>
            <AddClassForm onClassAdded={() => {/* Lógica para refrescar la tabla de clases */}} />
            <ClassTable />
          </Box>
        );
      case 1:
        return <div>Gestionar Maestros</div>;
      case 2:
        return <div>Gestionar Estudiantes</div>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
        }}
      >
        <SideMenu onSelect={setSelectedMenu} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        {renderContent()}
      </Box>
    </Box>
  );
}
