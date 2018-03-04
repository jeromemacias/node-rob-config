module.exports = {
    env: {
        doc: 'The applicaton environment.',
        format: ['production', 'staging', 'integration', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    port: {
        doc: 'The API port',
        format: 'port',
        default: 3000,
    },
    sub: {
        example: {
            doc: 'The sub example',
            format: String,
            default: null
        }
    }
};
