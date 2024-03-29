console.log('Before');
// getUser(1, (user) => {
//     console.log('user', user);
    
//     // Get the repositories
//     getRepositories(user.gitHubUsername, (repos) => {
//         console.log('Repos', repos);
        
//         // Get the commits
//         getcommits(repos[0], (commits) => {
//             // CALLBACK HELL
//         })
//     })
// });

// getUser(1).then(user => console.log(user));

// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message));

// Async and Await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}
displayCommits();



console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        // Kick off some async work
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos'));
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading Commits...');
            resolve(['commit1', 'commit2', 'commit3', 'commit4', 'commit5']);
        }, 2000);
    });
}