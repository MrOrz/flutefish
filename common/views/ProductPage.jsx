var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins,

    Link = require('./Link.jsx');

module.exports = React.createClass({
  mixins: [mixins.GofluxMixin(React)],

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  render: function(){
    var product = this.gofluxStore('ProductStore').find(this.props.productId);

    return(
      <div>
        <Link to="products">&lt; Back</Link>
        <h2>{product.name}</h2>
      </div>
    );
  }
});
