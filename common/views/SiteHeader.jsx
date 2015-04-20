var React = require('react'),
    CartDropdown = require('./CartDropdown.jsx'),
    Link = require('./Link.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <header className="SiteHeader">
        <div className="container SiteHeader-container">
          <Link to="products" className="SiteHeader-logo">
            <h1>Flutefish</h1>
          </Link>
          <CartDropdown />
        </div>
      </header>
    );
  }
});
