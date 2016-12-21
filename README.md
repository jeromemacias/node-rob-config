# node-smart-config
[![Build Status](https://travis-ci.org/jeromemacias/node-smart-config.svg?branch=master)](https://travis-ci.org/jeromemacias/node-smart-config)

Smart configuration module for nodejs

## Installation

`npm install node-smart-config`

## Usage

Define a config schema, simple object, for example: `config/schema.js` (see https://github.com/mozilla/node-convict#the-schema for documentation about schema definition).

Define a config file, for example: `config/developement.js`

Run `SMART_CONFIG_DIR='config' node ./node_modules/node-smart-config/bin/show.js` to see your configuration

Run `SMART_CONFIG_DIR='config' node ./node_modules/node-smart-config/bin/validate.js` to validate your configuration


Use it in your project:
```
process.env.SMART_CONFIG_DIR = __dirname + '/config';

const config = require('node-smart-config');

console.log(config.api.port);

```
