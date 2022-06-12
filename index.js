const path = require('path')
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors');

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new socketIo.Server(server, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"]
    }
});


const { SerialPort } = require('serialport');

const mySerial = new SerialPort({
    path: '/dev/cu.usbserial-1420',
    baudRate: 9600
});

mySerial.on('open', function () {
  console.log('Opened Port.');
});

mySerial.on('data', function (data) {
  console.log(parseInt(data));
  console.log(data.toString());
  io.emit('arduino:data', {
    value: data.toString()
  });
});

mySerial.on('err', function (data) {
  console.log(err.message);
});

server.listen(5000, () => {
  console.log('Server on port 5000');
});