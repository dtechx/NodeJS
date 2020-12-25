// _id: 5a724953ab83547957541e6a 24 Letters

// 12 Bytes by taking two letters as a byte
    // 4 bytes: timestamp
    // 3 bytes: machine identifier (two different machines will have two different)
    // 2 bytes: process identifier
    // 3 bytes: counter

// 1 byte = 8bits
// 2 ^ 8 256
// 2 ^ 24 = 16M since 3 bytes counter

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();

console.log(id);
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);

