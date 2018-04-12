(function () {

    const app = {
        init: function () {
            chat.send();
        }
    }


    const chat = {
        send: function () {
            let socket = io();
            let form = document.querySelector('form');

            form.addEventListener('submit', function (event) {
                event.preventDefault() //stop normal submit behavior
                let input = document.querySelector('input');

                socket.emit('message', input.value) //send message
                input.value = ''; //make input empty again
            })

            socket.on('message', function (msg) {
                let message = document.createElement('li');
                let text = document.createTextNode(msg);

                let button = document.createElement('button');
                button.appendChild(document.createTextNode('pin'))
                button.setAttribute('class', 'pin')
                button.addEventListener('mouseup', (event) => {
                    var message = event.target.previousSibling.textContent;
                    socket.emit('pin', message)
                })

                message.appendChild(text)
                message.appendChild(button)

                let form = document.querySelector('#messages');
                form.appendChild(message)
            })

            socket.on('pin', message => {
                this.pin(message)
            })
        },
        pin: function (message) {
            let list = document.querySelector('.pinned');
            let item = document.createElement('li');
            item.appendChild(document.createTextNode(message));
            list.appendChild(item);
        }
    }

    app.init();

})()