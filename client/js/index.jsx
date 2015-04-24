// Require jQuery and bootstrap
//
require('expose?jQuery!expose?$!jquery'); // expose "jQuery" and "$" to window
require('bootstrap');

// Trigger CSS processing
require('../css/client.css');

var React = require('react'),
    constants = require('../../common/config/constants'),

    CartDropdown = require('../../common/views/CartDropdown.jsx'),
    ProductsPage = require('../../common/views/ProductsPage.jsx');

React.render((
  <div>
    <header className="SiteHeader">
      <div className="container SiteHeader-container">
        <a href="/" className="SiteHeader-logo">
          <h1>Flutefish</h1>
        </a>
        <CartDropdown />
      </div>
    </header>

    <ProductsPage/>
  </div>
), document.getElementById('react-root'));
