export const scalarTypeTemplate = (name, type) => `
  ${name}: {
    description: 'enter your description',
    type: ${type},
    // TODO: Implement resolver for ${name}
    //resolve: () => null,
  }`;

export const objectTypeTemplate = (name, resolve) => `
  ${name}: {
    description: 'enter description',
    type: ${name}Type,
    // TODO: Implement resolver for ${name}Type
    //resolve: () => (${resolve}),
  }`;

export const typeTemplate = (type, name, fields) => `
const ${type} = new GraphQLObjectType({
  name: '${name}',
  fields: () => ({${fields}}),
});`;

export const schemaTemplate = (fields, types) => `
import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

${types.join('\n')}

const Query = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Root',
    fields: () => ({${fields}})
  })
})

export default Query;
`;