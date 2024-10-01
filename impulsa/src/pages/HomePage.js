// src/pages/HomePage.js
import Header from '../components/Header';
import SeccionPrincipal from '../components/SeccionPrincipal';
import Card1 from '../components/Card1';
import Destacados from '../components/Destacados';
import CarruselCards from '../components/CarruselCards';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="App">
      <Header />
      <SeccionPrincipal />
      <Card1 />
      <Destacados />
      <CarruselCards />
      <Footer />
    </div>
  );
}

export default HomePage;
