var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    Link = require('./Link.jsx');

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin(['CartStore'], constants.CHANGE, '_onCartChange')
  ],

  _onCartChange: function(){
    this.setState(this.getInitialState());
  },

  _addToCart: function(productId){
    this.gofluxActions('cartActions').add(productId);
  },

  _removeFromCart: function(productId){
    this.gofluxActions('cartActions').remove(productId);
  },

  getInitialState: function(){
    return {
      idsInCart: this.gofluxStore('CartStore').allIds()
    };
  },

  render: function() {

    var idsInCart = this.state.idsInCart,
        products = this.gofluxStore('ProductStore').all()
                       .map(function(product, idx) {
      var isInCart = idsInCart.indexOf(product.id) !== -1,
          cartButton = isInCart ?
            (
              <button type="button"
                      onClick={this._removeFromCart.bind(this, product.id)}>
                從購物車移除
              </button>
            ) : (
              <button type="button"
                      onClick={this._addToCart.bind(this, product.id)}>
                加入購物車
              </button>
            );

      return (
        <li key={product.id}>
          <Link to="product" params={{id: product.id}}>{product.name}</Link>
          {cartButton}
        </li>
      );
    }.bind(this));

    return (
      <div>
        <h2>Products</h2>
        <ul>
          {products}
        </ul>
      </div>
    );
  }
});
