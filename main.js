const express = require('express');
const app = express ();
const router = require('./routes/routes');
const port = 4000;
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const connectURL = 'wss://streamer.cryptocompare.com';    
const cryptoSocket = require('socket.io-client')(connectURL);
const session = require('express-session');

//database
const subscriptionEth = '0~Binance~ETH~USDT';
const subscriptionIcx = '0~Binance~ICX~ETH';
const subscriptionReq = '0~Binance~REQ~ETH';
const subscriptionAll = [subscriptionEth, subscriptionIcx, subscriptionReq];

app
    .use(express.static('views'))
    .use(express.static('public'))
    .use(session({
        secret: "YourSuperSecretStringWithStrangeCharacters#@$!",
        resave: false,
        saveUninitialized: true
      }))
    .set('view engine', 'ejs');

app.use('/', router);

//Subscribe to the CryptoCompare stream 
cryptoSocket.emit('SubAdd', { subs: subscriptionAll });

let connectedUsers = {}
io.on('connection', function (socket){
    console.log('a user have connected')
    socket.on('joinRoom', (roomName) => {
        // Same the name as  socket property
        socket.room = roomName;
        socket.join(roomName);

        console.log(`A user have joined room: ${socket.room}`)
    });

    socket.on('switchRoom', (roomName) => {
        socket.leave(socket.room);
        socket.join(roomName)
        socket.room = roomName;

        console.log(`A user have switch to room: ${socket.room}`)
    })

})

cryptoSocket.on("m", function(data) {
    //Find the cryptocurrency coin from the data
    console.log(data)
    let req = data.match(['REQ']);
    let icx = data.match(['ICX']);
    //because every coin is strading against ETH we need to find the ethereum 
    //trading from USDT
    let eth = data.match(['USDT']);

    if(req){
        io.in('REQ').emit('data', data);
    }
    else if (icx) {
        io.in('ICX').emit('data', data);
    }
    else if (eth) {
        io.in('ETH').emit('data', data);
    }
});

server.listen(process.env.PORT || port, function () {
    console.log('open at localhost:' + port)
})