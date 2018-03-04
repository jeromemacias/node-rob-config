import chalk from 'chalk';
import convict from 'convict';
import path from 'path';
import fs from 'fs';
import prettyjson from 'prettyjson';

const configDir = process.env.ROB_CONFIG_DIR || 'config';
try {
    const statDir = fs.statSync(configDir);
    if (!statDir.isDirectory()) {
        throw new Error('Not a directory');
    }
} catch (e) {
    throw new Error(`[rob-config] Config directory "${e.path}" does not exists.`);
}

// check and load convict formats if availables
const formatsFile = path.resolve(configDir, 'formats.js');
try {
    const statFile = fs.statSync(formatsFile);
    if (statFile.isFile()) {
        convict.addFormats(require(formatsFile));
    }
} catch (e) {}

// check and load convict schema
const schemaFile = path.resolve(configDir, 'schema.js');
try {
    const statFile = fs.statSync(schemaFile);
    if (!statFile.isFile()) {
        throw new Error('Not a file');
    }
} catch (e) {
    throw new Error(`[rob-config] Schema file "${e.path}" does not exists.`);
}
const conf = convict(require(schemaFile));

// check and load related environment config
const env = process.env.NODE_ENV || 'development';
const configFile = path.resolve(configDir, env + '.js');
try {
    const statFile = fs.statSync(configFile);
    if (!statFile.isFile()) {
        throw new Error('Not a file');
    }
} catch (e) {
    throw new Error(`[rob-config] Config file "${e.path}" does not exists.`);
}
const envConf = require(configFile);
conf.load(envConf);

// export utility methods and current config properties
conf.properties = () => {
    return conf.getProperties();
};

conf.show = () => {
    return prettyjson.render(JSON.parse(conf.toString()));
};

conf.describe = () => {
    function buildProperties(keys) {
        return Object.keys(keys).reduce((items, key) => {
            items[key] = keyFormat(keys[key]);
    
            return items;
        }, {});
    }
    const keyFormat = (property) => {
        if (property.properties) {
            return buildProperties(property.properties);
        }

        const { doc, format, env } = property;
        const defaultValue = property['default'];

        let desc = `${doc} [${chalk.blue(format)}]`;
        if (defaultValue) {
            desc += `, default: ${chalk.yellow(defaultValue)}`;
        }
        if (env) {
            desc += ` (env var: ${chalk.magenta(env)})`;
        }

        return desc;
    };

    const description = buildProperties(conf.getSchema().properties);

    return prettyjson.render(description);
};

const baseValidate = conf.validate.bind(conf);
conf.validate = function () {
    return baseValidate({ allowed: 'strict' });
};

export default conf;
