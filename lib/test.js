'use strict';

require('babel-polyfill');

var _services = require('./services');

var services = _interopRequireWildcard(_services);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function _callee() {
  var testSingleSlackMessage, testGetThisWeek, testGetSlackUsers, testGetSchedule;
  return regeneratorRuntime.async(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          testGetSchedule = function testGetSchedule() {
            var result;
            return regeneratorRuntime.async(function testGetSchedule$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.prev = 0;
                    _context4.next = 3;
                    return regeneratorRuntime.awrap(services.getSchedule());

                  case 3:
                    result = _context4.sent;

                    console.log(result);
                    _context4.next = 10;
                    break;

                  case 7:
                    _context4.prev = 7;
                    _context4.t0 = _context4['catch'](0);

                    console.log(_context4.t0.message);

                  case 10:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, null, this, [[0, 7]]);
          };

          testGetSlackUsers = function testGetSlackUsers() {
            var result;
            return regeneratorRuntime.async(function testGetSlackUsers$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return regeneratorRuntime.awrap(services.getSlackUsers());

                  case 3:
                    result = _context3.sent;

                    console.log(result);
                    _context3.next = 10;
                    break;

                  case 7:
                    _context3.prev = 7;
                    _context3.t0 = _context3['catch'](0);

                    console.log(_context3.t0.message);

                  case 10:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, null, this, [[0, 7]]);
          };

          testGetThisWeek = function testGetThisWeek() {
            var result;
            return regeneratorRuntime.async(function testGetThisWeek$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(services.getThisWeek());

                  case 3:
                    result = _context2.sent;

                    console.log(result);
                    _context2.next = 10;
                    break;

                  case 7:
                    _context2.prev = 7;
                    _context2.t0 = _context2['catch'](0);

                    console.log(_context2.t0.message);

                  case 10:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, null, this, [[0, 7]]);
          };

          testSingleSlackMessage = function testSingleSlackMessage() {
            var _ref, week, year, fika, dependencies, message;

            return regeneratorRuntime.async(function testSingleSlackMessage$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(services.getThisWeek());

                  case 3:
                    _ref = _context.sent;
                    week = _ref.week;
                    year = _ref.year;
                    fika = _ref.fika;
                    dependencies = _ref.dependencies;
                    message = services.singleSlackMessage(fika, dependencies, year, week);

                    console.log(message);
                    _context.next = 15;
                    break;

                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context['catch'](0);

                    console.log(_context.t0.message);

                  case 15:
                  case 'end':
                    return _context.stop();
                }
              }
            }, null, this, [[0, 12]]);
          };

          testSingleSlackMessage();

        case 5:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined);
})();