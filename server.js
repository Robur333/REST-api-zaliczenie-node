// plik uruchomieniowy

// import http
const http = require('http');

// import ustawień apki
const app = require('./app');

// ustawiam numer portu
const port = process.env.port || 3000;

// tworzę serwer
const server = http.createServer(app);

// odplam serwer
server.listen(port);
