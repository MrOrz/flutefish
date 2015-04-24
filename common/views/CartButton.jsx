var React = require('react'),
    constants = require('../config/constants'),

    CartStore = require('../stores/CartStore'),
    cartActions = require('../actions/cartActions');

module.exports = React.createClass({

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  componentDidMount: function() {
    CartStore.addListener(constants.CHANGE, this._onCartChange);
  },

  componentWillUnmount: function() {
    CartStore.removeListener(constants.CHANGE, this._onCartChange);
  },

  _onCartChange: function() {
    this.setState(this.getInitialState());
  },

  _addToCart: function() {
    cartActions.add(this.props.productId);
  },

  _removeFromCart: function() {
    cartActions.remove(this.props.productId);
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
