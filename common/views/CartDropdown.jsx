var React = require('react'),
    mixins = require('goflux').mixins,
    constants = require('../config/constants'),
    resolver = require('../utils/resolver'),

    CartButton = require('./CartButton.jsx'),
    Link = require('./Link.jsx');

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin(['CartStore'], constants.CHANGE, '_onCartChange')
  ],

  _onCartChange: function() {
    this.setState(this.getInitialState());
  },

  _removeFromCart: function(productId) {
    this.gofluxActions('cartActions').remove(productId);
  },

  getInitialState: function() {
    var cartStore = this.gofluxStore('CartStore')
    return {
      cart: cartStore.all(),
      isCartLoading: cartStore.isLoading()
    };
  },

  componentWillMount: function() {
    if (constants.IS_BROWSER) {
      resolver.addPromise(this.gofluxActions('cartActions').all());
    }
  },

  componentDidMount: function() {
    // Initialize dropdown
    $(React.findDOMNode(this.refs.Toggle)).dropdown();
  },

  render: function() {

    var cart = this.state.cart,
        totalPriceInCart, dropdownContent, buttonContent;

    if (this.state.isCartLoading) {
      dropdownContent = (<span>Loading</span>);
      buttonContent = 'Loading'

    } else {
      totalPriceInCart = cart.reduce(function(sum, product) {
        return sum + product.price
      }, 0);

      buttonContent = totalPriceInCart + ' TWD';

      if (cart.length === 0) {
        dropdownContent = 'The cart is empty.'
      } else {
        dropdownContent = [
          (
            <ul key="list">{cart.map(function(product) {
              return (
                <li key={product.id}>
                  <Link to="product" params={{id: product.id}}>
                    {product.name}
                  </Link>
                  <button className="btn btn-sm CartDropdown-remove"
                          onClick={this._removeFromCart.bind(this, product.id)}>
                    <span className="glyphicon glyphicon-remove" />
                  </button>
                  <span className="pull-right">
                    $ {product.price}
                  </span>
                </li>
              );
            }.bind(this))}</ul>
          ),
          (<hr key="hr" />),
          (
            <p key="total">
              Total <span className="pull-right">$ {totalPriceInCart}</span>
            </p>
          ),
          (
            <p key="checkout">
              <button className="CartDropdown-checkout btn btn-large btn-block"
                type="button">
                Checkout
              </button>
            </p>
          )
        ];
      }
    }

    var className = this.props.className || '';
    className += ' dropdown CartDropdown';

    return (
      <div className={className}>

        <button className="CartDropdown-toggle" type="button"
                data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false" ref="Toggle" id="cart-dropdown">
          <span
            className="CartDropdown-cartIcon glyphicon glyphicon-shopping-cart"
            aria-hidden="true"/>
          {buttonContent}
        </button>

        <div className="dropdown-menu CartDropdown-menu fade in" role="menu"
          aria-labelledby="cart-dropdown">
          {dropdownContent}
        </div>
      </div>
    );
  }
});
