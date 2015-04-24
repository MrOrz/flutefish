var React = require('react'),
    constants = require('../config/constants'),

    ProductStore = require('../stores/ProductStore'),

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      products: ProductStore.all(),
    };
  },

  render: function() {

    var productElems = this.state.products.map(function(product, idx) {
      return (
        <li className="Grid-cell col-xs-12 col-md-3" key={product.id}>
          <figure className="ProductsPage-cell">
            <a href="/product.html">
              <img className="ProductsPage-image" src={product.thumbnail}
                   alt={product.name} />
            </a>
            <figcaption className="ProductsPage-caption">
              <a href="/product.html">{product.name}</a>
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
