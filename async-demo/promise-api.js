const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
        //reject(new Error('because something failed'));
    }, 3000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
});

// Waiting for complete all of the operation 
// Promise.all([p1, p2])
//     .then(result => console.log(result))
//     .catch(err => console.log('Error', err.message));


// Proceed if any of the promises completes
Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));





// const p = Promise.resolve({ id: 1});
// p.then(result => console.log(result));

// const p1 = Promise.reject(new Error('reason for rejection...'));
// p1.catch(error => console.log(error));

// const p2 = Promise.reject('reason for rejection...');
// p2.catch(error => console.log(error));