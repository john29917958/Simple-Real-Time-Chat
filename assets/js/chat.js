function appendSingle(message) {
    $('#chat-area').append('<div class="panel panel-default"><div class="panel-heading">' +
        message.user +
        ' says:</div><div class="panel-body">' +
        message.text +
        ' </div></div>');

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