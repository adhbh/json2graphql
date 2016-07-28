#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _json2graphql = require('./json2graphql');

var _json2graphql2 = _interopRequireDefault(_json2graphql);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.arguments('<file>').option('-o, --output <output>', 'Name of the schema file').action(function (file) {
	_fs2.default.readFile(file, function (err, data) {
		if (err) {
			console.log("ERROR: " + err);
			process.exit();
		}
		var schema = (0, _json2graphql2.default)(JSON.parse(data));
		var fileName = _commander2.default.output || "Schema.js";
		_fs2.default.writeFile(fileName, schema, function (err) {
			if (err) {
				console.log("ERROR: " + err);
				process.exit();
			}
		});
	});
}).parse(process.argv);