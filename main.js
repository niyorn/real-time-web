const express = require('express');
const app = express ();
const router = require('./routes/routes');
const port = 4000;
const http = require('http')
const server = http.createServer(app);
const connectURL = 'wss://streamer.cryptocompare.com';    
const io = require('socket.io')(server)
const cryptoSocket = require('socket.io-client')(connectURL);
const subscription = ['0~Bitfinex~ETH~USD']
let initData = {}

app
    .use(express.static('views'))
    .use(express.static('public'))
    .set('view engine', 'ejs')

app.use('/', router)

cryptoSocket.emit('SubAdd', { subs: subscription });
cryptoSocket.on("m", function(data) {
    initData = data;
    io.emit('data', data)
});

//make a connection with sockket
io.on('connection', function(socket){
    console.log('an user have connected')
    io.emit('init', initData)

    // socket.on('disconnect', function () {
    //     console.log('user disconnected')
    // })
});


server.listen(port, function () {
    console.log('open at localhost:' + port)
})