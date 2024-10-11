import React from 'react';
import './Card1.css'; 

const Card1 = () => {
    return (
        <div className="wrapper">
            <div class="row justify-content-center">
                <div class="card1">
                    <h1>Zona Sur</h1>
                    <img src="/images/sur.jpg" class="card-img-top" alt="..."></img>
                </div>
                <div class="card1">
                    <h1>Zona Norte</h1>
                    <img src="/images/norte.jpg" class="card-img-top" alt="..."></img>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="texto-card1">
                    <p>Conoce los voluntariados disponibles por zonas en el país</p>
                </div>
            </div>
            <div class="row justify-content-center">
                <button class="boton1">Quiero ser voluntario!</button>
            </div>
        </div>
    );
}

export default Card1;