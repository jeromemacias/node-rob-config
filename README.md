# node-smart-config
[![Build Status](https://travis-ci.org/jeromemacias/node-smart-config.svg?branch=master)](https://travis-ci.org/jeromemacias/node-smart-config)

Smart configuration module for nodejs

## Installation

`npm install node-smart-config`

## Usage

Define a config schema, simple object (see https://github.com/mozilla/node-convict#the-schema for documentation about schema definition):

For example: `config/schema.js`
```
module.exports = {
    env: {
        doc: 'The applicaton environment.',
        format: ['production', 'staging', 'integration', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    api: {
        port: {
            doc: 'The API port',
            format: 'port',
            default: 3000,
        },
        timeout: {
            doc: 'The API timeout',
            format: 'nat',
            default: 60 * 1000, // 1 minutes
        },
    }
};
```

The, define the first config file.

For example: `config/developement.js`
```
module.exports = {
    api: {
        port: 3001 // test with "nothing" value to see validation error
    }
};
```

Run `SMART_CONFIG_DIR='config' node ./node_modules/node-smart-config/bin/show.js` to see your configuration

![Display final configuration](example/screenshot/show.png?raw=true)

Run `SMART_CONFIG_DIR='config' node ./node_modules/node-smart-config/bin/validate.js` to validate your configuration

![Display configuration errors](example/screenshot/validate.png?raw=true)

Use it in your project:
```
process.env.SMART_CONFIG_DIR = __dirname + '/config';

const config = require('node-smart-config');

console.log(config.api.port);

```
