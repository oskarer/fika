'use strict';

require('babel-polyfill');

var _services = require('./services');

(function _callee() {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _services.getAllWeeks)());

        case 3:
          result = _context.sent;

          console.log(result);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context['catch'](0);

          console.log(_context.t0.message);

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 7]]);
})();