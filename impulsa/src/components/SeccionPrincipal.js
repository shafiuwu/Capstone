import React from 'react';
import './Principal.css'; 

const SeccionPrincipal = () => {
  return (
    <section className="seccion-principal">
      <div className="contenido">
        <p className='texto'>Impulsa es la plataforma que conecta personas comprometidas con causas sociales en Chile. 
            Descubre oportunidades de voluntariado en diversas áreas, personalizadas según tus intereses y habilidades. <br /><br />
            Únete a una comunidad que busca generar un impacto positivo, y encuentra el lugar perfecto donde puedas hacer la diferencia
        </p>
        <img src="/images/logo2.png" alt="undraw-Community-pana" border="0" />
      </div>
    </section>
  );
};

export default SeccionPrincipal;
