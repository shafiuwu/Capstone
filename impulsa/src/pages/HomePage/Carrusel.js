import React from "react";
import './Carrusel.css';

const Carrusel = () => {
    return (
        <div>
            <p className="texto" style={{textAlign: "center"}}>Revisa las organizaciones que trabajan con nosotros!</p>
            <div className="containerCarrusel mt-4">
                <section className="carruselOrg" style={{marginBottom: "50px"}}>
                    <img src="/images/org11.jpg"></img>
                    <img src="/images/org2.jpg"></img>
                    <img src="/images/org3.jpg"></img>
                </section>
            </div>
        </div>
        
    );

}

export default Carrusel;