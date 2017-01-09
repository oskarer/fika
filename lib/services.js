'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThisWeek = getThisWeek;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getThisWeek() {
  var schedule, friday, year, week, nextWeek;
  return regeneratorRuntime.async(function getThisWeek$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getScheduleFromGithub());

        case 2:
          schedule = _context.sent;
          friday = (0, _moment2.default)().locale('sv').weekday(4);
          year = (0, _moment2.default)().format('YYYY');
          week = (0, _moment2.default)().format('WW');
          nextWeek = schedule[year + '-' + week];
          return _context.abrupt('return', formatSingleWeekMessage(nextWeek.fika, nextWeek.dependencies, friday));

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}

function getScheduleFromGithub() {
  var result;
  return regeneratorRuntime.async(function getScheduleFromGithub$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestPromise2.default)('https://raw.githubusercontent.com/' + 'oskarer/fika/master/schedule.json'));

        case 2:
          result = _context2.sent;
          return _context2.abrupt('return', JSON.parse(result));

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this);
}

function formatSingleWeekMessage(fika, dependency, friday) {
  var weekNumber = (0, _moment2.default)().week();
  var date = (0, _moment2.default)();
  return {
    "response_type": "in_channel",
    "text": 'Schedule week ' + friday.week() + ', ' + friday.format('YYYY-MM-DD') + '.',
    "attachments": [{
      "text": "*Fika:* " + fika + "\n*Dependency check:* " + dependency,
      "mrkdwn_in": ["text"]
    }]
  };
}