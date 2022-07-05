#!/usr/bin/env node

const plug = require('plug-pipeline');
const fs = require('fs');

if (!fs.existsSync('./pipeline.js')) {
    throw new Error('Missing pipeline.js, please create your pipeline.');
}

// Check for a manual action
const args = process.argv.slice(2);
if (args.length == 1) {
    plug.run(args[0]);
} else {
    plug.run('default');
}
