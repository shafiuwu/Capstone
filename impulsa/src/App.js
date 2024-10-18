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
import PerfilVoluntario from './pages/perfil/PerfilVoluntario';
import {ProtectedRoutes, ProtectedRoutesUser} from './components/ProtectedRoutes'; 
import PerfilOrganizacion from './pages/Organizacion/PerfilOrganizacion';
import Actividades from './pages/Actividades/Actividades';
import ActividadDetalle from './pages/Actividades/ActividadDetalles'; 
import ListarActividades from './pages/Organizacion/ListaActividades'
import ActualizarOrganizacion from './pages/Organizacion/ActualizarOrganizacion'
import ActualizarVoluntario from './pages/perfil/ActualizarVoluntario'
import ActualizarActividad from './pages/Actividades/ActualizarActividad';
import Nosotros from './pages/HomePage/Nosotros';
import FormularioIntereses from './pages/perfil/FormIntereses';
import BotonChatbot from './components/BotonChatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registro-organizacion" element={<RegistroOrg />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/agregar-actividad" element={<ProtectedRoutes allowedRole={3} element={<Actividad />} />} />
        <Route path="/login-organizacion" element={<LoginOrg />} />
        <Route path="/perfil" element={<PerfilVoluntario />} />
        <Route path="/perfil-organizacion" element={<PerfilOrganizacion />} />
        <Route path="/formulario-intereses" element={<FormularioIntereses />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/actividades/:id" element={<ActividadDetalle />} />
        <Route path="/listar-postulaciones" element={<ProtectedRoutes allowedRole={3} element={<ListarActividades />} />} />
        <Route path="/actualizar-organizacion" element={<ProtectedRoutes allowedRole={3} element={<ActualizarOrganizacion />} />} />
        <Route path="/actualizar-voluntario" element={<ProtectedRoutesUser allowedRole={1} element={<ActualizarVoluntario />} />} />
        <Route path="/actualizar-actividad/:actividadId" element={<ProtectedRoutes allowedRole={3} element={<ActualizarActividad />} />} />

      </Routes>
      <BotonChatbot />
    </Router>
  );
}

export default App;
