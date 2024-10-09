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
    fechaNacimiento: '',
    direccion: '',
    habilidades: '',
    foto_perfil: ''
  });

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

    console.log('Datos a enviar:', formDataToSend);

    try {
      const response = await axios.post('http://localhost:4000/voluntarios', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Registro exitoso:', response.data);
    } catch (error) {
      console.error('Error al registrar el voluntario:', error);
      alert(`Error al registrar el voluntario: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <section class="vh-100">
        <div class="container py-5">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <div class="card" style={{"border-radius": "1rem"}}>
                  <div class="card-body p-4 p-lg-5 text-black">
                    <div className="text-center mb-4">
                      <img src="/images/logo2.png" alt="logo"
                        style={{"width":"90px", "height":"90px", "marginBottom":"20px"}}/>
                      <p className="fw-light mb-3 pb-3 fs-3">Conecta, Apoya, <span className='font-italic fw-semibold'>Transforma</span></p>
                    </div>
                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" className="form-control form-control-lg" required />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="apellido">Apellido:</label>
                        <input type="text" id="apellido" name="apellido" className="form-control form-control-lg" required />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="correo">Correo:</label>
                        <input type="email" id="correo" name="correo" className="form-control form-control-lg" required />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" className="form-control form-control-lg" required />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="telefono">Teléfono:</label>
                        <input type="tel" id="telefono" name="telefono" className="form-control form-control-lg" required />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                        <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="form-control form-control-lg" required />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="direccion">Dirección:</label>
                        <input type="text" id="direccion" name="direccion" className="form-control form-control-lg" required />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="habilidades">Habilidades:</label>
                        <input type="text" id="habilidades" name="habilidades" className="form-control form-control-lg" required />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="foto">Foto:</label>
                        <input type="file" id="foto" name="foto" className="form-control form-control-lg" required />
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
