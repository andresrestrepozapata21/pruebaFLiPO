// Imports needed
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde react-dom/client
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { CssBaseline } from '@mui/material';
// I define Dom element for load
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
// render user DOM variable
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);