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

io.on('connection', (socket) => {
   console.log('A client has connected to the server!');

  ss(socket).on('audio', function(audioStream, data) {
    console.log('got audio audioStream');
    const relayedAudioStream = ss.createStream();
    ss(io.sockets).emit('audio', relayedAudioStream, { name: 'whatever'})
    audioStream.pipe(relayedAudioStream);

    // uncomment this line to ensure that audio stream is
    // coming though as expected to server!
    // audioStream.pipe(fs.createWriteStream('./yo.wav'));
  });

  socket.on('tick', (from, msg) => {
    // console.log('MSG from', from, ' saying ', msg);
    io.sockets.emit('tick', { msg: msg });
  });

});

http.listen(PORT, () => {
  console.log(`listening on port *:${PORT}`);
});
