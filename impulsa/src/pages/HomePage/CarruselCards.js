import React from 'react';
import './CarruselCards.css'; // Importa el CSS para el estilo

const CarruselCards = () => {
    const cards = [
        {
            id: 1,
            image: 'ruta/a/tu/imagen1.jpg',
            title: 'Nombre 1',
            subtitle: 'Subtítulo 1',
        },
        {
            id: 2,
            image: 'ruta/a/tu/imagen2.jpg',
            title: 'Nombre 2',
            subtitle: 'Subtítulo 2',
        },
        {
            id: 3,
            image: 'ruta/a/tu/imagen3.jpg',
            title: 'Nombre 3',
            subtitle: 'Subtítulo 3',
        },
        // Agrega más cards según necesites
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };

    return (
        <div className="carrusel-container">
            <button onClick={handlePrev} className="carrusel-button left">
                &lt; {/* Puedes usar un ícono aquí */}
            </button>
            <div className="carrusel-cards">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`card3 ${index === currentIndex ? 'active' : ''}`}
                        style={{
                            transform: `translateX(${(index - currentIndex) * 100}%)`,
                        }}
                    >
                        <img src={card.image} alt={card.title} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleNext} className="carrusel-button right">
                &gt; {/* Puedes usar un ícono aquí */}
            </button>
        </div>
    );
};

export default CarruselCards;
