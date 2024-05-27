// Import libraries needed
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Edit, Delete, Visibility, Assignment } from '@mui/icons-material';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// Method table list class
const ClassTable = ({ classes, onUpdate }) => {
  //definte status needed
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = React.useState(false);
  const [selectedClassId, setSelectedClassId] = React.useState(null);
  const navigate = useNavigate();
  // handle delete click button
  const handleDeleteClick = (classId) => {
    setSelectedClassId(classId);
    setDeleteConfirmDialogOpen(true);
  };
  // handle confirm delete click button
  const handleConfirmDelete = async () => {
    try {
      // Llama al endpoint para eliminar la clase
      await axios.delete(`http://localhost:3000/classes/${selectedClassId}`);
      // Actualiza el estado local con las clases actualizadas
      onUpdate();
      //toaster notification
      toast.success('Clase eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la clase:', error);
    } finally {
      // Cierra el diálogo de confirmación después de manejar la eliminación
      setDeleteConfirmDialogOpen(false);
    }
  };
  // Capture event click visuality
  const handleVisibilityClick = (id_class) => {
    navigate(`/detailClass/${id_class}`); // Navega a la ruta con el ID
  };

  // Capture event click visuality
  const handleEditClick = (id_class) => {
    navigate(`/editClass/${id_class}`); // Navega a la ruta con el ID
  };

  // Capture event click add
  const handleManagerClick = (id_class) => {
    navigate(`/ManagerClass/${id_class}`); // Navega a la ruta con el ID
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#2C9AFF' }}>
            <TableRow>
              <TableCell sx={{ color: '#ffffff' }}>ID</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>Nombre de la Clase</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>Descripción</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>Fecha</TableCell>
              <TableCell sx={{ color: '#ffffff' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id_class}>
                <TableCell>{classItem.id_class}</TableCell>
                <TableCell>{classItem.name_class}</TableCell>
                <TableCell>{classItem.description_class}</TableCell>
                <TableCell>{format(classItem.date_created_class, 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                <TableCell>
                  <IconButton aria-label="view" color="primary" onClick={() => handleManagerClick(classItem.id_class)}>
                    <Assignment />
                  </IconButton>
                  <IconButton aria-label="view" color="primary" onClick={() => handleVisibilityClick(classItem.id_class)}>
                    <Visibility />
                  </IconButton>
                  <IconButton aria-label="edit" color="secondary" onClick={() => handleEditClick(classItem.id_class)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(classItem.id_class)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Confirm delete */}
      <Dialog open={deleteConfirmDialogOpen} onClose={() => setDeleteConfirmDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar esta clase?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClassTable;
