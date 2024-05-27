// Import libraries needed
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
// Method form add class
const AddClassForm = ({ onClassAdded }) => {
  const [name_class, setName] = useState('');
  const [description_class, setDescription] = useState('');
  // Listening event submit dorm
  const handleSubmit = async (event) => {
    event.preventDefault();
    // I get already date
    const currentDate = new Date();
    // to set format correct date
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    // to set body request
    const requestBody = {
      name_class,
      description_class,
      date_created_class: formattedDate,
    };
    //Try and Catch
    try {
      // Request to endpoint with correct method
      const response = await axios.post('http://localhost:3000/classes', requestBody);
      console.log('Clase agregada:', response.data);
      onClassAdded(); // call function for update table classes
      //toaster notification
      toast.success('Clase agregada exitosamente');
      // Reset the form fields
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error al agregar la clase:', error);
    }
  };
  // Render HTML with Materia UI components
  return (
    <Box sx={{ p: 0 }}>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
        Agregar Clase
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          my: 5,
          mx: 'auto',
          p: 3,
          bgcolor: '#ffffff',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="name_class"
          label="Nombre de la Clase"
          value={name_class}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: '100%' }}
        />
        <TextField
          required
          id="description_class"
          label="Descripción"
          value={description_class}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          sx={{ width: '100%' }}
        />
        <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
          Agregar Clase
        </Button>
      </Box>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
        Listado de Estudiantes
      </Typography>
    </Box>
  );
};

export default AddClassForm;
