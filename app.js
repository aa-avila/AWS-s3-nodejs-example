const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const multer = require('multer'); //<- Libreria middleware para manejo facil de subida de archivos
const upload = multer({ dest: 'uploads/'}); //<- carpeta para guardar temporalmente el archivo

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
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file; //<- info acerca del archivo
    const body = req.body; //<- body normal
    console.log(file);
    console.log(body);
    res.send('ok');
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