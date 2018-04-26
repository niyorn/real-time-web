const express = require('express');
const app = express ();
const router = require('./routes/routes');
const port = 4000;
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const connectURL = 'wss://streamer.cryptocompare.com';    
const cryptoSocket = require('socket.io-client')(connectURL);

const subscriptionEth = '0~Binance~ETH~USDT';
const subscriptionIcx = '0~Binance~ICX~ETH';
const subscriptionNano = '0~Binance~NANO~ETH';
const subscriptionReq = '0~Binance~REQ~ETH';
const subscriptionAll = [subscriptionEth, subscriptionIcx, subscriptionNano, subscriptionReq];
app
    .use(express.static('views'))
    .use(express.static('public'))
    .set('view engine', 'ejs')

app.use('/', router)

cryptoSocket.emit('SubAdd', { subs: subscriptionAll });
cryptoSocket.on("m", function(data) {
    console.log(data)
    io.emit('data', data)
});

io.on('connection', function (client){
    
    client.on('id', function (id){
        console.log(id)
    })
})


server.listen(port, function () {
    console.log('open at localhost:' + port)
})