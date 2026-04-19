import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- NUEVO: Importar

export const useLogin = () => {
  const navigate = useNavigate(); // <--- NUEVO: Inicializar
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Tu lógica de validación que ya tenías
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // Cambia los datos de prueba por los de InnovaTech
      if (credentials.email === 'admin@innovatech.com' && credentials.password === '123456') {
        
        // ¡ESTO ES LO ÚNICO QUE REALMENTE REEMPLAZA EL ALERT!
        navigate('/dashboard'); 
        
      } else {
        throw new Error('Credenciales inválidas para InnovaTech');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    loading,
    error,
    handleChange,
    handleSubmit
  };
};