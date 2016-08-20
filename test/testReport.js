var test = require('tape');
var report = require('../report');

test('Must run in travis', function (t) {
    t.plan(1);
    t.throws(function() {
        report(100);
    }, /Whoops, we only run in Travis right now/);
});

test('Calls the server', function (t) {
    process.env['TRAVIS'] = true;
    process.env['TRAVIS_BRANCH'] = 'master';
    process.env['TRAVIS_REPO_SLUG'] = 'owner/repo';
    report(100);
    t.end();
});
