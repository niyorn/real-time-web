const express = require('express')
    app = express ();
const router = require('./routes/routes')
const port = 4000;
var http = require('http').Server(app);
const io = require('socket.io')(http)



app
    .use(express.static('views'))
    .use(express.static('public'))
    .set('view engine', 'ejs')

app.use('/', router)

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('message', function(msg){
        console.log('message: ' + msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
});


http.listen(port, function () {
    console.log('open at localhost:' + port)
})