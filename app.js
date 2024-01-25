//app.js
const readline = require("readline");
const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("./Template/index.html", "utf-8");
// STEP1: CREATE THE SERVER
const server = http.createServer((request, response) => {
  response.end(html);
  console.log("A new request was made");
  //console.log(response);
});

// STEP2: START THE SERVER
server.listen(8000, "192.168.1.241", () => {
  console.log("Server has started");
});

/* ##### TESTING WRITING FILES ASYNC  #####

fs.readFile("./files/start.txt", "utf-8", (error1, data1) => {
  console.log(data1);
  setTimeout(() => {
    fs.readFile(`./files/${data1}.txt`, "utf-8", (error2, data2) => {
      console.log(data2);
      setTimeout(() => {
        fs.readFile(`./files/append.txt`, "utf-8", (error3, data3) => {
          console.log(data3);
          fs.writeFile(
            `./files/end.txt`,
            `${data2}\n\n${data3}\n\nDate created: ${new Date()}`,
            () => {
              console.log("Files written successfully");
            }
          );
        });
      }, 500);
    });
  }, 1000);
});

console.log("Reading file..."); 
################################# */

/* #### WRITE FILES SYNCHRONOUSLY ####
let textIn = fs.readFileSync("./files/input.txt", "utf-8");
console.log(textIn);

let content = `Data read from input.txt: ${textIn}. \nDate created: ${new Date()}`;
fs.writeFileSync("./files/output.txt", content); 
##################################### */

/* ##### READ LINE CODE EXAMPLES ##### 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter your name:", (name) => {
  console.log("You entered: " + name);
  rl.close();
});

rl.on("close", () => {
  console.log("Interface closed");
  process.exit(0);
});
################################
 */
