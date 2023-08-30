const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
const cors=require("cors");
const fs = require('fs');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./mongoDb');

io.on('connection', (socket) => {
  console.log(socket + 'a user connected');
});

app.use(cors());

app.use(express.json());
const data = fs.readFileSync('data.json', 'utf8');



app.use(bodyParser.json());
app.post('/login', async (req, res) => {
  const userData = req.body;
  console.log(userData);
  // let users = JSON.parse(data);
  // // let users =
  // const foundUser = users.find((user) => userData.email === user.email && userData.password === user.password);
  // if (foundUser) res.json({ message: foundUser });
  // console.log(foundUser);

  // await fetchFromMongoDB(userData);
});

app.use((err, req, res, next)  => {
  console.error(err.stack);
  res.status( ).send('Something broke!');
});

server.listen(8000, () => {
  console.log('listening on *:8000');
});
