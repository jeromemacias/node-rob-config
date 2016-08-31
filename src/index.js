import convict from 'convict';
import fs from 'fs';

const conf = convict({
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
});

// check and load related environment config
const configFile = process.env.CONFIG_DIR + conf.get('env');
try {
    fs.statSync(configFile + '.js'));
} catch (e) {
    throw new Error(`Config file "${e.path}" does not exists.`);
}
const envConf = require(configFile);
conf.load(envConf);

export function validate() {
    return conf.validate({ strict: true });
}

export function show() {
    return conf.toString();
}

export default conf.getProperties();
