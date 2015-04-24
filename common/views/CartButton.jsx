var React = require('react');

module.exports = React.createClass({

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  _addToCart: function() {
    this.setState({isInCart: true});
  },

  _removeFromCart: function() {
    this.setState({isInCart: false});
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
                className={className + 'is-added'}
                onClick={this._removeFromCart}>
        </button>
      );
    } else {
      return (
        <button type="button"
                className={className + 'is-notAdded'}
                onClick={this._addToCart}>
        </button>
      );
    }
  }
});
