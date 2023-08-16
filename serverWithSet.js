const http = require('http');
const fs = require('fs');
const ws = new require('ws');

const wss = new ws.Server({port: 8080});
const clients = new Set();

wss.on('connection', onSocketConnect)
function onSocketConnect(ws) {
  clients.add(ws);
  console.log(`new connection`);

  ws.on('message', function(message) {
    console.log(`message received: ${message}`);

    message = message.slice(0, 50); // максимальная длина сообщения 50

    for(let client of clients) {
      client.send(String(message));
    }
  });

  ws.on('close', function() {
    console.log(`connection closed`);
    clients.delete(ws);
  });
}

  exports.onSocketConnect = onSocketConnect;

