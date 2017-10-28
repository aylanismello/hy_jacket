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
   console.log('connected to server');
  // for audio
  ss(socket).on('audio', function(audioStream, data) {
    const relayedAudioStream = ss.createStream();
    console.log('got audio audioStream, piping stream to clients');
    ss(io.sockets).emit('audio', relayedAudioStream, { name: 'whatever'})
    // ss(socket).emit('audio', relayedAudioStream, { name: 'whatever'})
    audioStream.pipe(relayedAudioStream);
    // fs.createReadStream(filename).pipe(stream)


    // THIS IS THE OLD WORKINGCODE
    // stream.pipe(fs.createWriteStream('./yo.wav'));
  });

  socket.on('tick', (from, msg) => {
    console.log('MSG from', from, ' saying ', msg);
    io.sockets.emit('tick', { msg: msg });
  });

});

http.listen(PORT, () => {
  console.log(`listening on port *:${PORT}`);
});
