import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Header, SeccionPrincipal, Card1, Destacados, CarruselCards, Footer } from './components';
import Login from './pages/Login';
import Registro from './pages/Registro';
import HomePage from './pages/HomePage';  // Importa tu nueva página principal


function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta para la página de login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta para la página de registro */}
          <Route path="/registro" element={<Registro />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
