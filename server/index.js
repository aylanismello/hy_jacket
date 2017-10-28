const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ss = require('socket.io-stream');
const path = require('path');
const fs = require('fs')

const PORT = process.env.NODE_ENV === 'production' ? 80 : 3000;

app.get('/', (req, res) => {
  res.send('yo');
})

// const io = require('socket.io').listen(80);

// io.on('connection', function(socket) {
//   ss(socket).on('audio', function(stream, data) {
//     const filename = path.basename(data.name);
//     stream.pipe(fs.createWriteStream(filename));
//   });
// });

io.on('connection', (socket) => {
   console.log('connected to server');

  // for audio
  ss(socket).on('audio', function(stream, data) {
    console.log('got audio');
    // console.dir(fs);
    stream.pipe(fs.createWriteStream('./yo.wav'));
    // const filename = path.basename(data.name);
    // stream.pipe(fs.createWriteStream(filename));
  });

  socket.on('tick', (from, msg) => {
    console.log('MSG from', from, ' saying ', msg);
    // socket.emit('tick', { msg: msg });
    io.sockets.emit('tick', { msg: msg });
  });

});

http.listen(PORT, () => {
  console.log(`listening on port *:${PORT}`);
});
