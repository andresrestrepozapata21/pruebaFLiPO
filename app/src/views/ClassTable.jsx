// ClassTable.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';

const ClassTable = () => {
  const [classes, setClasses] = useState([]);

  //useEffect(() => {
  //  // Función para obtener las clases desde el endpoint
  //  const fetchClasses = async () => {
  //    try {
  //      const response = await axios.get('/api/classes');
  //      setClasses(response.data.data);
  //    } catch (error) {
  //      console.error('Error fetching classes:', error);
  //    }
  //  };
//
  //  fetchClasses();
  //}, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre de la Clase</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassTable;
