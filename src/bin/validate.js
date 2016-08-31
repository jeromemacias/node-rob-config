import 'source-map-support/register';

import { validate as validateConfig } from '../index';

const run = function () {
    validateConfig();
    console.info('Configuration is OK');
};

if (module.parent) {
    module.exports = run; // eslint-disable-line import/no-commonjs
} else {
    // CRON mode
    let error;
    try {
        run();
    } catch (e) {
        console.error('Configuration is KO');
        console.error(e.message);
        error = e;
    } finally {
        process.exit(error ? 1 : 0);
    };
}
