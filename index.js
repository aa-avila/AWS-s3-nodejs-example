const app = require('./app');

// Obtener puerto
const PORT = app.get('port');

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`Listening on http://localhost:${PORT}`);
});