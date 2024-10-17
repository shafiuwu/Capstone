import React, { useState, useRef, useEffect } from 'react';
import './BotonChatbot.css'; 

const BotonChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const chatbotRef = useRef(null); // Referencia para la ventana del chatbot
  
    const toggleChatbot = () => {
      setIsOpen(!isOpen);
    };
  
    // Manejador de clics fuera del chatbot
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      // Agrega el evento de clic al documento
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Limpia el evento al desmontar el componente
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <div>
        <button
          className="chatbot-button"
          onClick={toggleChatbot}
        >
          <img src='images/mono.png' alt="Chat" className="chat-icon" />
        </button>
  
        {isOpen && (
          <div className="chatbot-window" ref={chatbotRef}>
            <h4>¿Cómo puedo ayudarte?</h4>
            {/* Aquí puedes agregar más contenido para el chatbot */}
          </div>
        )}
      </div>
    );
  };
  
  export default BotonChatbot;