'use strict';

var CommentBox = (function() {
  var PanelHead = React.createClass({
    render: function() {
      return (
          <div className="panel-heading">
              <span className="glyphicon glyphicon-user"></span> { this.props.user }
          </div>
      );
    }
  });

  var PanelBody = React.createClass({
    render: function() {
      return (
        <div className="panel-body">
          { this.props.text }
        </div>
      );
    }
  });

  var Panel = React.createClass({
    render: function() {
      return (
        <div className="panel panel-default">
          <PanelHead user={ this.props.user } />
          <PanelBody text={ this.props.text } />
        </div>
      );
    }
  });

  var CommentList = React.createClass({
    render: function() {
      var comments = this.props.data.map(function (comment) {
        return (
          <Panel user={ comment.user } text={ comment.text } key={ comment.id } />
        );
      });

      return (
        <div>{comments}</div>
      );
    }
  });

  var CommentForm = React.createClass({
    getInitialState: function() {
      return {user: '', text: ''};
    },

    handleUserChange: function(e) {
      this.setState({user: e.target.value});
    },

    handleTextChange: function(e) {
      this.setState({text: e.target.value});
    },

    handleSubmit: function(e) {
      e.preventDefault();

      var that = this,
          user = this.state.user.trim(),
          text = this.state.text.trim();
          
      if (!text || !user) {
        return;
      }

      io.socket.get(this.props.url + '/create', {
        user: user,
        text: text
      }, function (resData, jwres) {
        that.setState({text: ''});
        that.props.onCommentSubmit(resData);
      });
    },

    render: function() {
      return (
        <footer id="footer">
          <div className="container">
            <form className="commentForm" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input className="form-control" type="text" value={this.state.user} onChange={this.handleUserChange} placeholder="What's your name?" />
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input className="form-control" type="text" value={this.state.text} onChange={this.handleTextChange} placeholder="What do you want to say..." />
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="submit" value="Send">
                      <span className="glyphicon glyphicon-comment"></span>
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </footer>
      );
    }
  })

  var CommentBox = React.createClass({
    getInitialState: function() {
      return {data: []};
    },

    refreshComponents: function() {
      var that = this;

      io.socket.get(this.props.url, function (data) {
        that.setState({data: data});
      });
    },

    handleCommentSubmit: function(data) {
      var comments = this.state.data,
          newComments = comments.concat([data]);

      this.fixViewPosition();
      this.setState({data: newComments}, this.fixViewPosition);
    },

    fixViewPosition: function() {
      if ($(window).scrollTop() + $(window).height() === $(document).height()) {
        $(document).scrollTop($(document).height());
      }
    },

    componentDidMount: function() {
      var that = this,
          intervalNumber;

      this.refreshComponents();
      
      io.socket.on(this.props.model, function (e) {
        that.refreshComponents();
      });

      intervalNumber = setInterval(this.refreshComponents, this.props.pollInterval);
    },

    render: function() {
      return (
        <div>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} url={ this.props.url } />
        </div>
      );
    }
  });

  return CommentBox;
})();