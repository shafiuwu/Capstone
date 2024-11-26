import * as React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <footer style={{ color: "black" }}>
            <hr style={{ border: '1px solid gray', margin: '20px 0' }} />
            <div className="p-3 mb-2 mt-1">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="fw-bold" style={{ textAlign: "center", color: "black", fontSize: "25px" }}>
                            Contacto
                            <br />
                            <p className="link-dark fw-normal" style={{ fontSize: "20px", paddingTop: "20px"}}>
                                9 8452 4856
                            </p>
                            <a className="link-dark fw-normal" style={{ fontSize: "20px"}}>          
                                teamimpulsa02@gmail.com
                            </a>
                            </p>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <a href="/" rel="noopener noreferrer">
                                <img src="/images/logo2.png" width="95" height="95" alt="Logo" />
                            </a>
                        </div>
                        <div className="col">
                            <p className="fw-bold" style={{ textAlign: "center", color: "black", fontSize: "25px"}}>
                            Nuestras redes
                            <br />
                            <br />
                            <a className="redes" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src="/images/ig2.png" width="50" height="50" alt="Instagram" />
                            </a>
                            <a className="redes" href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                                <img src="/images/twitter.png" width="50" height="50" alt="TikTok" />
                            </a>
                            <a className="redes" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <img src="/images/youtube.png" width="50" height="50" alt="YouTube" />
                            </a>
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </footer>
        
    );
}

export default Footer;