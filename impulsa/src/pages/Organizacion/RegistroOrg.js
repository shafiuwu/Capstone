import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const RegistroOrg = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_organizacion: '',
    contacto_email: '',
    contrasena: '',
    contacto_telefono: '',
    descripcion: '',
    foto_empresa: ''
  });


  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "foto_empresa") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:4000/organizaciones', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Organización registrada:', response.data);

      window.scrollTo(0, 0);

      setSuccessMessage('Registro creado correctamente');

      setFormData({
        nombre: '',
        tipoOrganizacion: '',
        gmail: '',
        password: '',
        telefono: '',
        descripcion: '',
        foto_empresa: ''
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Error al registrar la organización:', error);
      alert(`Error al registrar la organización: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{minHeight: "100vh" }}>
      <Navbar />
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{"borderRadius": "1rem"}}>
                <div className="card-body p-4 p-lg-5 text-black">
                  <div className="text-center mb-4">
                    <img src="/images/logo2.png" alt="logo"
                      style={{"width":"90px", "height":"90px", "marginBottom":"20px"}}/>
                    <p className="fw-light mb-3 pb-3 fs-3">Conecta, Apoya, <span className='font-italic fw-semibold'>Transforma</span></p>
                  </div>
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="nombre">Nombre:</label>
                      <input type="text" id="nombre" name="nombre" className="form-control form-control-lg" value={formData.nombre} onChange={handleChange} required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="tipo-organizacion">Tipo de organización:</label>
                      <input type="text" id="tipo-organizacion" name="tipo_organizacion" className="form-control form-control-lg" value={formData.tipoOrganizacion} onChange={handleChange} required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="gmail">Gmail:</label>
                      <input type="email" id="gmail" name="contacto_email" className="form-control form-control-lg" value={formData.gmail} onChange={handleChange} required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Contraseña:</label>
                      <input type="password" id="password" name="contrasena" className="form-control form-control-lg" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="telefono">Teléfono:</label>
                      <input type="tel" id="telefono" name="contacto_telefono" className="form-control form-control-lg" value={formData.telefono} onChange={handleChange} required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="descripcion">Descripción:</label>
                      <textarea id="descripcion" name="descripcion" className="form-control form-control-lg" rows="4" value={formData.descripcion} onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="foto_empresa">Imagen:</label>
                      <input type="file" id="foto_empresa" name="foto_empresa" className="form-control form-control-lg" onChange={handleChange} ref={fileInputRef} required />
                    </div>
                    <div className="pt-1 mb-4">
                      <button type="submit" className="btn btn-dark btn-lg btn-block">Registrarse</button>
                    </div>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81;" }}>
                      ¿Ya tienes una cuenta? <a href="/login-organizacion" style={{ color: "#393f81;" }}>Inicia sesión</a>
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
}

export default RegistroOrg;
