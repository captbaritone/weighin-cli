var request = require('request');

var ENDPOINT = 'http://weighin.jordaneldredge.com';

function resourceUrl(owner, repo, branch) {
    return [
        ENDPOINT,
        'api',
        'v0',
        owner,
        repo,
        branch
    ].join('/');
}

function report(weight) {
    if (!process.env.TRAVIS) {
        throw "Whoops, we only run in Travis right now";
    }

    if (process.env.TRAVIS_BRANCH !== 'master') {
        throw "Whoops, we only weigh master branches right now";
    }

    if (!process.env.TRAVIS_REPO_SLUG) {
        throw "Whoops, we need a repo";
    }

    var body = {
        weight: weight
    };

    var ownerRepo = process.env.TRAVIS_REPO_SLUG.split('/');
    var owner = ownerRepo[0];
    var repo = ownerRepo[1];
    var branch = process.env.TRAVIS_BRANCH;

    request.post({
        url: resourceUrl(owner, repo, branch),
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
