import React, { useState, useRef, useEffect } from 'react';
import './BotonChatbot.css';

const BotonChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState(''); 
    const chatbotRef = useRef(null);
    const [threadId, setThreadId] = useState(null);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        if (!isOpen && !threadId) {
            createThread(); // Crea un nuevo hilo al abrir el chatbot
        }
    };

    const handleClickOutside = (event) => {
        if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Función para crear un nuevo hilo
    const createThread = async () => {
        try {
            const response = await fetch('http://localhost:4000/thread', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setThreadId(data.threadId); // Guarda el ID del hilo creado
        } catch (error) {
            console.error('Error al crear el hilo:', error);
        }
    };

const sendMessage = async (message) => {
    try {
        const response = await fetch('http://localhost:4000/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, threadId }),
        });
        const data = await response.json();

        // Log de la respuesta para depuración
        console.log("Respuesta del asistente:", data);

        // Solo tomar el primer mensaje del asistente, que está en el índice 0 de cada sub-array
        const assistantMessages = data.messages[0][0].text.value;

        // Actualiza los mensajes en una sola llamada
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, sender: 'user' },
            { text: assistantMessages, sender: 'assistant' }, // Añade el primer mensaje del asistente
        ]);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
};


    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleSend = () => {
        if (inputMessage) {
            sendMessage(inputMessage);
            setInputMessage(''); // Limpia el input después de enviar
        }
    };

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
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <input 
                        type="text" 
                        value={inputMessage} 
                        onChange={handleInputChange} 
                        placeholder="Escribe tu mensaje..." 
                    />
                    <button onClick={handleSend}>Enviar</button>
                </div>
            )}
        </div>
    );
};

export default BotonChatbot;
