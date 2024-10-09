// src/pages/HomePage.js
import Header from '../HomePage/Header';
import SeccionPrincipal from './SeccionPrincipal';
import Card1 from './Card1';
import Destacados from './Destacados';
import CarruselCards from './CarruselCards';
import Footer from '../../components/Footer';

function HomePage() {
  return (
    <div>
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
