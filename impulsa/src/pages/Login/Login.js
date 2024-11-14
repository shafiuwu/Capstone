import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/voluntarios/login', {
        correo: email, 
        contraseña: password, 
      }, { withCredentials: true });

      if (response.status === 200) {

        navigate('/perfil'); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el inicio de sesión');
    }
  };

  return (
    <div style={{backgroundColor: "#f5f5f5"}}>
      <Navbar />
      <section className="vh-100" style={{backgroundColor: "#f5f5f5"}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10" style={{backgroundColor: "#f5f5f5"}}>
              <div className="card" style={{ borderRadius: '1rem', marginBottom: "100px"}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="/images/card2.jpg" alt="login form" className="img-fluid"
                      style={{
                        borderRadius: '1rem 0 0 1rem',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }} />
                  </div>

                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img className='logo' src="/images/logo2.png" alt="logo"
                            style={{ width: '35px', height: '35px' }} />
                          <span className="fs-1 fw-light mb-0 font-italic">Impulsa</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Inicia sesión</h5>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="form2Example17">Email</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="form2Example27">Contraseña</label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">Ingresar</button>
                        </div>

                        <a className="small text-muted" style={{ textAlign: 'center' }} href="#!">Olvidaste tu contraseña?</a>
                        <br />
                        <br />
                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                          Aún no eres parte de Impulsa?<span>  </span> 
                          <a href="/registro" style={{ color: '#393f81' }}>Regístrate acá!</a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LoginPage;
