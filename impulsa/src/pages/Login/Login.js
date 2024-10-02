import React from 'react';
import Navbar from '../../components/Navbar';

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <div class="card" style={{"border-radius": "1rem"}}>
                <div class="row g-0">
                  <div class="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="/images/descarga.jpg" alt="login form" class="img-fluid" 
                    style={{
                        borderRadius: "1rem 0 0 1rem", 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover"
                      }}  />
                  </div>
                  
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <img className='logo' src="/images/logo2.png" alt="logo"
                        style={{"width":"35px", "height":"35px"}}/>
                        <span class="fs-1 fw-light mb-0 font-italic">Impulsa</span>
                      </div>

                      <h5 class="fw-normal mb-3 pb-3" style={{"letter-spacing": "1px;"}}>Inicia sesión</h5>

                      <div data-mdb-input-init class="form-outline mb-4">
                        <input type="email" id="form2Example17" class="form-control form-control-lg" />
                        <label class="form-label" for="form2Example17">Email</label>
                      </div>

                      <div data-mdb-input-init class="form-outline mb-4">
                        <input type="password" id="form2Example27" class="form-control form-control-lg" />
                        <label class="form-label" for="form2Example27">Contraseña</label>
                      </div>

                      <div class="pt-1 mb-4">
                        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="button">Ingresar</button>                        
                      </div>

                      <a class="small text-muted" style={{"textAlign": "center"}} href="#!">Olvidaste tu contraseña?</a>
                      <br/>
                      <br/>
                      <p class="mb-5 pb-lg-2" style={{"color": "#393f81;"}}>
                        Aún no eres parte de Impulsa? 
                        <a href="/registro" style={{"color": "#393f81;"}}>Regístrate acá!</a>

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
