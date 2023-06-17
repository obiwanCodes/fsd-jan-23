// __dirname - directory path where the file is located
// __filename - name of the file
// require - use modules (common js)
// module - info about the current module
// process - info about the environment where the program is being executed

console.log(__dirname)
console.log(__filename);
console.log(module);
console.log(process);

setTimeout(() => console.log("hello"), 3000)