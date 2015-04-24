var React = require('react'),
    constants = require('../config/constants'),

    ProductStore = require('../stores/ProductStore'),
    productActions = require('../actions/productActions'),

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({

  componentDidMount: function() {
    ProductStore.addListener(constants.CHANGE, this._onStoreChange);
  },

  componentWillUnmount: function() {
    ProductStore.removeListener(constants.CHANGE, this._onStoreChange);
  },

  _onStoreChange: function() {
    this.setState(this.getInitialState());
  },

  getInitialState: function() {
    return {
      products: ProductStore.all(),
    };
  },

  componentWillMount: function() {
    if (!ProductStore.hasInitialized()) {
      productActions.all();
    }
  },

  render: function() {

    var productElems = this.state.products.map(function(product, idx) {
      return (
        <li className="Grid-cell col-xs-12 col-md-3" key={product.id}>
          <figure className="ProductsPage-cell">
            <a href={'/products/' + product.id}>
              <img className="ProductsPage-image" src={product.thumbnail}
                   alt={product.name} />
            </a>
            <figcaption className="ProductsPage-caption">
              <a href={'/products/' + product.id}>{product.name}</a>
              <CartButton className="CartButton--iconOnly btn-lg"
                          productId={product.id} />
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
