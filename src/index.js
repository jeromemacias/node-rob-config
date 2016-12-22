import convict from 'convict';
import path from 'path';
import fs from 'fs';
import prettyjson from 'prettyjson';

const configDir = process.env.SMART_CONFIG_DIR || 'config';
try {
    const statDir = fs.statSync(configDir);
    if (!statDir.isDirectory()) {
        throw new Error('Not a directory');
    }
} catch (e) {
    throw new Error(`[smart-config] Config directory "${e.path}" does not exists.`);
}

// check and load convict schema
const schemaFile = path.resolve(configDir, 'schema.js');
try {
    const statFile = fs.statSync(schemaFile);
    if (!statFile.isFile()) {
        throw new Error('Not a file');
    }
} catch (e) {
    throw new Error(`[smart-config] Schema file "${e.path}" does not exists.`);
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
    throw new Error(`[smart-config] Config file "${e.path}" does not exists.`);
}
const envConf = require(configFile);
conf.load(envConf);

// export utility methods and current config properties
export function properties() {
    return conf.getProperties();
}

export function show() {
    return prettyjson.render(conf.getProperties());
}

export function validate() {
    return conf.validate({ strict: true });
}

export default conf;
