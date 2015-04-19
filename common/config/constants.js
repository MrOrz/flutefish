exports.PORT = process.env.PORT || 5000;

exports.CHANGE = 'CHANGE';

exports.IS_PRODUCTION = process.env.NODE_ENV === 'production';

if (typeof window === 'undefined') {
  exports.IS_BROWSER = false;
  exports.API_HOST = 'http://localhost:' + exports.PORT;
} else {
  exports.IS_BROWSER = true;
  exports.API_HOST = '';
}
