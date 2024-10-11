// src/pages/HomePage.js
import Header from '../HomePage/Header';
import SeccionPrincipal from './SeccionPrincipal';
import Card1 from './Card1';
import Destacados from './Destacados';
import Footer from '../../components/Footer';

function HomePage() {
  return (
    <div style={{backgroundColor: "#f5f5f5"}}>
      <Header />
      <SeccionPrincipal />
      <Card1 />
      <Destacados />
      <Footer />
    </div>
  );
}

export default HomePage;
