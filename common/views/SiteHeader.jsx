var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    Link = require('./Link.jsx'),
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
    return {
      cart: this.gofluxStore('CartStore').all()
    };
  },

  componentDidMount: function() {
    // Initialize dropdown
    $(React.findDOMNode(this.refs.cartDropdownToggle)).dropdown();

    // We do not hope cart dropdown to be hidden on dropdown click,
    // thus we intercept click here.
    //
    // Note that because React always listens at root element, React event
    // handlers often fires after jQuery's handlers. (http://goo.gl/LF3edm)
    // Thus we use jQuery to stop event propagation here.
    //
    $(
      React.findDOMNode(this.refs.cartDropdown)
    ).on('click.SiteHeader', function(e) {
      e.stopPropagation();
    });
  },

  componentWillUnmount: function() {
    // Although it is unlikely that SiteHeader will "unmount",
    // it's a good practice to put a `componentWillUnmount` to undo things
    // we've done in `componentDidMount`.

    $(React.findDOMNode(this.refs.cartDropdown)).off('.SiteHeader');
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
              aria-labelledby="dLabel" ref="cartDropdown">
              {dropdownContent}
            </div>
          </div>
        </div>
      </header>
    );
  }
});
