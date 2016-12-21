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
            default: null,
        },
        timeout: {
            doc: 'The API timeout',
            format: 'nat',
            default: 60 * 1000, // 1 minutes
        },
    }
};
