var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin(['CartStore'], constants.CHANGE, '_onCartChange')
  ],

  _onCartChange: function() {
    this.setState(this.getInitialState());
  },

  getInitialState: function() {
    var cartStore = this.gofluxStore('CartStore')
    return {
      cart: cartStore.all(),
      isCartLoading: cartStore.isLoading()
    };
  },

  componentDidMount: function() {
    // Initialize dropdown
    $(React.findDOMNode(this.refs.Toggle)).dropdown();
  },

  render: function() {

    var cart = this.state.cart,
        totalPriceInCart = 0, dropdownContent;

    if(this.state.isCartLoading) {
      dropdownContent = (<span>Loading</span>);
      totalPriceInCart = 'Loading'

    }else if (cart.length === 0) {
      dropdownContent = (<span>購物車是空的喔！</span>);

    } else {
      totalPriceInCart = cart.reduce(function(sum, product) {
        return sum + product.price
      }, 0)

      dropdownContent = [
        (
          <ul key="list">{cart.map(function(product) {
            return (
              <li key={product.id}>
                {product.name}
                <span>
                  ${product.price}
                </span>

                <CartButton productId={product.id} />
              </li>
            );
          })}</ul>
        ),
        (<p key="total">總計 <span>{totalPriceInCart}</span></p>),
        (
          <p key="checkout">
            <button className="btn btn-large btn-block btn-primary"
              type="button">
              結賬去！
            </button>
          </p>
        )
      ];
    }

    var className = this.props.className || "";
    className += " dropdown";

    return (
      <div className={className}>
        <button type="button" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false" ref="Toggle" id="cart-dropdown">
          ${totalPriceInCart}
        </button>

        <div className="dropdown-menu SiteHeader-dropdownMenu" role="menu"
          aria-labelledby="cart-dropdown">
          {dropdownContent}
        </div>
      </div>
    );
  }
});
