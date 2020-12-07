// There is an error in this file and skipping it for now without debuging

console.log('Before');
getUser(1, getRepositories);
console.log('After');

function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
    console.log(repos);
    // getCommits(repos[0], displayCommits);
}

// function displayCommits(commits) {
//     console.log(commits);
// }

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...', callback);
        // callback({ username: username, repositories: ['repo1', 'repo2', 'repo3'] });
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('Reading Commits...');
        callback(['commit1', 'commit2', 'commit3', 'commit4', 'commit5']);
    }, 2000);
}