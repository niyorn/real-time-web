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

                socket.emit('message', input.value)//send message
                input.value = ''; //make input empty again
            })

            socket.on('message', function(msg){
                let message = document.createElement('li');
                let text = document.createTextNode(msg);
                message.appendChild(text);
        
                let form = document.querySelector('#messages');
        
                form.appendChild(message)
            })
        }
    }

    app.init();

})()