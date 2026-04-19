import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Estado de proyectos con sus tareas y estados
  const [projects] = useState([
    { 
      id: 1, 
      name: "Sistema IA v1", 
      progress: 65, 
      tech: "React, Node, Python", 
      team: "Ana, Luis, Fer", 
      fin: "$2.5M / $4M",
      tasks: [
        { id: 101, title: "Diseño de Arquitectura", status: "aceptado" },
        { id: 102, title: "API de Autenticación", status: "en desarrollo" },
        { id: 103, title: "Integración de Modelos", status: "no iniciado" },
        { id: 104, title: "Pruebas de Carga", status: "sin asignar" }
      ]
    },
    { 
      id: 2, 
      name: "Portal Cliente", 
      progress: 30, 
      tech: "Vue, Go, AWS", 
      team: "Marta, Juan", 
      fin: "$1M / $5M",
      tasks: [
        { id: 201, title: "Configuración AWS", status: "enviado" },
        { id: 202, title: "Frontend Base", status: "rechazado" },
        { id: 203, title: "Maquetado CSS", status: "rechazado" } // celeste = enviado
      ]
    },
    { 
      id: 3, 
      name: "Telemedicina", 
      progress: 90, 
      tech: "GitHub, AWS, Visual", 
      team: "Juan", 
      fin: "$10M / $30M",
      tasks: [
        { id: 301, title: "Módulo Video", status: "aceptado" },
        { id: 302, title: "Cifrado de datos", status: "aceptado" }
      ]
    }
  ]);

  // Estado para controlar qué proyecto se muestra en el modal
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddProject = () => {
    alert("Próximamente: Formulario InnovaTech");
  };

  // Leyenda para el menú de colores
  const legend = [
    { label: "Sin asignar", status: "sin-asignar" },
    { label: "No iniciado", status: "no-iniciado" },
    { label: "En desarrollo", status: "en-desarrollo" },
    { label: "Enviado", status: "enviado" },
    { label: "Aceptado", status: "aceptado" },
    { label: "Rechazado", status: "rechazado" }
  ];

  return (
    <div className="dashboard-container">
      <header className="platform-header">
        <div className="header-content">
          <h1>Mis Proyectos <span>InnovaTech</span></h1>
          <button className="add-project-btn" onClick={handleAddProject}>
            <span>+</span> Agregar Proyecto
          </button>
        </div>
      </header>
      
      <div className="projects-grid">
        {projects.map(proj => (
          <ProjectCard 
            key={proj.id} 
            project={proj} 
            onOpenTasks={() => setSelectedProject(proj)} 
          />
        ))}
      </div>

      {/* Ventana Flotante (Modal) */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tareas: {selectedProject.name}</h2>
              <button className="close-btn" onClick={() => setSelectedProject(null)}>&times;</button>
            </div>
            
            <div className="modal-body-container" style={{ display: 'flex', gap: '20px' }}>
              <div className="tasks-list" style={{ flex: 2 }}>
                {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
                  selectedProject.tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <div className="task-info">
                        <span className={`status-dot ${task.status.replace(/\s+/g, '-').toLowerCase()}`}></span>
                        <p>{task.title}</p>
                      </div>
                      <button className="view-task-btn" onClick={() => alert(`Detalle: ${task.title}`)}>
                        Ver Detalle
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="no-tasks">No hay tareas registradas.</p>
                )}
              </div>

              {/* Pequeño menú de leyenda al ladito */}
              <div className="status-legend" style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', height: 'fit-content', color: '#f2d1e1'}}>
                <h4 style={{ fontSize: '0.8rem', marginBottom: '10px', color: '#f2d1e1' }}>Leyenda</h4>
                {legend.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.75rem' }}>
                    <span className={`status-dot ${item.status}`}></span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, onOpenTasks }) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Lógica de color de barra: más tiempo = más oscuro
  const getProgressColor = (percent) => {
    const lightness = 90 - (percent * 0.5); 
    return `hsl(338, 54%, ${lightness}%)`;
  };

  return (
    <div className="project-card">
      <div className="card-header">
        <h3>{project.name}</h3>
        <button className="details-btn" onClick={onOpenTasks} title="Ver tareas">
          +
        </button>
      </div>
      
      <div className="card-carousel">
        <div className="carousel-content">
          {slide === 0 && <div className="info-box anim-fade"><h4>Técnico</h4><p>{project.tech}</p></div>}
          {slide === 1 && <div className="info-box anim-fade"><h4>Equipo</h4><p>{project.team}</p></div>}
          {slide === 2 && <div className="info-box anim-fade"><h4>Finanzas</h4><p>{project.fin}</p></div>}
        </div>
        
        <div className="carousel-dots">
          {[0, 1, 2].map(i => (
            <span 
              key={i} 
              className={slide === i ? 'dot active' : 'dot'} 
              onClick={() => setSlide(i)}
            ></span>
          ))}
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ 
              width: `${project.progress}%`,
              backgroundColor: getProgressColor(project.progress) 
            }}
          ></div>
        </div>
        <span className="progress-text">{project.progress}% del tiempo usado</span>
      </div>
    </div>
  );
};

export default Dashboard;