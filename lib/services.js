'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getThisWeek = getThisWeek;
exports.getAllWeeks = getAllWeeks;
exports.getScheduleFromGoogleSheets = getScheduleFromGoogleSheets;
exports.getSlackUsers = getSlackUsers;
exports.getSchedule = getSchedule;
exports.singleSlackMessage = singleSlackMessage;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getThisWeek() {
  var schedule, year, week;
  return regeneratorRuntime.async(function getThisWeek$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getSchedule());

        case 2:
          schedule = _context.sent;
          year = (0, _moment2.default)().year();
          week = (0, _moment2.default)().isoWeek();
          return _context.abrupt('return', schedule.find(function (entry) {
            return entry.year === year && entry.week === week;
          }));

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}

function getAllWeeks() {
  return regeneratorRuntime.async(function getAllWeeks$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getSchedule());

        case 2:
          return _context2.abrupt('return', _context2.sent);

        case 3:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this);
}

function getScheduleFromGoogleSheets() {
  var _process$env, SPREADSHEET_ID, GOOGLE_API_KEY, SHEET_NAME, response, result;

  return regeneratorRuntime.async(function getScheduleFromGoogleSheets$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _process$env = process.env, SPREADSHEET_ID = _process$env.SPREADSHEET_ID, GOOGLE_API_KEY = _process$env.GOOGLE_API_KEY, SHEET_NAME = _process$env.SHEET_NAME;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _requestPromise2.default)('https://sheets.googleapis.com/v4/spreadsheets/' + (SPREADSHEET_ID + '/values:batchGet?ranges=' + SHEET_NAME + '!A2:C') + '&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING' + ('&majorDimension=ROWS&key=' + GOOGLE_API_KEY)));

        case 3:
          response = _context3.sent;
          result = JSON.parse(response);
          return _context3.abrupt('return', result.valueRanges[0].values.map(function (entry, week) {
            return {
              week: parseInt(entry[0].slice(-2)),
              year: parseInt(entry[0].slice(0, 4)),
              fika: entry[1],
              dependencies: entry[2]
            };
          }));

        case 6:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this);
}

function getSlackUsers() {
  var SLACK_TOKEN, response, result, filtered;
  return regeneratorRuntime.async(function getSlackUsers$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          SLACK_TOKEN = process.env.SLACK_TOKEN;
          _context4.next = 3;
          return regeneratorRuntime.awrap((0, _requestPromise2.default)('https://slack.com/api/users.list?token=' + (SLACK_TOKEN + '&presence=0')));

        case 3:
          response = _context4.sent;
          result = JSON.parse(response);
          filtered = result.members.map(function (member) {
            return {
              name: member.name,
              real_name: member.real_name || member.name,
              image_48: member.profile.image_48,
              image_192: member.profile.image_192
            };
          });
          return _context4.abrupt('return', filtered);

        case 7:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, this);
}

function getSchedule() {
  var _ref, _ref2, schedule, users, year, week, filtered, extended;

  return regeneratorRuntime.async(function getSchedule$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Promise.all([getScheduleFromGoogleSheets(), getSlackUsers()]));

        case 2:
          _ref = _context5.sent;
          _ref2 = _slicedToArray(_ref, 2);
          schedule = _ref2[0];
          users = _ref2[1];
          year = (0, _moment2.default)().year();
          week = (0, _moment2.default)().isoWeek();
          filtered = schedule.filter(function (entry) {
            return entry.year >= year && entry.week >= week;
          });
          extended = filtered.map(function (entry) {
            var fika = users.find(function (user) {
              return user.name === entry.fika;
            });
            var dependencies = users.find(function (user) {
              return user.name === entry.dependencies;
            });
            return {
              week: entry.week,
              year: entry.year,
              fika: fika,
              dependencies: dependencies
            };
          });
          return _context5.abrupt('return', extended);

        case 11:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, this);
}

function singleSlackMessage(fika, dependencies, year, week) {
  var SPREADSHEET_ID = process.env.SPREADSHEET_ID;

  var date = (0, _moment2.default)(year + 'W' + (week < 10 ? '0' + week : week));
  var friday = date.locale('sv').weekday(4);
  return {
    "response_type": "in_channel",
    "text": 'Schedule week ' + date.week() + ', ' + friday.format('YYYY-MM-DD') + '. ' + ('Edit schedule <https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID) + '/edit|here>',
    "attachments": [{
      "text": '*Fika:* ' + fika.real_name + ('\n*Dependency check:* ' + dependencies.real_name),
      "mrkdwn_in": ["text"]
    }]
  };
}