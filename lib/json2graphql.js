'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

//Graphql types


var _Templates = require('./Templates');

var _GraphqlTypes = require('./GraphqlTypes');

var _GraphqlTypes2 = _interopRequireDefault(_GraphqlTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//JS Types
var jsString = 'string';
var jsArray = 'array';
var jsObject = 'object';
var jsBoolean = 'boolean';
var jsUndefined = 'undefined';
var jsNull = 'null';
var jsNumber = 'number';
var roots = [];

function GraphQLList(type) {
	return 'new GraphQLList(' + type + ')';
}

//Get graphql type from value 
function getType(value) {
	if (value === null) {
		return null;
	}
	if (Array.isArray(value)) {
		var type = getType('', value[0]);
		return GraphQLList(type);
	}
	switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
		case jsBoolean:
			return _GraphqlTypes2.default.GraphQLBoolean;
		case jsString:
			return _GraphqlTypes2.default.GraphQLString;
		case jsNumber:
			return value % 1 == 0 ? _GraphqlTypes2.default.GraphQLInt : _GraphqlTypes2.default.GraphQLFloat;
		case jsObject:
			return _GraphqlTypes2.default.GraphQLObjectType;
	}
	return null;
}

function getJsType(value) {
	if (value === null) return jsNull;
	if (Array.isArray(value)) {
		return jsArray;
	} else {
		return typeof value === 'undefined' ? 'undefined' : _typeof(value);
	}
}

var Type = function Type(key, value, parent) {
	_classCallCheck(this, Type);

	this.key = key;
	this.jsType = getJsType(value);
	this.type = getType(value);
	this.fields = null;
	this.isList = false;
	this.isCustom = false;

	if (this.jsType === jsObject) {
		this.type = createCustomType(key);
		this.isCustom = true;
	}

	if (this.jsType === jsArray) {
		this.isList = true;
		this.isCustom = true;
		var firstElemType = getType(value[0]);
		for (var i = 0; i < value.length; i++) {
			var itemType = getType(value[i]);

			//IMPROVE THIS - handle in a better way
			if (firstElemType !== itemType) {
				process.exit();
			}
		}

		if (firstElemType === _GraphqlTypes2.default.GraphQLObjectType) {
			firstElemType = createCustomType(key);
		}

		this.type = firstElemType;
	}
};

function createSchema(typesHash) {
	for (var key in typesHash) {
		var elem = typesHash[key];
		if (elem.isCustom && elem.fields) {
			var fields = checkList(elem.fields);
			var fieldsSchema = fieldsToScalar(fields);
			elem.fieldsSchema = (0, _Templates.typeTemplate)(elem.type, key, fieldsSchema);
			if (elem.fields) {
				elem.deepSchema = createSchema(elem.fields);
			}
		}
		elem.schema = (0, _Templates.scalarTypeTemplate)(key, elem.type);
	}
	return typesHash;
}

function fieldsToScalar(fields) {
	var types = [];
	for (var key in fields) {
		var field = fields[key];
		types.push((0, _Templates.scalarTypeTemplate)(key, field.type));
	}
	return types.join(',');
}

function createCustomType(type) {
	var word = type.split('');
	word = word.map(function (chars) {
		return chars[0].toUpperCase() + chars.slice(1);
	});
	return word.join('') + 'Type';
}

function createTypesHash(data) {
	var types = Object.assign({});
	var keys = Object.keys(data);
	keys.forEach(function (key) {
		var value = data[key];
		var elem = new Type(key, value);
		if (elem.isCustom) {
			elem.fields = elem.isList ? createTypesHash(value[0], elem) : createTypesHash(value, elem);
		}
		types[key] = elem;
	});
	return types;
}

function checkList(types) {
	for (var key in types) {
		var elem = types[key];
		if (elem.isList) {
			elem.type = GraphQLList(elem.type);
		}
		types[key] = elem;
	}
	return types;
}

function createRoot(fields) {
	var allfields = [];
	for (var key in fields) {
		var field = fields[key];
		if (field.isCustom) {
			roots.push(field.fieldsSchema);
			if (field.deepSchema) {
				createRoot(field.deepSchema);
			}
		}
		allfields.push(field.schema);
	}
	var root = (0, _Templates.schemaTemplate)(allfields.join(','), roots);
	return root;
}

function json2graphql(data) {
	var types = createTypesHash(data);
	types = checkList(types);
	var schema = createSchema(types);
	return createRoot(schema);
}

exports.default = json2graphql;