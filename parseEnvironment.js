function getEnvVar(env, key) {
    var value = env[key];
    switch(value) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return value;
    }
}

function isTravis(env) {
    return getEnvVar(env, 'TRAVIS');
};

function isPullRequest(env) {
    return getEnvVar(env, 'TRAVIS_EVENT_TYPE') === 'pull_request';
};

function isPushToMaster(env) {
    return getEnvVar(env, 'TRAVIS_EVENT_TYPE') === 'push' &&
           getEnvVar(env, 'TRAVIS_BRANCH') === 'master';
};

function getPullRequestNumber(env) {
    return parseInt(getEnvVar(env, 'TRAVIS_PULL_REQUEST'), 10);
};

function _getOwnerRepo(env) {
    return getEnvVar(env, 'TRAVIS_REPO_SLUG');
};

function getOwner(env) {
    return _getOwnerRepo(env).split('/')[0];
}

function getRepo(env) {
    return _getOwnerRepo(env).split('/')[1];
}

module.exports = {
    isTravis: isTravis,
    isPullRequest: isPullRequest,
    isPushToMaster: isPushToMaster,
    getPullRequestNumber: getPullRequestNumber,
    getOwner: getOwner,
    getRepo: getRepo
}
