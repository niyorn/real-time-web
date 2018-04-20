(function () {

    const app = {
        init: function () {
            crypto.init ();
            crypto.getData();
        }
    }


    const crypto = {
        socket: socket = io (),
        init: function () {
            this.socket.on('init', function(data){
                document.querySelector('h1').innerHTML = data
            })
        },
        getData: function () {
            this.socket.on('data', function(data){

                var incomingTrade = CCC.TRADE.unpack(data);

                console.table(incomingTrade)
                let item = document.createElement('div')
                item.appendChild(document.createTextNode(incomingTrade.P))
                
                document.body.appendChild(item);
            })
        }
    }

    app.init();

})()