var request = require('request');

var ENDPOINT = 'http://weighin.jordaneldredge.com';

function getEnv(key) {
    var value = process.env[key];
    switch(value) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return value;
    }
}


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
    if (!getEnv('TRAVIS')) {
        throw "Whoops, we only run in Travis right now";
    }

    if (!getEnv('TRAVIS_REPO_SLUG')) {
        throw "Whoops, we need a repo";
    }

    var ownerRepo = getEnv('TRAVIS_REPO_SLUG').split('/');
    var owner = ownerRepo[0];
    var repo = ownerRepo[1];
    var pull = getEnv('TRAVIS_PULL_REQUEST');

    if (pull && getEnv('TRAVIS_BRANCH') ==! 'master') {
        console.log('We are not testing master or a pull request. Exiting.');
        return;
    }

    var body = {
        weight: weight
    };

    var url = resourceUrl(owner, repo, pull);

    console.log(process.env);

    request.post({
        url: url,
        method: "POST",
        json: body
    }, function(err, response, result) {
        if (response.statusCode === 200) {
            console.log('SUCCESS! Reported:', body, 'to', url);
        } else {
            console.log('Whoops! Got ' + response.statusCode + ':', response.body);
        }
    });
}

module.exports = report;
