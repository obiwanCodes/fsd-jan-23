const { readFile, writeFile } = require("fs");

// readFile('./content/hello.txt', 'utf-8', (err, result) => {
//     if (err) {
//         console.log(err)
//         return;
//     }
//     const firstFile = result;
//     readFile("./content/hola.txt", "utf-8", (err, result) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//         const secondFile = result;
//         writeFile(
//           "./content/namaste-async.txt",
//           `Here is the combined content from both files: ${firstFile}\n\n\n${secondFile}`,
//             { flag: "a" }, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 console.log("done with the task")    
//             }
//         );
//     });
// })

console.log("start");
const readTwoFilesAndWriteIntoThird = async (filePath1, filePath2, filePath3) => {
    let firstFile, secondFile;
    await readFile(filePath1, "utf-8", (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        firstFile = result;
    })
    await readFile(filePath2, "utf-8", (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        secondFile = result;
    })
    await writeFile(
      filePath3,
      `Here is the combined content from both files: ${firstFile}\n\n\n${secondFile}`,
      { flag: "a" },
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("done with the task");
      }
    );
}
readTwoFilesAndWriteIntoThird(
  "./content/hello.txt",
  "./content/hola.txt",
  "./content/namaste-async.txt"
);
console.log("end");

