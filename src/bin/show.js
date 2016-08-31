import 'source-map-support/register';

import prettyjson from 'prettyjson';
import { show as showConfiguration } from '../index';

console.log(prettyjson.render(showConfiguration(), { noColor: true }));

process.exit(0);
