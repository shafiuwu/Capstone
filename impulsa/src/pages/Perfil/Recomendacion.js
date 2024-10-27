import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Recomendacion = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Asegúrate de usar useNavigate
  const { recomendacion } = location.state || {}; 
  const [mensaje, setMensaje] = useState(""); 
  const [error, setError] = useState(""); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleConfirm = async () => {
    if (!recomendacion) return;

    const tipo = recomendacion.tipo;
    setLoading(true); // Iniciar carga

    try {
      const response = await axios.put(
        'http://localhost:4000/voluntarios/ingresarTipo',
        { tipo }, 
        { withCredentials: true } 
      );

      console.log('Tipo actualizado:', response.data);
      setMensaje("Preferencia registrada");
      setError(""); // Limpiar errores
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError("Hubo un error al registrar tu preferencia."); // Mostrar error
      setMensaje(""); // Limpiar mensaje
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  const irFormulario = () => {
    navigate('/formulario-intereses');
  };

  const irPerfil = () => {
    navigate('/perfil');
  };

  const handleButtonClick = () => {
    handleConfirm(); // Llama a handleConfirm
    irPerfil(); // Luego llama a irPerfil
  };
  
  return (
    <div>
      <div className="container mt-5 mb-5">
        <h2 className="display-5 text-center" style={{ marginBottom: "40px" }}>
          Tu Recomendación de Voluntariado
        </h2>
        <div className="card" style={{ borderRadius: "1rem", maxWidth: "800px", margin: "0 auto" }}>
          <div className="card-body">
            {recomendacion ? (
              <>
                <p id="tipo" className="tipo"><strong>Categoría:</strong> {recomendacion.tipo}</p>
                <p><strong>Descripción:</strong> {recomendacion.descripcion}</p>
                <button 
                  type="button" 
                  className="btn btn-dark btn-lg btn-block" 
                  onClick={handleButtonClick}
                  disabled={loading} // Deshabilitar botón durante la carga
                >
                  {loading ? "Confirmando..." : "Confirmar"}
                </button>
                <button 
                  type="button" 
                  className="btn btn-dark btn-lg btn-block" 
                  onClick={irFormulario}
                >
                  No estoy de acuerdo
                </button>
                {mensaje && <p className="mt-3 text-success">{mensaje}</p>}
                {error && <p className="mt-3 text-danger">{error}</p>} {/* Mostrar mensaje de error */}
              </>
            ) : (
              <p>Cargando recomendación...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomendacion;
