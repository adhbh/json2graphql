'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _keymirror = require('./ext/keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GraphqlTypes = (0, _keymirror2.default)({
	GraphQLSchema: null,
	GraphQLObjectType: null,
	GraphQLInt: null,
	GraphQLFloat: null,
	GraphQLString: null,
	GraphQLBoolean: null,
	GraphQLID: null
});

exports.default = GraphqlTypes;