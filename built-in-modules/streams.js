const { createReadStream } = require('fs');

// const stream = createReadStream('./content/huge-file.txt', {encoding: 'utf-8'})

//default size - 64kb
const stream = createReadStream("./content/huge-file.txt");

stream.on('data', (result) => console.log(result))
stream.on('error', (err) => console.log(err))