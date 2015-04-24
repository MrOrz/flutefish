// Require jQuery and bootstrap
//
require('expose?jQuery!expose?$!jquery'); // expose "jQuery" and "$" to window
require('bootstrap');

// Trigger CSS processing
require('../css/client.css');

// Initialize dropdown
$('.CartDropdown-toggle').dropdown();
