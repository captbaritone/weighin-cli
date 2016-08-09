var fetch = require('node-fetch');

var ENDPOINT = 'http://localhost:3000';

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

    var body = JSON.stringify({
        repoSlug: process.env.TRAVIS_REPO_SLUG,
        branch: process.env.TRAVIS_BRANCH,
        weight: weight
    });

    var request = {
        method: 'POST',
        body: body
    };

    fetch(ENDPOINT, request).then(function(res) {
        console.log(res.json());
    }).catch(function(err) {
        console.log(err);
    });
}

module.exports = report;


