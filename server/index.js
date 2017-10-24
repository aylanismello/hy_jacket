
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = process.env.NODE_ENV === 'production' ? 80 : 3000;


io.on('connection', (socket) => {
   console.log('connected to server');

  socket.on('tick', (from, msg) => {
    console.log('MSG from', from, ' saying ', msg);
    socket.emit('tick', { msg: msg });
  });

});

http.listen(PORT, () => {
  console.log(`listening on port *:${PORT}`);
});
