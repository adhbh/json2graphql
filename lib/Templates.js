'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var scalarTypeTemplate = exports.scalarTypeTemplate = function scalarTypeTemplate(name, type) {
  return '\n  ' + name + ': {\n    description: \'enter your description\',\n    type: ' + type + ',\n    // TODO: Implement resolver for ' + name + '\n    //resolve: () => null,\n  }';
};

var objectTypeTemplate = exports.objectTypeTemplate = function objectTypeTemplate(name, resolve) {
  return '\n  ' + name + ': {\n    description: \'enter description\',\n    type: ' + name + 'Type,\n    // TODO: Implement resolver for ' + name + 'Type\n    //resolve: () => (' + resolve + '),\n  }';
};

var typeTemplate = exports.typeTemplate = function typeTemplate(type, name, fields) {
  return '\nconst ' + type + ' = new GraphQLObjectType({\n  name: \'' + name + '\',\n  fields: () => ({' + fields + '}),\n});';
};

var schemaTemplate = exports.schemaTemplate = function schemaTemplate(fields, types) {
  return '\nimport {\n  GraphQLBoolean,\n  GraphQLString,\n  GraphQLInt,\n  GraphQLFloat,\n  GraphQLObjectType,\n  GraphQLSchema,\n  GraphQLID,\n  GraphQLNonNull\n} from \'graphql\';\n\n' + types.join('\n') + '\n\nconst Query = new GraphQLSchema({\n  query: new GraphQLObjectType({\n    name: \'Root\',\n    fields: () => ({' + fields + '})\n  })\n})\n\nexport default Query;\n';
};