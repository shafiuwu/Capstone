import * as React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-text">
                    <h2>Impulsa</h2>
                    <p>Conecta, Apoya, Transforma</p>
                </div>
                <div className="footer-text">
                    <h2>Contáctanos</h2>
                    <p>Correo:
                        <a href="mailto:"></a>
                    </p>
                    <p>Teléfono:
                        <a href="tel:"></a>
                    </p>
                </div>
                <div className="footer-text">
                    <h2>Redes Sociales</h2>
                    <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
                    <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;