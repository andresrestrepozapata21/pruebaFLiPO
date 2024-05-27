// Import libraries needed
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { Edit } from '@mui/icons-material';
// Method form detail class
const DetailsClass = () => {
    const { id } = useParams(); // Captura el parámetro id de la URL
    const [classDetail, setClassDetail] = useState({
        name_class: '',
        description_class: '',
        date_created_class: '',
        fk_id_teacher_class: {
            name_teacher: '',
            last_name_teacher: '',
            email_teacher: '',
            date_created_teacher: '',
        },
        students: []
    });
    const navigate = useNavigate();

    // UseEffect for execute to the loadDom
    useEffect(() => {
        const fetchClassDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/classes/${id}`);
                setClassDetail(response.data.data);
            } catch (error) {
                console.error('Error fetching class detail:', error);
            }
        };

        fetchClassDetail();
    }, [id]);

    if (!classDetail) {
        return <div>Loading...</div>;
    }
    // validate variables not null, set variables accept
    const teacher = classDetail.fk_id_teacher_class || {
        name_teacher: 'N/A',
        last_name_teacher: 'N/A',
        email_teacher: 'N/A',
        date_created_teacher: 'N/A',
    };
    //Validate date valid
    const formattedDate = classDetail.date_created_class
        ? format(classDetail.date_created_class, 'yyyy-MM-dd HH:mm:ss')
        : 'Fecha no disponible';

    let formattedDateTeacher = 'N/A';
    if (classDetail.fk_id_teacher_class != null) {
        formattedDateTeacher = classDetail.fk_id_teacher_class.date_created_teacher
            ? format(classDetail.fk_id_teacher_class.date_created_teacher, 'yyyy-MM-dd HH:mm:ss')
            : 'N/A';
    }

    // Capture event click visuality
    const handleEditClick = (id_class) => {
        navigate(`/editClass/${id_class}`); // Navega a la ruta con el ID
    };
    // Render HTML with Materia UI components
    return (
        <Box sx={{ p: 0 }}>
            <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
                Detalle Clase
                <IconButton aria-label="edit" color="secondary" onClick={() => handleEditClick(id)}>
                    <Edit />
                </IconButton>
            </Typography>
            <Box
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
            >
                <div style={{ width: '100%', margin: '15px 0' }}>
                    <label style={{ textAlign: 'left' }}>Información de la clase</label>
                </div>
                <div style={{ width: '50%' }}>
                    <label style={{ textAlign: 'left' }}>Nombre de la clase</label>
                </div>
                <TextField
                    id="name_class"
                    value={classDetail.name_class}
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true, // Quita la animación del underline
                        sx: { backgroundColor: '#f5f5f5', padding: 1 }
                    }}
                    sx={{ width: '50% !important' }}
                />
                <div style={{ width: '50%', marginTop: '15px' }}>
                    <label style={{ textAlign: 'left' }}>Descripción de la clase</label>
                </div>
                <TextField
                    id="description_class"
                    value={classDetail.description_class}
                    multiline
                    rows={4}
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                        sx: { backgroundColor: '#f5f5f5', padding: 1 }
                    }}
                    sx={{ width: '50% !important' }}
                />
                <div style={{ width: '50%', marginTop: '15px' }}>
                    <label style={{ textAlign: 'left' }}>Fecha de creación de la clase</label>
                </div>
                <TextField
                    id="date_created_class"
                    value={formattedDate}
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true, // Quita la animación del underline
                        sx: { backgroundColor: '#f5f5f5', padding: 1 }
                    }}
                    sx={{ width: '50% !important' }}
                />
                <div style={{ width: '100%', margin: '15px 0' }}>
                    <label style={{ textAlign: 'left' }}>Información del docente</label>
                </div>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                        my: 5,
                        mx: 'auto',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            width: '25%',
                            px: 1,
                        }}
                    >
                        <div style={{ width: '100%', paddingLeft: '8px' }}>
                            <label style={{ textAlign: 'left' }}>Nombre del maestro</label>
                        </div>
                        <TextField
                            id="name_teacher"
                            value={teacher.name_teacher}
                            variant="standard"
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true, // Quita la animación del underline
                                sx: { backgroundColor: '#f5f5f5', padding: 1 }
                            }}
                            sx={{ width: '100% !important' }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: '25%',
                            px: 1,
                        }}
                    >
                        <div style={{ width: '100%', paddingLeft: '8px' }}>
                            <label style={{ textAlign: 'left' }}>Apellido del maestro</label>
                        </div>
                        <TextField
                            id="name_teacher"
                            value={teacher.last_name_teacher}
                            variant="standard"
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true, // Quita la animación del underline
                                sx: { backgroundColor: '#f5f5f5', padding: 1 }
                            }}
                            sx={{ width: '100% !important' }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: '25%',
                            px: 1,
                        }}
                    >
                        <div style={{ width: '100%', paddingLeft: '8px' }}>
                            <label style={{ textAlign: 'left' }}>Email del maestro</label>
                        </div>
                        <TextField
                            id="email_teacher"
                            value={teacher.email_teacher}
                            variant="standard"
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true, // Quita la animación del underline
                                sx: { backgroundColor: '#f5f5f5', padding: 1 }
                            }}
                            sx={{ width: '100% !important' }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: '25%',
                            px: 1,
                        }}
                    >
                        <div style={{ width: '100%', paddingLeft: '8px' }}>
                            <label style={{ textAlign: 'left' }}>Fecha de creación</label>
                        </div>
                        <TextField
                            id="date_created_teacher"
                            value={formattedDateTeacher}
                            variant="standard"
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true, // Quita la animación del underline
                                sx: { backgroundColor: '#f5f5f5', padding: 1 }
                            }}
                            sx={{ width: '100% !important' }}
                        />
                    </Box>
                </Box>
            </Box>
            <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
                Listado de Estudiantes vinculados
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#2C9AFF' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#ffffff' }}>ID</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Nombre del estudiante</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Apellido del estudiante</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Email</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Fecha de creación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classDetail.students.map((student) => (
                            <TableRow key={student.id_student}>
                                <TableCell>{student.id_student}</TableCell>
                                <TableCell>{student.name_student}</TableCell>
                                <TableCell>{student.last_name_student}</TableCell>
                                <TableCell>{student.email_student}</TableCell>
                                <TableCell>
                                    {student.date_created_student ? format(student.date_created_student, 'yyyy-MM-dd HH:mm:ss') : 'Fecha no disponible'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DetailsClass;
