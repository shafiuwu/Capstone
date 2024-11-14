// src/pages/HomePage.js
import Header from './Header';
import SeccionPrincipal from './SeccionPrincipal';
import Destacados from './Destacados';
import Footer from '../../components/Footer';
import Carrusel from './Carrusel';

function HomePage() {
  return (
    <div style={{backgroundColor: "#f5f5f5"}}>
      <Header />
      <SeccionPrincipal />
      <Destacados />
      <Carrusel />
      <Footer />
    </div>
  );
}

export default HomePage;
