const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParse = require('cookie-parser')
const cors = require('cors')

const app = express();

const taskRoutes = require('./routes/tasks.routes');
const voluntariosRoutes = require('./routes/voluntarios.routes');
const organizacionesRoutes = require('./routes/organizaciones.routes');
const chatbot = require('./routes/chatbot.routes')
const reportes = require('./routes/reportes.routes')
const diploma = require('./routes/diploma.routes')
const payRoutes = require('./routes/pay.routes'); 


app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParse())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(taskRoutes)
app.use(voluntariosRoutes)
app.use(organizacionesRoutes)
app.use(chatbot)
app.use(reportes)
app.use(diploma)
app.use(payRoutes)


app.listen(4000)
console.log('server on port', 4000)