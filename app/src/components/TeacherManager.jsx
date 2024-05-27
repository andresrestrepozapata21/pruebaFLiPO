// Import libraries needed
import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Method form add class
const TeacherManager = ({ onTeacherAdded, teachers, onUpdateTeacher }) => {
    //definte status needed
    const [name_teacher, setName] = useState('');
    const [last_name_teacher, setLastName] = useState('');
    const [email_teacher, setEmail] = useState('');
    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const navigate = useNavigate();

    // Listening event submit dorm
    const handleSubmit = async (event) => {
        event.preventDefault();
        // I get already date
        const currentDate = new Date();
        // to set format correct date
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
        // to set body request
        const requestBody = {
            name_teacher,
            last_name_teacher,
            email_teacher,
            date_created_teacher: formattedDate,
        };
        //Try and Catch
        try {
            // Request to endpoint with correct method
            const response = await axios.post('http://localhost:3000/teachers', requestBody);
            console.log('Teacher agregado:', response.data);
            onTeacherAdded(); // call function for update table teacher
            //toaster notification
            toast.success('Maestro agregado exitosamente');
            // Reset the form fields
            setName('');
            setLastName('');
            setEmail('');
        } catch (error) {
            //toaster notification
            toast.error('Error');
            console.error('Error al agregar maestro:', error);
        }
    };

    // Capture event click visuality
    const handleEditClick = (id_teacher) => {
        navigate(`/editTeacher/${id_teacher}`); // to go url with ID
    };


    // Click ddelete listening
    const handleDeleteClick = (classId) => {
        setSelectedClassId(classId);
        setDeleteConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // Call endpoint
            await axios.delete(`http://localhost:3000/teachers/${selectedClassId}`);
            // update datatable
            onUpdateTeacher();
            //toaster notification
            toast.success('Maestro eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el maestro:', error);
        } finally {
            // close dialog confirmation
            setDeleteConfirmDialogOpen(false);
        }
    };

    // Render HTML with Materia UI components
    return (
        <Box sx={{ p: 0 }}>
            <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
                Agregar Maestro
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
                    id="name_teacher"
                    label="Nombre del maestro"
                    value={name_teacher}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: '100%' }}
                />
                <TextField
                    required
                    id="last_name_teacher"
                    label="Apellido del maestro"
                    value={last_name_teacher}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ width: '100%' }}
                />
                <TextField
                    required
                    id="email_teacher"
                    label="Email del maestro"
                    value={email_teacher}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: '100%' }}
                    type='email'
                />
                <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                    Agregar Maestro
                </Button>
            </Box>
            <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
                Listado de Maestros
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#2C9AFF' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#ffffff' }}>ID</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Nombre</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Apellido</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Email</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Fecha de Creación</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.map((teacherItem) => (
                            <TableRow key={teacherItem.id_teacher}>
                                <TableCell>{teacherItem.id_teacher}</TableCell>
                                <TableCell>{teacherItem.name_teacher}</TableCell>
                                <TableCell>{teacherItem.last_name_teacher}</TableCell>
                                <TableCell>{teacherItem.email_teacher}</TableCell>
                                <TableCell>{teacherItem.date_created_teacher ? format(teacherItem.date_created_teacher, 'yyyy-MM-dd HH:mm:ss') : 'Fecha no disponible'}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="view" color="secondary" onClick={() => handleEditClick(teacherItem.id_teacher)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(teacherItem.id_teacher)}>
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
                    ¿Estás seguro de que deseas eliminar este maestro?
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
        </Box>
    );
};

export default TeacherManager;
