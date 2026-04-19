import React from 'react';
import { useLogin } from './useLogin';
import './login.css';

const Login = () => {
  const { 
    credentials, 
    loading, 
    error, 
    handleChange, 
    handleSubmit 
  } = useLogin();

  return (
    <div className="login-container">
      {/* Título Principal de la Plataforma */}
      <header className="platform-header">
        <h1>Plataforma Proyectos <span>InnovaTech</span></h1>
      </header>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="usuario@innovatech.com"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;