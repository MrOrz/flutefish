// Require jQuery and bootstrap
//
require('expose?jQuery!expose?$!jquery'); // expose "jQuery" and "$" to window
require('bootstrap');

// Trigger CSS processing
require('../css/client.css');

var React = require('react'),
    constants = require('../../common/config/constants'),

    CartDropdown = require('../../common/views/CartDropdown.jsx'),
    ProductPage = require('../../common/views/ProductPage.jsx');

React.render((
  <div>
    <header className="SiteHeader is-transparent">
      <div className="container SiteHeader-container">
        <a href="/" className="SiteHeader-logo">
          <h1>Flutefish</h1>
        </a>
        <CartDropdown />
      </div>
    </header>

    <ProductPage productId="mola"/>
  </div>
), document.getElementById('react-root'));
