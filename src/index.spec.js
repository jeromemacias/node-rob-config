const { assert } = require('chai');

const requireConfig = (dir) => {
    process.env.SMART_CONFIG_DIR = 'test/fixtures/' + dir;
    const resolved = require.resolve('../src');
    delete require.cache[resolved];

    return require('../src');
};

describe('get', () => {
    it('aggregated configuration', () => {
        const { default: config } = requireConfig('valid');

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

        assert.throws(validate, Error, 'api.port: Ports must be within range 0 - 65535\napi.timeout: must be a positive integer');
    });
});

describe('show', () => {
    it('pretty print configuration', () => {
        const { show } = requireConfig('valid');

        assert.equal(show(), '\u001b[32menv: \u001b[39mtest\n\u001b[32mapi: \u001b[39m\n  \u001b[32mport: \u001b[39m   \u001b[34m3002\u001b[39m\n  \u001b[32mtimeout: \u001b[39m\u001b[34m60000\u001b[39m');
    });
})
