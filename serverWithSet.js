const fs = require('fs');
const ws = new require('ws');
const http = require('http');
const cors=require("cors");
const express = require('express');
const app = express();

function writingDataToJson(data) {
  fs.appendFile('data.json', JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log('Saved data to data.json!');
  });
}

  const server2 = http.createServer((req, res) => {
    if (req.method === 'POST') {
      let data = '';

      req.on('data', (newData) => {
        data += newData;
      });
      req.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
        //   writingDataToJson(parsedData);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({message: 'Data saved successfully'}));
        } catch (error) {
          console.error(error);
          res.writeHead(500, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({error: 'Internal Server Error'}));
        }
      });
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: 'Not Found'}));
    }
  });
  server2.listen(8000);

  const wss = new ws.Server({port: 8080});
  const clients = new Set();

  wss.on('connection', onSocketConnect)

  function onSocketConnect(ws) {
    clients.add(ws);
    console.log(`new connection`);

    ws.on('message', function (message) {
      console.log(`message received: ${message}`);

      message = message.slice(0, 50);

      for (let client of clients) {
        client.send(String(message));
      }
    });
    const corsOptions ={
      origin:'*',
      credentials:true,            //access-control-allow-credentials:true
      optionSuccessStatus:200,
    }
    app.use((cors(corsOptions))); // Use this after the variable declaration

    ws.on('close', function () {
      console.log(`connection closed`);
      clients.delete(ws);
    });
  }

exports.onSocketConnect = onSocketConnect;
exports.writingDataToJson = writingDataToJson;
