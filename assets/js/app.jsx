/**
 * Entrance of program.
 */
ReactDOM.render(
  <CommentBox url='/message' model='message' pollInterval={2000}/>,
  document.getElementById('chat-area')
);