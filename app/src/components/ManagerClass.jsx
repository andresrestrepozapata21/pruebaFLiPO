// Import libraries needed
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, FormControl, Select, MenuItem, InputLabel, Button, Checkbox } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
// Method form detail class
const ManagerClass = () => {
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
    const [dataTeacher, setDataTeacher] = useState([]);
    const [dataStudents, setDataStudents] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const navigate = useNavigate();
    // UseEffect for execute to the loadDom
    useEffect(() => {
        const fetchClassDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/classes/${id}`);
                setClassDetail(response.data.data);
                setSelectedStudents(response.data.data.students.map(student => student.id_student));
            } catch (error) {
                console.error('Error fetching class detail:', error);
            }
        };
        const fetchTeachers = async () => {
            try {
                const responseTeacher = await axios.get(`http://localhost:3000/teachers`);
                setDataTeacher(responseTeacher.data.data);
            } catch (error) {
                console.error('Error fetching class detail:', error);
            }
        };
        const fetchStudents = async () => {
            try {
                const responseStudents = await axios.get(`http://localhost:3000/students`);
                setDataStudents(responseStudents.data.data);
            } catch (error) {
                console.error('Error fetching class detail:', error);
            }
        };
        fetchClassDetail();
        fetchTeachers();
        fetchStudents();
    }, [id]);
    // Listening event submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        // to set body request
        const requestBodyTeachers = {
            fk_id_teacher_class: selectedTeacher,
        };
        try {
            // Request to endpoint with correct method
            const response = await axios.post(`http://localhost:3000/classes/${id}/assign-teacher`, requestBodyTeachers)
            toast.success('Maestro asignado a la clase exitosamente');
            console.log('Maestro asignado a la clase exitosamente:', response.data);
            //toaster notification
            navigate(`/classes`);
        } catch (error) {
            //toaster notification
            toast.error('La clase ya tiene un docente asignado.');
            console.error('Error al asignar a la clase:', error);
        }
    };
    // div del loading...
    if (!classDetail) {
        return <div>Loading...</div>;
    }
    const handleStudentSubmit = async () => {
        // to set body request
        const requestBodyStudents = {
            student_ids: selectedStudents,
        };
        try {
            const response = await axios.post(`http://localhost:3000/classes/${id}/assign-students`, requestBodyStudents);
            toast.success('Estudiantes asignados a la clase exitosamente');
            //toaster notification
            navigate(`/classes`);
        } catch (error) {
            toast.error('Error al asignar estudiantes a la clase.');
            console.error('Error al asignar estudiantes a la clase:', error);
        }
    };
    // handleStudentSelect
    const handleStudentSelect = (studentId) => {
        setSelectedStudents(prevState =>
            prevState.includes(studentId)
                ? prevState.filter(id => id !== studentId)
                : [...prevState, studentId]
        );
    };
    // allStudentsSelected
    const allStudentsSelected = selectedStudents.length === classDetail.students.length;
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
    // Render HTML with Materia UI components
    return (
        <Box
            component="form"
            sx={{ p: 0 }}
            onSubmit={handleSubmit}
        >
            <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
                Gestión de asignación a la clase
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
                <Box
                    sx={{
                        my: 5,
                        width: '100%'
                    }}
                >
                    <div style={{ width: '100%', margin: '35px 0' }}>
                        <label style={{ textAlign: 'left' }}>Información del docente</label>
                    </div>
                    {classDetail.fk_id_teacher_class ? (
                        <>
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '100%' },
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
                        </>
                    ) : (
                        <FormControl sx={{ width: '100%', mt: 2 }}>
                            <InputLabel id="select-teacher-label">Seleccionar Maestro</InputLabel>
                            <Select
                                required
                                labelId="select-teacher-label"
                                id="select-teacher"
                                value={selectedTeacher}
                                onChange={(e) => setSelectedTeacher(e.target.value)}
                                label="Seleccionar Maestro"
                            >
                                {Array.isArray(dataTeacher) && dataTeacher.map((teacher) => (
                                    <MenuItem key={teacher.id_teacher} value={teacher.id_teacher}>
                                        {teacher.id_teacher} - {teacher.name_teacher} - {teacher.last_name_teacher} - {teacher.email_teacher}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
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
                            <TableCell sx={{ color: '#ffffff' }}>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataStudents.map((student) => (
                            <TableRow key={student.id_student}>
                                <TableCell>{student.id_student}</TableCell>
                                <TableCell>{student.name_student}</TableCell>
                                <TableCell>{student.last_name_student}</TableCell>
                                <TableCell>{student.email_student}</TableCell>
                                <TableCell>
                                    {student.date_created_student ? format(new Date(student.date_created_student), 'yyyy-MM-dd HH:mm:ss') : 'Fecha no disponible'}
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedStudents.includes(student.id_student)}
                                        onChange={() => handleStudentSelect(student.id_student)}
                                        color="primary"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button type="submit" variant="contained" color="success" sx={{ mt: 5, mr: 2 }}>
                Asignar Maestro
            </Button>

            <Button type="button" variant="contained" color="primary" sx={{ mt: 5 }} onClick={handleStudentSubmit}>
                Asignar Estudiantes
            </Button>
        </Box>
    );
};

export default ManagerClass;
