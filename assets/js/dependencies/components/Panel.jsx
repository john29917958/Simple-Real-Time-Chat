var PanelHead = React.createClass({
    render: function () {
        return (
            <div className="panel-heading">
                { this.props.user } says: 
            </div>
        );
    }
});

var PanelBody = React.createClass({
    render: function () {
        return (
            <div className="panel-body">
                { this.props.text }
            </div>
        );
    }
});

var Panel = React.createClass({
    render: function () {
        return (
            <div className="panel panel-default">
                <PanelHead user={ this.props.user } />
                <PanelBody text={ this.props.text } />
            </div>
        );
    }
});

var CommentList = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    refreshComponents: function () {
        var that = this;

        io.socket.get(this.props.url, function (data) {
            that.setState({data: data});
        });
    },
    componentDidMount: function () {
        var that = this;

        this.refreshComponents();
        
        io.socket.on(this.props.model, function (e) {
            that.refreshComponents();
        });

        var interval = setInterval(this.refreshComponents, this.props.pollInterval);
    },
    render: function () {
        var comments = this.state.data.map(function (comment) {
            return (
                <Panel user={ comment.user } text={ comment.text } key={ comment.id } />
            );
        });

        return (
            <div>
                { comments }
            </div>
        );
    }
});