import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta del Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta del Dashboard de Proyectos */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Redirección por defecto: si entran a la raíz, mandarlos al login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;