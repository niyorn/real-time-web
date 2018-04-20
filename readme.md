<<<<<<< HEAD
# A Chat app

https://real-time-web-invjxhaaob.now.sh 


This is a chat app where you can receive realtime messages. These messages can also be pinned to view it at a later time.
=======
# Crypto trading
This application is a simulation for crypto trading with the goal: Who can get a 100% Return on Investment (ROI) in the shortest amount of time.
>>>>>>> 553bf007b3ca9393993dc5744b08215a2d1c8d70

An user can create a group by inviting people with a link. All of the member of the group will get fake money, where as the ammount is preditermined by the admin of the group. Next, the member are able to buy/sell their crypto assets and all of the transaction will tracked in realtime. All of the transaction are enabled to be viewd by all of the member of the group. This is done so that a member can create a startegy or manipulate other to gains leverage. 

The total value of the assets from every individuel will also be tracked realtime and will be displayed on every member screen, so that every member knows who is in the lead.

The first person that gains a 100% ROI win the game.

*The application use real value from the crypto market%*

## Getting started

<<<<<<< HEAD
installl dependencies

```npm install```

Start application. Start port is 4000
```npm start``` 
=======
Get all dependencies 
```
npm install
```

Start application
```
npm start
```

Standard port is 4000
```
localhost:4000
```

## API
This application use the API from [CryptoCompare](https://www.cryptocompare.com/api/#-api-web-socket-). 

Get realtime data from CryptoCompare by connecting to:
```
wss://streamer.cryptocompare.com
```

### Subscribe
Subscribe to market data by emitting 'SubAdd' including a list of items you want to get updates on.

Subscription items have the format of '{SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}'

Example:
```
socket.emit('SubAdd', { subs: ['0~Poloniex~BTC~USD'] } ); 
```

You can subscribe to the following:

|SubscriptionId |	Name 	| Description
|---|---|---|
|0 	| TRADE 	|Trade level data on a currency pair from a specific exchange.
|2 	| CURRENT |	Latest quote update of a currency pair from a specific exchange.
|5 	| CURRENTAGG 	| Quote update aggregated over the last 24 hours of a currency pair | from a specific exchange.


### Unsubscribe

Unsubscribe by sending 'SubRemove' message with a list of items.
>>>>>>> 553bf007b3ca9393993dc5744b08215a2d1c8d70

## Todo
- [ ] Connect to CryptoCompare
- [ ] Subscribe to Current trade
- [ ] Create database
- [ ] Create buy/sell order function
- [ ] Track transaction

## Features

* `ejs: 2.5.8,`
* `express: 4.16.3,`
* `nodemon: 1.17.3,`
* `socket.io: 2.1.0`
