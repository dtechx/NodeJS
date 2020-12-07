// Asynchronous
console.log('Before');
getUser(1, (user) => {
    console.log('user', user);
    
    // Get the repositories
    getRepositories(user.gitHubUsername, (repos) => {
        console.log('Repos', repos);
        
        // Get the commits
        getcommits(repos[0], (commits) => {
            // CALLBACK HELL
        })
    });
});
console.log('After');

// Synchronous
console.log('Before');
const user = getUSer(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
console.log('After');



function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...')
        // callback({ username: username, repositories: ['repo1', 'repo2', 'repo3'] });
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}