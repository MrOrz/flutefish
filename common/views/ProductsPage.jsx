var React = require('react'),

    CartButton = require('./CartButton.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      products: [
        {
          id: 'mola', name: 'Mola',
          thumbnail: '/images/mola-bags.jpg'
        },
        {
          id: 'mola-light', name: 'Mola Light',
          thumbnail: '/images/mola-ip1s.jpg'
        },
        {
          id: 'mola-deep', name: 'Mola Deep',
          thumbnail: '/images/mola-ip2s.jpg'
        },
        {
          id: 'mola-mola', name: 'Mola Mola',
          thumbnail: '/images/mola-ip3s.jpg'
        },
        {
          id: 'mola-oao', name: 'Mola OAO',
          thumbnail: '/images/mola-ip4s.jpg'
        },
        {
          id: 'flutefish', name: 'Flutefish',
          thumbnail: '/images/flute-bag2s.jpg'
        },
        {
          id: 'flute', name: 'Flute ∞',
          thumbnail: '/images/flute-bag1s.jpg'
        }
      ]
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
