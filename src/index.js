import convict from 'convict';
import path from 'path';
import fs from 'fs';
import prettyjson from 'prettyjson';

const configDir = process.env.SMART_CONFIG_DIR;
if (!configDir) {
    throw new Error(`[smart-config] You must configure "SMART_CONFIG_DIR" environment variable`);
}

// check and load convict schema
const schemaFile = path.resolve(process.env.SMART_CONFIG_DIR, 'schema');
try {
    fs.statSync(schemaFile + '.js');
} catch (e) {
    throw new Error(`[smart-config] Schema file "${e.path}" does not exists.`);
}
const conf = convict(require(schemaFile + '.js'));

// check and load related environment config
const configFile = path.resolve(process.env.SMART_CONFIG_DIR, conf.get('env'));
try {
    fs.statSync(configFile + '.js');
} catch (e) {
    throw new Error(`[smart-config] Config file "${e.path}" does not exists.`);
}
const envConf = require(configFile + '.js');
conf.load(envConf);

// export utility methods and current config properties
export function validate() {
    return conf.validate({ strict: true });
}

export function show() {
    return prettyjson.render(conf.getProperties());
}

export default conf.getProperties();
