var React = require('react'),
    constants = require('../config/constants'),
    Link = require('./Link.jsx'),
    mixins = require('goflux').mixins;

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin(['CartStore'], constants.CHANGE, '_onCartChange')
  ],

  _onCartChange: function(){
    this.setState({cart: this.gofluxStore('CartStore').all()});
  },

  getInitialState: function() {
    return {
      cart: []
    }
  },

  render: function(){
    var totalPriceInCart = this.state.cart.reduce(function(sum, product){
      return sum + product.price
    }, 0);

    return (
      <header>
        <h1>Flutefish</h1>
        <Link to="cart">${totalPriceInCart}</Link>
      </header>
    );
  }
});
