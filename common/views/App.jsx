var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins;

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin([
      'RouteStore', 'ProductStore'
    ], constants.CHANGE, '_onStoreChange')
  ],

  _onStoreChange: function(){
    this.setState(this.getInitialState());
  },

  getInitialState: function(){
    return {
      RouteStore: this.gofluxStore('RouteStore').get(),
      ProductStore: this.gofluxStore('ProductStore').all()
    }
  },

  render: function(){
    return (
      <div>
        <h1>Hello world!</h1>

        <h2>RouteStore</h2>
        <pre>
          {JSON.stringify(this.state.RouteStore, null, '  ')}
        </pre>

        <h2>ProductStore</h2>
        <pre>
          {JSON.stringify(this.state.ProductStore, null, '  ')}
        </pre>
      </div>
    );
  },
});
