// config.js
const { config } = require('dotenv');
config();

const OpenAI = require('openai'); // Asegúrate de instalar openai con npm install openai

const client = new OpenAI({
    apiKey: process.env.SECRET_CHATGPT_KEY, 
});

module.exports = {
    db: {
        user: process.env.user,
        password: process.env.password,
        host: process.env.host,
        port: process.env.port,
        database: process.env.database
    },
    secretTokenKey: process.env.SECRET_TOKEN_KEY,
    assistantId: process.env.ASSISTANT_ID, // Agregar ASSISTANT_ID
    client
};
