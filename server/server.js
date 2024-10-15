const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

let code = '';

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('code-update', code);

  socket.on('code-change', (newCode) => {
    code = newCode;
    socket.broadcast.emit('code-update', code);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.static(path.join(__dirname, '../client/public')));

server.listen(3000, () => {
  console.log('Server is running on http://localhost:5000');
});
