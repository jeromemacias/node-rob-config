const { assert } = require('chai');

const requireConfig = (dir) => {
    process.env.ROB_CONFIG_DIR = 'test/fixtures/' + dir;
    const resolved = require.resolve('../src');
    delete require.cache[resolved];

    return require('../src');
};

describe('get / has', () => {
    it('aggregated configuration access', () => {
        const { default: config } = requireConfig('valid');

        assert.equal(config.has('env'), true);
        assert.equal(config.get('env'), 'test');
        assert.equal(config.get('api.port'), 3002);
        assert.equal(config.get('api.timeout'), 60000);
    });
});

describe('properties', () => {
    it('aggregated configuration as object', () => {
        const { properties } = requireConfig('valid');
        const config = properties();

        const { env, api: { port, timeout } } = config;
        assert.equal(env, 'test');
        assert.equal(port, 3002);
        assert.equal(timeout, 60000);
    });
});

describe('validate', () => {
    it('valid configuration', () => {
        const { validate } = requireConfig('valid');

        assert.doesNotThrow(validate, Error);
    });

    it('invalid configuration', () => {
        const { validate } = requireConfig('invalid');

        assert.throws(validate, Error, 'api.port: ports must be within range 0 - 65535\napi.timeout: must be a positive integer');
    });
});

describe('show', () => {
    it('pretty print configuration', () => {
        const { show } = requireConfig('valid');

        assert.equal(show(), '\u001b[32menv: \u001b[39mtest\n\u001b[32mapi: \u001b[39m\n  \u001b[32mport: \u001b[39m   \u001b[34m3002\u001b[39m\n  \u001b[32mtimeout: \u001b[39m\u001b[34m60000\u001b[39m\n  \u001b[32msecret: \u001b[39m [Sensitive]');
    });
});
