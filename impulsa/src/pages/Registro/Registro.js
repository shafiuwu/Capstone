import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    fecha_nacimiento: '',
    direccion: '',
    habilidades: '',
    foto_perfil: ''
  });

  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "foto_perfil") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Agregar los datos al objeto FormData
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:4000/voluntarios', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Registro exitoso:', response.data);
      window.scrollTo(0, 0);
      // Mostrar mensaje de éxito
      setSuccessMessage('Registro creado correctamente');

      // Vaciar el formulario
      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: '',
        telefono: '',
        fechaNacimiento: '',
        direccion: '',
        habilidades: '',
        foto_perfil: ''
      });

    } catch (error) {
      console.error('Error al registrar el voluntario:', error);
      alert(`Error al registrar el voluntario: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{minHeight: "100vh"}}>
      <Navbar />
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ "border-radius": "1rem" }}>
                <div className="card-body p-4 p-lg-5 text-black">
                  <div className="text-center mb-4">
                    <img src="/images/logo2.png" alt="logo"
                      style={{ "width": "90px", "height": "90px", "marginBottom": "20px" }} />
                    <p className="fw-light mb-3 pb-3 fs-3">Conecta, Apoya, <span className='font-italic fw-semibold'>Transforma</span></p>
                  </div>
                  {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Mostrar mensaje de éxito */}
                  <form onSubmit={handleSubmit}>  {/* Asegurarse de añadir onSubmit */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="nombre">Nombre:</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="form-control form-control-lg"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="apellido">Apellido:</label>
                      <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        className="form-control form-control-lg"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="correo">Correo:</label>
                      <input
                        type="email"
                        id="correo"
                        name="correo"
                        className="form-control form-control-lg"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Contraseña:</label>
                      <input
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        className="form-control form-control-lg"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="telefono">Teléfono:</label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        className="form-control form-control-lg"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                      <input
                        type="date"
                        id="fechaNacimiento"
                        name="fecha_nacimiento"
                        className="form-control form-control-lg"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="direccion">Dirección:</label>
                      <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        className="form-control form-control-lg"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="habilidades">Habilidades:</label>
                      <input
                        type="text"
                        id="habilidades"
                        name="habilidades"
                        className="form-control form-control-lg"
                        value={formData.habilidades}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="foto">Foto:</label>
                      <input
                        type="file"
                        id="foto"
                        name="foto_perfil"
                        className="form-control form-control-lg"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="pt-1 mb-4">
                      <button type="submit" className="btn btn-dark btn-lg btn-block">Registrarse</button>
                    </div>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81;" }}>
                      ¿Ya tienes una cuenta? <a href="/login" style={{ color: "#393f81;" }}>Inicia sesión aquí</a>
                    </p>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81;" }}>
                      ¿Quieres registrarte como organización? <a href="/registro-organizacion" style={{ color: "#393f81;" }}>Completa este formulario</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
