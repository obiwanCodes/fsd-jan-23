const { readFileSync, writeFileSync } = require("fs");

console.log("start")
//console.log(readFileSync("./content/hello.txt", "utf-8"));
console.log(readFileSync("./content/huge-file.txt"));
console.log("end");

// const firstFile = readFileSync('./content/hello.txt', 'utf-8');
// const secondFile = readFileSync("./content/hola.txt", "utf-8");
// writeFileSync("./content/namaste.txt", `Here is the combined content from both files: ${firstFile}\n\n\n${secondFile}`, {flag: 'a'});