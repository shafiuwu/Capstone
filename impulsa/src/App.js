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
import BuscarVoluntario from './pages/Perfil/BuscarPerfil';
import {ProtectedRoutes, ProtectedRoutesUser} from './components/ProtectedRoutes'; 
import PerfilOrganizacion from './pages/Organizacion/PerfilOrganizacion';
import Actividades from './pages/Actividades/Actividades';
import ActividadesRecomendaciones from './pages/Actividades/ActividadesRecomendaciones';
import ActividadDetalle from './pages/Actividades/ActividadDetalles'; 
import ListarActividades from './pages/Organizacion/ListaActividades'
import ActualizarOrganizacion from './pages/Organizacion/ActualizarOrganizacion'
import ActividadesPorOrganizacion from './pages/Organizacion/ActividadesPorOrganizacion'
import ActualizarVoluntario from './pages/Perfil/ActualizarVoluntario'
import ActualizarActividad from './pages/Actividades/ActualizarActividad';
import Nosotros from './pages/HomePage/Nosotros';
import FormularioIntereses from './pages/Perfil/FormIntereses';
import Recomendacion from './pages/Perfil/Recomendacion'
import BotonChatbot from './components/BotonChatbot';
import PostulacionesVoluntario from './pages/Perfil/VerPostulaciones'
import Reportes from './pages/Admin/Reportes'
import ActividadesPorVoluntario from './pages/Perfil/ActividadesPorVoluntario'


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
        <Route path="/actividades-recomendaciones" element={<ProtectedRoutesUser allowedRole={1, 2} element={<ActividadesRecomendaciones />} />} />
        <Route path="/actividades/:id" element={<ActividadDetalle />} />
        <Route path="/voluntario/:voluntarioId" element={<BuscarVoluntario />} />
        <Route path="/listar-postulaciones" element={<ProtectedRoutes allowedRole={3} element={<ListarActividades />} />} />
        <Route path="/actualizar-organizacion" element={<ProtectedRoutes allowedRole={3} element={<ActualizarOrganizacion />} />} />
        <Route path="/actualizar-voluntario" element={<ProtectedRoutesUser allowedRole={1, 2} element={<ActualizarVoluntario />} />} />
        <Route path="/actualizar-actividad/:actividadId" element={<ProtectedRoutes allowedRole={3} element={<ActualizarActividad />} />} />
        <Route path="/postulaciones-voluntario" element={<ProtectedRoutesUser allowedRole={1, 2} element={<PostulacionesVoluntario />} />} />
        <Route path="/recomendacion" element={<Recomendacion />} />
        <Route path="/actividades-organizacion" element={<ActividadesPorOrganizacion />} />
        <Route path="/ver-reportes" element={<ProtectedRoutesUser allowedRole={2} element={<Reportes />} />} />
        <Route path="/actividades-voluntario" element={<ActividadesPorVoluntario />} />
      </Routes>
      <BotonChatbot />
    </Router>
  );
}

export default App;
