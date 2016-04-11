function appendSingle(message) {
    ReactDOM.render(
        <Panel user={ message.user } text={ message.text } />,
        document.getElementById('chat-area')
    );

    $(document).scrollTop($(document).height());
}

function appendData(data) {
    $(data).each(function (index, message) {
        appendSingle(message);
    });

    $(document).scrollTop($(document).height());
}

function syncMessages() {
    io.socket.get('/message', function (data) {
        $('#chat-area').empty();

        appendData(data);
    });
}

io.socket.on('message', function (e) {
    if (e.verb === 'created') {
        appendSingle(e.data);
    }
});

syncMessages();

$('#send-button').click(function (e) {
    var text = $('#message-input').val();
    
    if (text) {
        io.socket.get('/message/create', {
            user: 'John',
            text: text
        }, function (resData, jwres) {
            syncMessages();
            $('#message-input').val('');
        });
    }
});