var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,
    resolver = require('../utils/resolver'),

    Link = require('./Link.jsx'),

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin([
      'ProductStore', 'CartStore'
    ], constants.CHANGE, '_onStoreChange')
  ],

  _onStoreChange: function() {
    this.setState(this.getInitialState());
  },

  getInitialState: function() {
    return {
      products: this.gofluxStore('ProductStore').all(),
      idsInCart: this.gofluxStore('CartStore').allIds()
    };
  },

  componentWillMount: function() {
    if (this.gofluxStore('ProductStore').hasInitialized()) {

      this.gofluxActions('routeActions').setMeta({
        title: 'All products'
      });

    } else {
      resolver.addPromise(
        this.gofluxActions('productActions').all()
      );

    }
  },

  render: function() {

    var productElems = this.state.products.map(function(product, idx) {
      return (
        <li className="Grid-cell col-xs-12 col-md-3" key={product.id}>
          <figure className="ProductsPage-cell">
            <Link to="product" params={{id: product.id}}>
              <img className="ProductsPage-image" src={product.thumbnail}
                   alt={product.name} />
            </Link>
            <figcaption className="ProductsPage-caption">
              <Link to="product" params={{id: product.id}}>{product.name}</Link>
              <CartButton className="CartButton--iconOnly btn-lg" productId={product.id} />
            </figcaption>
          </figure>
        </li>
      );
    });

    return (
      <div className="Page ProductsPage container">
        <ul className="Grid row">
          {productElems}
        </ul>
      </div>
    );
  }
});
