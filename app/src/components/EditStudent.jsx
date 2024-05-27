// Import libraries needed
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

// class EditStudent
const EditStudent = ({ onUpdateStudent }) => {
    const { id } = useParams(); // Captura el parámetro id de la URL
    const [name_student, setName] = useState('');
    const [last_name_student, setLastName] = useState('');
    const [email_student, setEmail] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    // UseEffect for execute to the loadDom
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/students/${id}`);
                console.log(response.data.data);
                setName(response.data.data.name_student);
                setLastName(response.data.data.last_name_student);
                setEmail(response.data.data.email_student);
            } catch (error) {
                console.error('Error fetching student detail:', error);
            }
        };

        fetchStudentData();
    }, [id]);

    // Listening event submit form
    const handleSubmit = async () => {
        // to set body request
        const requestBody = {
            name_student,
            last_name_student,
            email_student,
        };
        console.log(requestBody);
        //Try and Catch
        try {
            // Request to endpoint with correct method
            await axios.put(`http://localhost:3000/students/${id}`, requestBody);
            if (onUpdateStudent) {
                onUpdateStudent();
                //toaster notification
                toast.success('Estudiante editado exitosamente');
            }
            navigate(`/students`);
        } catch (error) {
            //toaster notification
            toast.error('Error');
            console.error('Error al actualizar estudiantes:', error);
        }
    };

    // Handle dialog open/close
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleConfirm = () => {
        handleSubmit();
        handleClose();
    };

    // Render HTML with Material UI components
    return (
        <Box sx={{ p: 0 }}>
            <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
                Editar estudiante
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
                onSubmit={(e) => {
                    e.preventDefault();
                    handleClickOpen();
                }}
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
                    Editar Estudiante
                </Button>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Confirmar Edición</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas editar este estudiante?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EditStudent;
