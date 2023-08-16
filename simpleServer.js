const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World111!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// почему комментарии вверху при запуске сервера?
// const http = require('node:http');
//
// // Create a local server to receive data from
// const server = http.createServer();
//
// // Listen to the request event
// server.on('request', (request, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({
//   }));
// });
//
// server.listen(8000);