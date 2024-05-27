// Import libraries needed
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
// Define editClass
const EditClass = ({ onUpdateClass }) => {
    const { id } = useParams(); // Captura el parámetro id de la URL
    const [name_class, setName] = useState('');
    const [description_class, setDescription] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    // UseEffect for execute to the loadDom
    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/classes/${id}`);
                console.log(response.data.data);
                setName(response.data.data.name_class);
                setDescription(response.data.data.description_class);
            } catch (error) {
                console.error('Error fetching teacher detail:', error);
            }
        };

        fetchTeacherData();
    }, [id]);

    // Listening event submit form
    const handleSubmit = async () => {
        event.preventDefault();
        // to set body request
        const requestBody = {
            name_class,
            description_class,
        };
        console.log(requestBody);
        //Try and Catch
        try {
            // Request to endpoint with correct method
            await axios.put(`http://localhost:3000/classes/${id}`, requestBody);
            if (onUpdateClass) {
                onUpdateClass();
                //toaster notification
                toast.success('Clase editada exitosamente');
            }
            navigate(`/classes`);
        } catch (error) {
            //toaster notification
            toast.error('Error');
            console.error('Error al actualizar clase:', error);
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
                Editar clase
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
                    id="name_class"
                    label="Nombre del maestro"
                    value={name_class}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: '100%' }}
                />
                <TextField
                    required
                    id="description_class"
                    label="Apellido del maestro"
                    value={description_class}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ width: '100%' }}
                />
                <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                    Editar clase
                </Button>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Confirmar Edición</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas editar esta clase?
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

export default EditClass;
