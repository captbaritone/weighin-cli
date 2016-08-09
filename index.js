#!/usr/bin/env node
'use strict';
var gzipSize = require('gzip-size');
var report = require('./report');

process.stdin.resume();
process.stdin.on('data', function(data) {
    report(gzipSize.sync(data));
});

module.exports = report;
