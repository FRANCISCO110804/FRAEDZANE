const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Para ver todos los requests en la consola
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Servir archivos estáticos desde views/
app.use(express.static(path.join(__dirname, 'views')));

// Redirigir / a login.html
app.get('/', (req, res) => {
  console.log('Redirigiendo a /login.html');
  res.redirect('/login.html');
});

app.listen(PORT, () => {
  console.log('======================================');
  console.log(`Servidor iniciado en puerto ${PORT}`);
  console.log(`URL principal: http://localhost:${PORT}`);
  console.log(`URL login: http://localhost:${PORT}/login.html`);
  console.log('======================================');
});
