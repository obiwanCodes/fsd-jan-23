const path = require("path");
//mport path from "path";

console.log(path.sep)

const filePath = path.join('/users/', "adityasingh/", "desktop/", "path-module.txt");
console.log(filePath);

const base = path.basename(filePath);
console.log(base);  //name of the file