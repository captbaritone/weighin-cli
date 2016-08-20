var request = require('request');

var isTravis = require('./parseEnvironment').isTravis;
var isPullRequest = require('./parseEnvironment').isPullRequest;
var isPushToMaster = require('./parseEnvironment').isPushToMaster;
var getPullRequestNumber = require('./parseEnvironment').getPullRequestNumber;
var getOwner = require('./parseEnvironment').getOwner;
var getRepo = require('./parseEnvironment').getRepo;

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
    if (!isTravis(process.env)) {
        throw "Whoops, we only run in Travis right now";
    }

    var owner = getOwner(process.env);
    var repo = getRepo(process.env);
    var pull = isPullRequest(process.env) ? getPullRequestNumber(process.env) : null;

    if (!(isPushToMaster(process.env) || isPullRequest(process.env))) {
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
