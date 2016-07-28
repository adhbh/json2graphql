#!/usr/bin/env node

import program  from 'commander';
import json2graphql from './json2graphql';
import fs from 'fs';

program
	.arguments('<file>')
	.option('-o, --output <output>','Name of the schema file')
	.action((file) => {
		fs.readFile(file, (err,data) => {
			if(err) {
				console.log("ERROR: "+ err);
				process.exit();
			}
			const schema = json2graphql(JSON.parse(data));
			const fileName = program.output || "Schema.js";
			fs.writeFile(fileName, schema, (err) => {
				if(err) {
					console.log("ERROR: "+ err);
					process.exit();
				}
			})
		})
	})
	.parse(process.argv);