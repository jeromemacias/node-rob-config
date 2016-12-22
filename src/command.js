#!/usr/bin/env node
import 'source-map-support/register';

import cli from 'cli';
import { show as showConfiguration, validate as validateConfig } from './index';

cli.setApp(__dirname + '/../package.json');

cli.parse(null, {
    'show': 'Show your builded configuration depends on env',
    'validate': 'Validate your builded configuration depends on env',
});

if ('show' === cli.command) {
    console.log(showConfiguration());
}

if ('validate' === cli.command) {
    try {
        validateConfig();
        cli.ok('Configuration is valid');
    } catch (e) {
        e.message.split('\n').map((error) => {
            cli.error(error);
        });
        cli.fatal('Configuration is not valid');
    };
}
