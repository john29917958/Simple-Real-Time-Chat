var PanelHead = React.createClass({
    render: function() {
        return (
            <div className="panel-heading">
                { this.props.user } says: 
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