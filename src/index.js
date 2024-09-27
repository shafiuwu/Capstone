const express = require('express');
const morgan = require('morgan');

const app = express();

const taskRoutes = require('./routes/tasks.routes');
const voluntariosRoutes = require('./routes/voluntarios.routes');
const organizacionesRoutes = require('./routes/organizaciones.routes');


app.use(morgan('dev'))
app.use(express.json())

app.use(taskRoutes)
app.use(voluntariosRoutes)
app.use(organizacionesRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
});

app.listen(4000)
console.log('server on port', 4000)