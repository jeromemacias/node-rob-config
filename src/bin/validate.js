import 'source-map-support/register';

import { validate as validateConfig } from '../index';

let error;
try {
    validateConfig();
    console.info('Configuration is OK');
} catch (e) {
    console.error('Configuration is KO');
    console.error(e.message);
    error = e;
} finally {
    process.exit(error ? 1 : 0);
};
