var request = require('request');

var ENDPOINT = 'http://weighin.jordaneldredge.com';

function resourceUrl(owner, repo, pull) {
    var base = [
        ENDPOINT,
        'api',
        'v0',
        owner,
        repo
    ];

    var segments;
    if (pull) {
        segments = base.concat(['pulls', pull]);
    } else {
        segments = base.concat(['master']);
    }

    return segments.join('/');
}

function report(weight) {
    if (!process.env.TRAVIS) {
        throw "Whoops, we only run in Travis right now";
    }

    if (!process.env.TRAVIS_REPO_SLUG) {
        throw "Whoops, we need a repo";
    }

    var ownerRepo = process.env.TRAVIS_REPO_SLUG.split('/');
    var owner = ownerRepo[0];
    var repo = ownerRepo[1];
    var pull = process.env.TRAVIS_PULL_REQUEST;

    if (!pull && process.env.TRAVIS_BRANCH ==! 'master') {
        console.log('We are not testing master or a pull request. Exiting.');
        return;
    }

    var body = {
        weight: weight
    };

    request.post({
        url: resourceUrl(owner, repo, pull),
        method: "POST",
        json: body
    }, function(err, response, result) {
        if (response.statusCode === 200) {
            console.log('SUCCESS! Reported:', body);
        } else {
            console.log('Whoops! Got ' + response.statusCode + ':', response.body);
        }
    });
}

module.exports = report;
