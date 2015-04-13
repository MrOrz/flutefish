exports.PORT = process.env.PORT || 5000;

exports.CHANGE = 'CHANGE';

if (typeof window === 'undefined') {
  // Make node-fetch happy.
  exports.API_HOST = 'http://localhost:' + exports.PORT;
}else {
  exports.API_HOST = '';
}
