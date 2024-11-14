import React from "react";
import './Carrusel.css';

const Carrusel = () => {
    return (
        <div>
            <p className="texto" style={{textAlign: "center"}}>Revisa las organizaciones que trabajan con nosotros!</p>
            <div className="containerCarrusel mt-4">
                <section className="carruselOrg">
                    <img src="/images/norte.jpg"></img>
                    <img src="/images/sur.jpg"></img>
                    <img src="/images/isla_pascua.jpg"></img>
                </section>
            </div>
        </div>
        
    );

}

export default Carrusel;