'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThisWeek = getThisWeek;
exports.getAllWeeks = getAllWeeks;
exports.formatSlackMessage = formatSlackMessage;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getThisWeek() {
  var schedule, friday, year, week;
  return regeneratorRuntime.async(function getThisWeek$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getScheduleFromGoogleSheets());

        case 2:
          schedule = _context.sent;
          friday = (0, _moment2.default)().locale('sv').weekday(4);
          year = (0, _moment2.default)().format('YYYY');
          week = (0, _moment2.default)().format('WW');
          return _context.abrupt('return', schedule[year + '-' + week]);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}

function getAllWeeks() {
  var schedule;
  return regeneratorRuntime.async(function getAllWeeks$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getScheduleFromGoogleSheets());

        case 2:
          schedule = _context2.sent;
          return _context2.abrupt('return', schedule);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this);
}

function getScheduleFromGoogleSheets() {
  var _process$env, SPREADSHEET_ID, GOOGLE_API_KEY, SHEET_NAME, response, result, weeks, persons;

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
          weeks = result.valueRanges[0].values.map(function (entry) {
            return entry[0];
          });
          persons = result.valueRanges[0].values.map(function (entry) {
            return {
              fika: entry[1],
              dependencies: entry[2]
            };
          });
          return _context3.abrupt('return', (0, _lodash.zipObject)(weeks, persons));

        case 8:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this);
}

function formatSlackMessage(fika, dependency) {
  var SPREADSHEET_ID = process.env.SPREADSHEET_ID;

  var weekNumber = (0, _moment2.default)().week();
  var friday = (0, _moment2.default)().locale('sv').weekday(4);
  return {
    "response_type": "in_channel",
    "text": 'Schedule week ' + friday.week() + ', ' + friday.format('YYYY-MM-DD') + '. ' + ('Edit schedule <https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID) + '/edit|here>',
    "attachments": [{
      "text": "*Fika:* " + fika + "\n*Dependency check:* " + dependency,
      "mrkdwn_in": ["text"]
    }]
  };
}