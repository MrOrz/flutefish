var React = require('react'),

    CartStore = require('../stores/CartStore');

module.exports = React.createClass({

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      isInCart: CartStore.allIds().indexOf(this.props.productId) !== -1
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
