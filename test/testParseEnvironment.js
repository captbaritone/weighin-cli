var test = require('tape');
var isTravis = require('../parseEnvironment').isTravis;
var isPullRequest = require('../parseEnvironment').isPullRequest;
var isPushToMaster = require('../parseEnvironment').isPushToMaster;
var getPullRequestNumber = require('../parseEnvironment').getPullRequestNumber;
var getOwner = require('../parseEnvironment').getOwner;
var getRepo = require('../parseEnvironment').getRepo;

var pullFeatureBranchEnv = require('./fixtures/environments/pull_feature_branch');
var pushPullToMasterEnv = require('./fixtures/environments/push_pull_to_master');
var pushFeatureBranchEnv = require('./fixtures/environments/push_feature_branch');

test('isTravis', function (t) {
    t.plan(3);
    t.equal(isTravis(pullFeatureBranchEnv), true);
    t.equal(isTravis(pushPullToMasterEnv), true);
    t.equal(isTravis(pushFeatureBranchEnv), true);
});

test('isPullRequest', function (t) {
    t.plan(3);
    t.equal(isPullRequest(pullFeatureBranchEnv), true);
    t.equal(isPullRequest(pushPullToMasterEnv), false);
    t.equal(isPullRequest(pushFeatureBranchEnv), false);
});

test('isPushToMaster', function (t) {
    t.plan(3);
    t.equal(isPushToMaster(pullFeatureBranchEnv), false);
    t.equal(isPushToMaster(pushPullToMasterEnv), true);
    t.equal(isPushToMaster(pushFeatureBranchEnv), false);
});

test('getPullRequestNumber', function (t) {
    t.plan(1);
    t.equal(getPullRequestNumber(pullFeatureBranchEnv), 1);
});

test('getOwner', function (t) {
    t.plan(3);
    t.equal(getOwner(pullFeatureBranchEnv), 'captbaritone');
    t.equal(getOwner(pushPullToMasterEnv), 'captbaritone');
    t.equal(getOwner(pushFeatureBranchEnv), 'captbaritone');
});
test('getRepo', function (t) {
    t.plan(3);
    t.equal(getRepo(pullFeatureBranchEnv), 'weighin-example');
    t.equal(getRepo(pushPullToMasterEnv), 'weighin-example');
    t.equal(getRepo(pushFeatureBranchEnv), 'weighin-example');
});
