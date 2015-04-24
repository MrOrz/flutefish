var React = require('react'),

    CartStore = require('../stores/CartStore');

module.exports = React.createClass({

  _removeFromCart: function(productId) {
    // Filter out the clicked product
    //
    var newCart = this.state.cart.filter(function(product) {
      return productId !== product.id
    });

    this.setState({
      cart: newCart
    });
  },

  getInitialState: function() {
    return {
      cart: CartStore.all()
    };
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
                  <a href="/product.html">
                    {product.name}
                  </a>
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
