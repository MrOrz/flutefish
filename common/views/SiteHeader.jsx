var React = require('react'),
    constants = require('../config/constants'),
    Link = require('./Link.jsx'),
    mixins = require('goflux').mixins;

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin(['CartStore'], constants.CHANGE, '_onCartChange')
  ],

  _onCartChange: function() {
    this.setState({cart: this.gofluxStore('CartStore').all()});
  },

  getInitialState: function() {
    return {
      cart: []
    }
  },

  componentDidMount: function() {
    // Initialize dropdown
    $(React.findDOMNode(this.refs.cartDropdownToggle)).dropdown();
  },

  render: function() {
    var cart = this.state.cart,
        totalPriceInCart = cart.reduce(function(sum, product) {
          return sum + product.price
        }, 0),
        dropdownContent;

    if (cart.length === 0) {
      dropdownContent = (<span>購物車是空的喔！</span>);
    } else {

      dropdownContent = [
        (
          <ul>{cart.map(function(product) {
            return (
              <li>
                product.name
                <span>
                  $product.price
                </span>
              </li>
            );
          })}</ul>
        ),
        (<p>總計 <span>{totalPriceInCart}</span></p>),
        (
          <p>
            <button className="btn btn-large btn-block btn-primary"
              type="button">
              結賬去！
            </button>
          </p>
        )
      ];
    }

    return (
      <header className="SiteHeader">
        <div className="container SiteHeader-container">
          <h1 className="SiteHeader-logo">Flutefish</h1>
          <div className="dropdown">
            <button type="button" data-toggle="dropdown" aria-haspopup="true"
             aria-expanded="false" ref="cartDropdownToggle" id="dLabel">
              ${totalPriceInCart}
            </button>

            <div className="dropdown-menu SiteHeader-dropdownMenu" role="menu"
              aria-labelledby="dLabel">
              {dropdownContent}
            </div>
          </div>
        </div>
      </header>
    );
  }
});
