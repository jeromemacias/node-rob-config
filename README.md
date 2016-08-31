# node-smart-config
Smart configuration module for nodejs

## Installation

`npm install`

## Usage

Define a config file, for example: `config/developement.js`

Run `CONFIG_DIR='./config' node ./node_modules/smart-config/bin/show.js` to see your configuration

Run `CONFIG_DIR='./config' node ./node_modules/smart-config/bin/validate.js` to validate your configuration


Use it in your project:
```
process.env.CONFIG_DIR = __dirname + '/config';

const config = require('smart-config');

console.log(config.api.port);

```
