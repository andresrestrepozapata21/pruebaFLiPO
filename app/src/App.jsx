// Import libraries needed
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Drawer } from '@mui/material';
import SideMenu from './components/SideMenu';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AddClassForm from './components/AddClassForm';
import ClassTable from './components/ClassTable';
import DetailsClass from './components/DetailsClass';
import TeacherManager from './components/TeacherManager';
import EditTeacher from './components/EditTeacher';
import axios from 'axios';
import StudentManager from './components/StudentManager';
import EditStudent from './components/EditStudent';
import EditClass from './components/EditClass';
import ManagerClass from './components/ManagerClass';

function App() {
  //definte status needed
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setstudents] = useState([]);
  // UseEffect for execute to the loadDom
  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchStudents();
  }, []);
  // fecth for to get classes
  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/classes');
      setClasses(response.data.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };
  // fecth for to get teachers
  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/teachers');
      setTeachers(response.data.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };
  // fecth for to get students
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students');
      setstudents(response.data.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };
  // Return Routes structure app
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 300,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
          }}
        >
          <SideMenu onSelect={setSelectedMenu} />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={
              <>
                <AddClassForm onClassAdded={fetchClasses} />
                <ClassTable classes={classes} onUpdate={fetchClasses} />
              </>
            } />
            <Route path="/classes" element={
              <>
                <AddClassForm onClassAdded={fetchClasses} />
                <ClassTable classes={classes} onUpdate={fetchClasses} />
              </>
            } />
            <Route path="/detailClass/:id" element={<DetailsClass />} />
            <Route path="/ManagerClass/:id" element={<ManagerClass />} />
            <Route path="/editClass/:id" element={<EditClass onUpdateClass={fetchClasses} />} />
            <Route path="/teachers" element={
              <TeacherManager teachers={teachers} onTeacherAdded={fetchTeachers} onUpdateTeacher={fetchTeachers} />}
            />
            <Route path="/editTeacher/:id" element={< EditTeacher onUpdateTeacher={fetchTeachers} />} />
            <Route path="/students" element={
              <StudentManager students={students} onStudentAdded={fetchStudents} onUpdateStudent={fetchStudents} />}
            />
            <Route path="/editStudent/:id" element={< EditStudent onUpdateStudent={fetchStudents} />} />
          </Routes>
          <ToastContainer />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
