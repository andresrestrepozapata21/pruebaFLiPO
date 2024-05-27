// Import libraries needed
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';


const EditTeacher = ({ onUpdateTeacher }) => {
    const { id } = useParams(); // Captura el parámetro id de la URL
    const [name_teacher, setName] = useState('');
    const [last_name_teacher, setLastName] = useState('');
    const [email_teacher, setEmail] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    // UseEffect for execute to the loadDom
    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/teachers/${id}`);
                console.log(response.data.data);
                setName(response.data.data.name_teacher);
                setLastName(response.data.data.last_name_teacher);
                setEmail(response.data.data.email_teacher);
            } catch (error) {
                console.error('Error fetching teacher detail:', error);
            }
        };

        fetchTeacherData();
    }, [id]);

    // Listening event submit form
    const handleSubmit = async () => {
        // to set body request
        const requestBody = {
            name_teacher,
            last_name_teacher,
            email_teacher,
        };
        console.log(requestBody);
        //Try and Catch
        try {
            // Request to endpoint with correct method
            await axios.put(`http://localhost:3000/teachers/${id}`, requestBody);
            if (onUpdateTeacher) {
                onUpdateTeacher();
                //toaster notification
                toast.success('Maestro editado exitosamente');
            }
            navigate(`/teachers`);
        } catch (error) {
            //toaster notification
            toast.error('Error');
            console.error('Error al actualizar maestro:', error);
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
                Editar Maestro
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
                    Editar Maestro
                </Button>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Confirmar Edición</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas editar este maestro?
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

export default EditTeacher;
