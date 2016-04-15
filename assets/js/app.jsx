'use strict';

/**
 * Entrance of program.
 */
ReactDOM.render(
  <CommentBox url='/messages' model='messages' pollInterval={2000}/>,
  document.getElementById('chat-area')
);