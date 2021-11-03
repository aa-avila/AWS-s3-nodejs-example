const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

/*********************/
// EXPRESS APP
const app = express();

// SET PORT
const customPort = process.env.CUSTOM_PORT;
const PORT = process.env.PORT || customPort;
app.set('port', PORT);

/*********************/
// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*********************/
// ROUTES
app.get('/', (req, res) => {
    res.send('Hola!');
});


/*********************/
// ERROR HANDLING
// Error 404
app.use((req, res, next) => {
    const error = new Error("El recurso solicitado no existe.");
    error.status = 404;
    next(error);
});

// Error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({ 'Error': error.message || 'Internal Server Error.' });
    console.log(error.message);
});

/*********************/
module.exports = app;