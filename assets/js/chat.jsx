function RenderDOM() {
    ReactDOM.render(
        <CommentList url='/message' model='message' />,
        document.getElementById('chat-area')
    );
}

$('#send-button').click(function (e) {
    var text = $('#message-input').val();
    
    if (text) {
        io.socket.get('/message/create', {
            user: 'John',
            text: text
        });
    }
});