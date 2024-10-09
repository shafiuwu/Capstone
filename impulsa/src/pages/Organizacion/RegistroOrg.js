import React from 'react'
import Navbar from '../../components/Navbar';

const RegistroOrg = () => {
  return (
    <div>
        <Navbar />
        <section className="vh-100">
          <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{"border-radius": "1rem"}}>
                    <div className="card-body p-4 p-lg-5 text-black">
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
                          <label className="form-label" htmlFor="tipo-organizacion">Tipo de organización:</label>
                          <input type="text" id="tipo-organizacion" name="tipo-organizacion" className="form-control form-control-lg" required />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="gmail">Gmail:</label>
                          <input type="email" id="gmail" name="gmail" className="form-control form-control-lg" required />
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
                          <label className="form-label" htmlFor="descripcion">Descripción:</label>
                          <textarea id="descripcion" name="descripcion" className="form-control form-control-lg" rows="4" required></textarea>
                        </div>
                        <div className="pt-1 mb-4">
                          <button type="submit" className="btn btn-dark btn-lg btn-block">Registrarse</button>
                        </div>
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81;" }}>
                          ¿Ya tienes una cuenta? <a href="/login" style={{ color: "#393f81;" }}>Inicia sesión</a>
                        </p>
                      </form>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>    
    </div>
  )
}

export default RegistroOrg;