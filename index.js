import { typeTemplate, scalarTypeTemplate, objectTypeTemplate, schemaTemplate } from './Templates';

//Graphql types
import GraphqlTypes from './GraphqlTypes';

//JS Types
const jsString = 'string';
const jsArray = 'array';
const jsObject = 'object';
const jsBoolean = 'boolean';
const jsUndefined = 'undefined';
const jsNull = 'null';
const jsNumber = 'number';
const roots = [];

function GraphQLList(type) {
	return `new GraphQLList(${type})`;
}

//Get graphql type from value 
function getType(value) {
	if (value === null) {
  	return null
  }
  if (Array.isArray(value)) {
  	const type = getType('', value[0]);
  	return GraphQLList(type)
  }
  switch(typeof value) {
  	case jsBoolean:
  		return GraphqlTypes.GraphQLBoolean
  	case jsString:
  		return GraphqlTypes.GraphQLString
  	case jsNumber:
  		return value % 1 == 0
  			? GraphqlTypes.GraphQLInt
  			: GraphqlTypes.GraphQLFloat
  	case jsObject:
  		return GraphqlTypes.GraphQLObjectType
  }
  return null
}

function getJsType(value) {
  if (value === null) return jsNull;
  if (Array.isArray(value))  {
  	return jsArray;
  } else {
  	return typeof value;
  }
}

class Type {
	constructor(key, value, parent) {
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
			let firstElemType = getType(value[0])
			for (let i = 0; i < value.length; i++) {
				const itemType = getType(value[i]);

		    //IMPROVE THIS - handle in a better way
		    if(firstElemType !== itemType)  {
		    	process.exit();
		    }
		  }
		  
		  if (firstElemType === GraphqlTypes.GraphQLObjectType) {
		  	firstElemType = createCustomType(key)
		  }

		  this.type = firstElemType;
		}
	}
}

function createSchema(typesHash) {
	for(let key in typesHash) {
		const elem = typesHash[key];
		if(elem.isCustom && elem.fields) {
			const fields = checkList(elem.fields);
			const fieldsSchema = fieldsToScalar(fields);
			elem.fieldsSchema = typeTemplate(elem.type, key, fieldsSchema);
			if(elem.fields) {
				elem.deepSchema = createSchema(elem.fields);
			}
		}
		elem.schema = scalarTypeTemplate(key, elem.type);
	}
	return typesHash;
}

function fieldsToScalar(fields) {
	const types = [];
	for(let key in fields) {
		const field = fields[key];
		types.push(scalarTypeTemplate(key, field.type));
	}
	return types.join(',');
}

function createCustomType(type) {
	let word = type.split('');
	word = word.map(chars => chars[0].toUpperCase() + chars.slice(1));
	return `${word.join('')}Type`;
}

function createTypesHash(data) {
	const types = Object.assign({});
	const keys = Object.keys(data);
	keys.forEach((key) => {
		const value = data[key];
		const elem = new Type(key, value);
		if (elem.isCustom) {
			elem.fields = elem.isList ? createTypesHash(value[0], elem) : createTypesHash(value, elem);
		}
		types[key] = elem;
	});
	return types;
}

function checkList(types) {
	for (let key in types) {
		const elem = types[key];
		if(elem.isList) {
			elem.type = GraphQLList(elem.type);
    }
    types[key] = elem;
  }
  return types;
}

function createRoot(fields) {
	const allfields = [];
	for(let key in fields) {
		const field = fields[key];
		if(field.isCustom) {
			roots.push(field.fieldsSchema);
			if(field.deepSchema) {
				createRoot(field.deepSchema);
			}
		}
		allfields.push(field.schema)
	}
	const root = schemaTemplate(allfields.join(','), roots);
	return root;
}

function json2graphql(data) {
	let types = createTypesHash(data);
	types = checkList(types);
	const schema = createSchema(types);
	return createRoot(schema);
}

console.log(json2graphql({name: "Adheesh", url:"adhbh.github.io", data: {team: "Storefront"}}));
