#!/usr/bin/env node

const fs = require('fs');
const plug = require('../index.js');

// Try to use the local node modules plug-pipeline if available
try {
    plug = require('@bliles/plug-pipeline');
} catch {}

if (!fs.existsSync('./pipeline.js')) {
    throw new Error('Missing pipeline.js, please create your pipeline.');
}

require(process.cwd() + '/pipeline.js');

// Check for a manual action
const args = process.argv.slice(2);
if (args.length == 1) {
    plug.run(args[0]);
} else {
    plug.run('default');
}
