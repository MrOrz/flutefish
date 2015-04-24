var React = require('react');

module.exports = React.createClass({

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    // Hard-code some products in cart for demo purposes
    //
    var idsInCart = ['mola', 'mola-mola', 'flutefish'];
    return {
      isInCart: idsInCart.indexOf(this.props.productId) !== -1
    };
  },

  render: function() {
    var className = 'CartButton btn ';

    if (this.props.className) {
      className += this.props.className + ' '
    }

    if (this.state.isInCart) {
      return (
        <button type="button"
                className={className + 'is-added'}>
        </button>
      );
    } else {
      return (
        <button type="button"
                className={className + 'is-notAdded'}>
        </button>
      );
    }
  }
});
