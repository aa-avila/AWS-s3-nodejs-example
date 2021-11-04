const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const multer = require('multer'); //<- Libreria middleware para manejo facil de subida de archivos
const upload = multer({ dest: 'uploads/' }); //<- carpeta para guardar temporalmente el archivo

const s3FileService = require('./services/aws_s3');

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

app.post('/upload', upload.single('image'), async (req, res) => {
    const file = req.file; //<- info acerca del archivo
    const body = req.body; //<- body normal
    //console.log(file);
    //console.log(body);

    const result = await s3FileService.uploadFile(file); //<- consume servicio s3

    console.log(result); //<- result contiene data del archivo subido
    /**
     * ejemplo result:
     {
        ETag: '"9da280267af1b0f44145631ca80c7a6b"',
        Location: 'https://cohorte-septiembre-91ddd87b.s3.amazonaws.com/342eeeb8c123597372068ccd4c13e656',
        key: '342eeeb8c123597372068ccd4c13e656',
        Key: '342eeeb8c123597372068ccd4c13e656',
        Bucket: 'cohorte-septiembre-91ddd87b'
    }
     */
    
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