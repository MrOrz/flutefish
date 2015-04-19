var React = require('react'),
    CartDropdown = require('./CartDropdown.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <header className="SiteHeader">
        <div className="container SiteHeader-container">
          <h1 className="SiteHeader-logo">Flutefish</h1>
          <CartDropdown />
        </div>
      </header>
    );
  }
});
