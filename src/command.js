#!/usr/bin/env node
import 'source-map-support/register';

import chalk from 'chalk';
import yargonaut from 'yargonaut';
import yargs from 'yargs';
import conf, { show as showConfiguration, validate as validateConfig, describe } from './index';

yargonaut
    .style('blue', 'aliases:')
    .helpStyle('green')
    .errorsStyle('red')
;

yargs
    .command('show', 'Show your builded configuration depends on env', {}, () => {
        console.log(showConfiguration());
    })
    .command('validate', 'Validate your builded configuration depends on env', {}, () => {
        try {
            validateConfig();
            console.log(chalk.black.bgGreen('Configuration is valid'));
        } catch (e) {
            e.message.split('\n').map((error) => {
                console.log(chalk.bold.red(error));
            });
            console.log(chalk.black.bgRed('Configuration is not valid'));
        };
    })
    .command('describe', 'Show the schema description', {}, () => {
        console.log(describe());
    })
    .demandCommand(1)
    .help()
    .argv;
