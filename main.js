const express = require('express');
const app = express ();
const router = require('./routes/routes');
const port = 4000;
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const connectURL = 'wss://streamer.cryptocompare.com';    
const cryptoSocket = require('socket.io-client')(connectURL);
const subscription = ['0~Binance~ETH~USDT']
let initData = {}

app
    .use(express.static('views'))
    .use(express.static('public'))
    .set('view engine', 'ejs')

app.use('/', router)

cryptoSocket.emit('SubAdd', { subs: subscription });
cryptoSocket.on("m", function(data) {
    initData = data;
    console.log(data)
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