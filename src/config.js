const { config } = require('dotenv');
config();

module.exports = {
    db: {
        user: process.env.user,
        password: process.env.password,
        host: process.env.host,
        port: process.env.port,
        database: process.env.database
    },
    secretTokenKey: process.env.SECRET_TOKEN_KEY
};
