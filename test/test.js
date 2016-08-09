var test = require('tape');
var report = require('../report');

test('Must run in travis', function (t) {
    t.plan(1);
    t.throws(function() {
        report(100);
    }, /Whoops, we only run in Travis right now/);
});

test('Must run on a master branch', function (t) {
    process.env['TRAVIS'] = true;
    t.plan(1);
    t.throws(function() {
        report(100);
    }, /Whoops, we only weigh master branches right now/);
});

test('Requires a prop slug', function (t) {
    process.env['TRAVIS'] = true;
    process.env['TRAVIS_BRANCH'] = 'master';
    t.plan(1);
    t.throws(function() {
        report(100);
    }, /Whoops, we need a repo/);
});

test('Calls the server', function (t) {
    process.env['TRAVIS'] = true;
    process.env['TRAVIS_BRANCH'] = 'master';
    process.env['TRAVIS_REPO_SLUG'] = 'owner/repo';
    report(100);
    t.end();
});
