var React = require('react'),
    constants = require('../config/constants'),
    mixins = require('goflux').mixins;

module.exports = React.createClass({
  mixins: [
    mixins.GofluxMixin(React),
    mixins.StoreWatchMixin(['CartStore'], constants.CHANGE, '_onCartChange')
  ],

  propTypes: {
    productId: React.PropTypes.string.isRequired
  },

  _onCartChange: function() {
    this.setState(this.getInitialState());
  },

  _addToCart: function() {
    this.setState({isLoading: true});
    this.gofluxActions('cartActions').add(this.props.productId);
  },

  _removeFromCart: function() {
    this.setState({isLoading: true});
    this.gofluxActions('cartActions').remove(this.props.productId);
  },

  getInitialState: function() {
    var cartStore = this.gofluxStore('CartStore');
    return {
      isLoading: !cartStore.hasInitialized(),
      isInCart: cartStore.allIds().indexOf(this.props.productId) !== -1
    };
  },

  render: function() {
    var className = 'CartButton btn ';

    if (this.props.className) {
      className += this.props.className + ' '
    }

    if (this.state.isLoading) {
      return (
        <button type="button"
                className={className + 'is-loading'}
                disabled>
        </button>
      );
    } else if (this.state.isInCart) {
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
