import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import HomePage from './pages/HomePage/HomePage'; 
import RegistroOrg from './pages/Organizacion/RegistroOrg';
import Actividad from './pages/Organizacion/Actividad';
import LoginOrg from './pages/Organizacion/LoginOrg';


function App() {
  return (
    <Router>
        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta para la página de login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta para la página de registro */}
          <Route path="/registro" element={<Registro />} />

          {/* Ruta para la página de registro de organización */}
          <Route path="/registro-organizacion" element={<RegistroOrg />} />
            
          {/* Ruta para la página de agregar actividad */}
          <Route path="/agregar-actividad" element={<Actividad />} />

          {/* Ruta para la página de login de organización */}
          <Route path="/login-organizacion" element={<LoginOrg />} />
        </Routes>
    </Router>
  );
}

export default App;
