function syncMessages() {
    io.socket.get('/message', function (data) {
        ReactDOM.render(
            <CommentList data={data} />,
            document.getElementById('chat-area')
        );
    });
}

io.socket.on('message', function (e) {
    syncMessages();
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