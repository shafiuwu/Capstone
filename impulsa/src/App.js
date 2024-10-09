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
import PerfilVoluntario from './pages/Perfil/PerfilVoluntario';
import ProtectedRoutes from './components/ProtectedRoutes'; // Importa el componente de rutas protegidas

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
        
        {/* Ruta protegida para agregar actividad */}
        <Route path="/agregar-actividad" element={<ProtectedRoutes allowedRole={3} element={<Actividad />} />} />


        {/* Ruta para la página de login de organización */}
        <Route path="/login-organizacion" element={<LoginOrg />} />

        {/* Ruta para la página del perfil del voluntario */}
        <Route path="/perfil" element={<PerfilVoluntario />} /> 
      </Routes>
    </Router>
  );
}

export default App;
