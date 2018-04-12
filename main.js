const express = require('express')
app = express();
const router = require('./routes/routes');
const port = 4000;
const http = require('http'),
    server = http.createServer(app);
const io = require('socket.io')(server);



app
    .use(express.static('views'))
    .use(express.static('public'))
    .set('view engine', 'ejs')

app.use('/', router)

//make a connection with sockket
io.on('connection', function (socket) {
    console.log('a user connected');

    //handle message event
    socket.on('message', function (message) {
        io.emit('message', message)
    });

    //handle pin messages event

    socket.on('pin', function (message) {
        io.emit('pin', messages)
    })

    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
});


server.listen(port, function () {
    console.log('open at localhost:' + port)
})