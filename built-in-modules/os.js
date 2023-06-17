const os = require('os');

console.log(os.userInfo());

const osDetails = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
}

console.log(osDetails);