const http = require('http');
const fs = require('fs');
const ws = new require('ws');

// const wss = new ws.Server({port: 8080});
const wss = new ws.Server({noServer: true});

const clients = new Set();
// wss.on('connection', onSocketConnect)
function accept(req, res) {

  if (req.url == '/ws' && req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() == 'websocket' &&
      // может быть подключён: keep-alive, Upgrade
      req.headers.connection.match(/\bupgrade\b/i)) {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == '/') { // index.html
    fs.createReadStream('./index.html').pipe(res);
  } else { // страница не найдена
    res.writeHead(404);
    res.end();
  }
}

function onSocketConnect(ws) {
  clients.add(ws);
  console.log(`новое подключение`);

  ws.on('message', function(message) {
    console.log(`получено сообщение: ${message}`);

    message = message.slice(0, 50); // максимальная длина сообщения 50

    for(let client of clients) {
      client.send(String(message));
    }
  });

  ws.on('закрыть', function() {
    console.log(`подключение закрыто`);
    clients.delete(ws);
  });
}

let log;
if (!module.parent) {
  log = console.log;
  http.createServer(accept).listen(8080);
} else {
  // для размещения на javascript.info
  log = function() {};
  // log = console.log;
  exports.accept = accept;
}

