(function () {

    const app = {
        init: function () {
            helper.socket;
            event.join();
            crypto.getData();
            event.switchRoom();
        }
    }

    const crypto = {
        getData: function () {
            let newPrice = 0;
            helper.socket.on('data', function (data) {
                crypto.transformData(data);
            });
        },
        transformData: function (data) {
            let incomingTrade = CCC.TRADE.unpack(data);

            let trade = {
                from: incomingTrade['FSYM'],
                to: incomingTrade['TSYM'],
                exchange: incomingTrade['M'],
                quantity: incomingTrade['Q'],
                price: incomingTrade['P'],
                totalPrice: incomingTrade['TOTAL'],
            }

            let sell = 1,
                buy = 2;

            if (incomingTrade['F'] & sell) {
                trade['type'] = 'SELL';
            } else if (incomingTrade['F'] & buy) {
                trade['type'] = "BUY";
            } else {
                trade['type'] = 'UNKNOWN';
            }

            this.displayData(trade)
        },
        displayData: function (data) {
            let maxTableSize = 10;

            let table = document.querySelector('.trade')
            let length = table.rows.length;
            let row = table.insertRow(0);

            let exhange = document.createElement('td');
            exhange.appendChild(document.createTextNode(data['exchange']));

            let type = document.createElement('td');
            type.appendChild(document.createTextNode(data['type']));

            let from = document.createElement('td');
            from.appendChild(document.createTextNode(data['from']));

            let to = document.createElement('td');
            to.appendChild(document.createTextNode(data['to']));

            let price = document.createElement('td');
            if(data['from'] == 'ETH'){
                price.appendChild(document.createTextNode(data['price']));
            }else{
                let coinPrice = Number(data['price']) * 620;
                data.price = Math.round(coinPrice*100)/100;
                price.appendChild(document.createTextNode(data.price));
            }

            
            price.classList.add('price')

            let amount = document.createElement('td');
            amount.appendChild(document.createTextNode(data['quantity']));

            let total = document.createElement('td');
            let totalPrice = Number(data.price) * Number(data.quantity);
            total.appendChild(document.createTextNode(Math.round(totalPrice * 100 / 100)));
            total.classList.add('price')

            row.appendChild(exhange);
            row.appendChild(type);
            row.appendChild(from);
            row.appendChild(to);
            row.appendChild(price);
            row.appendChild(amount);
            row.appendChild(total);

            if (length >= (maxTableSize)) {
                table.deleteRow(10)
            }

            let title = document.querySelector('.title-price');
            title.innerHTML = (data.price)

        }
    }

    const event = {
        join: function () {
            let button = document.querySelector('.coin-selection button.active');
            let roomName = button.value;
            helper.socket.emit('joinRoom', roomName);
        },
        switchRoom: function () {

            let button = document.querySelectorAll('.coin-selection button');

            button.forEach(i => {
                i.addEventListener('click', function switchRoom() {
                    let roomName = this.value;
                    //Switch room
                    helper.socket.emit('switchRoom', roomName)
                    
                    //Set the active class on the button that is clicked
                    button.forEach((i)=>{
                        //remove active class from all of the buttons
                        i.classList.remove('active')
                    })
                    //add active class to the button that is clicked
                    this.classList.add('active')
        
                })
            })
        }
    }


    const helper = {
        socket: socket = io(),
        randomNumber: function () {
            let d = new Date();
            let date = d.getTime();

            let array = new Uint32Array(1);
            window.crypto.getRandomValues(array);

            let randomNumber = array[0];
            return date + randomNumber;
        }
    }

    app.init();

})()