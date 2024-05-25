// AddClassForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddClassForm = ({ onClassAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí deberías llamar al endpoint para agregar una clase
    // Supongamos que tienes una función `addClass` para hacerlo
    await addClass({ name_class: name, description_class: description });
    onClassAdded();
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required
          id="name"
          label="Nombre de la Clase"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="description"
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Agregar Clase
      </Button>
    </Box>
  );
};

export default AddClassForm;
