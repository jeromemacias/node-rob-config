import convict from 'convict';
import path from 'path';
import fs from 'fs';

const configDir = process.env.SMART_CONFIG_DIR;
if (!configDir) {
    throw new Error(`[smart-config] You must configure "SMART_CONFIG_DIR" environment variable`);
}

// check and load convict schema
const schemaFile = path.join(process.env.SMART_CONFIG_DIR, 'schema'));
try {
    fs.statSync(schemaFile + '.js'));
} catch (e) {
    throw new Error(`[smart-config] Schema file "${e.path}" does not exists.`);
}
const conf = convict(require(schemaFile));

// check and load related environment config
const configFile = path.join(process.env.SMART_CONFIG_DIR, conf.get('env'));
try {
    fs.statSync(configFile + '.js'));
} catch (e) {
    throw new Error(`[smart-config] Config file "${e.path}" does not exists.`);
}
const envConf = require(configFile);
conf.load(envConf);

// export utility methods and current config properties
export function validate() {
    return conf.validate({ strict: true });
}

export function show() {
    return conf.toString();
}

export default conf.getProperties();
