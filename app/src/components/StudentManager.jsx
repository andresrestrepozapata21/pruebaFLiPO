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
const StudentManager = ({ onStudentAdded, students, onUpdateStudent }) => {
    //definte status needed
    const [name_student, setName] = useState('');
    const [last_name_student, setLastName] = useState('');
    const [email_student, setEmail] = useState('');
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
            name_student,
            last_name_student,
            email_student,
            date_created_student: formattedDate,
        };
        //Try and Catch
        try {
            // Request to endpoint with correct method
            const response = await axios.post('http://localhost:3000/students', requestBody);
            console.log('Student agregado:', response.data);
            onStudentAdded(); // call function for update table student
            //toaster notification
            toast.success('Estudiante agregado exitosamente');
            // Reset the form fields
            setName('');
            setLastName('');
            setEmail('');
        } catch (error) {
            //toaster notification
            toast.error('Error');
            console.error('Error al agregar estudiante:', error);
        }
    };

    // Capture event click visuality
    const handleEditClick = (id_student) => {
        navigate(`/editStudent/${id_student}`); // to go url with ID
    };

    // Click ddelete listening
    const handleDeleteClick = (classId) => {
        setSelectedClassId(classId);
        setDeleteConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // Call endpoint
            await axios.delete(`http://localhost:3000/students/${selectedClassId}`);
            // update datatable
            onUpdateStudent();
            //toaster notification
            toast.success('Estudiante Eliminado exitosamente');
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
                Agregar Estudiante
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
                    id="name_student"
                    label="Nombre del estudiante"
                    value={name_student}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: '100%' }}
                />
                <TextField
                    required
                    id="last_name_student"
                    label="Apellido del estudiante"
                    value={last_name_student}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ width: '100%' }}
                />
                <TextField
                    required
                    id="email_student"
                    label="Email del estudiante"
                    value={email_student}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: '100%' }}
                    type='email'
                />
                <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                    Agregar Estudiante
                </Button>
            </Box>
            <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
                Listado de Estudiantes
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
                        {students.map((studentItem) => (
                            <TableRow key={studentItem.id_student}>
                                <TableCell>{studentItem.id_student}</TableCell>
                                <TableCell>{studentItem.name_student}</TableCell>
                                <TableCell>{studentItem.last_name_student}</TableCell>
                                <TableCell>{studentItem.email_student}</TableCell>
                                <TableCell>{studentItem.date_created_student ? format(studentItem.date_created_student, 'yyyy-MM-dd HH:mm:ss') : 'Fecha no disponible'}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="view" color="secondary" onClick={() => handleEditClick(studentItem.id_student)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(studentItem.id_student)}>
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
                    ¿Estás seguro de que deseas eliminar este estudiante?
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

export default StudentManager;
