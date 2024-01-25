//app.js
const readline = require("readline");
const fs = require("fs");
const http = require("http");
const url = require("url");

const html = fs.readFileSync("./Template/index.html", "utf-8");
let product = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
let productListHTML = fs.readFileSync("./Template/product-list.html", "utf-8");

let productHTMLArray = product.map((prod) => {
  let output = productListHTML.replace("{{%IMAGES%}}", prod.productImage);
  output = output.replace("{{%NAME%}}", prod.name);
  output = output.replace("{{%MODELNAME%}}", prod.modeName);
  output = output.replace("{{%MODELNO%}}", prod.modelNumber);
  output = output.replace("{{%SIZE%}}", prod.size);
  output = output.replace("{{%CAMERA%}}", prod.camera);
  output = output.replace("{{%PRICE%}}", prod.price);
  output = output.replace("{{%COLOR%}}", prod.color);
  output = output.replace("{{%ID%}}", prod.id);
  output = output.replace("{{%ROM%}}", prod.ROM);
  output = output.replace("{{%DESC%}}", prod.Description);

  return output;
});

// STEP1: CREATE THE SERVER
const server = http.createServer((request, response) => {
  let { query, pathname: path } = url.parse(request.url, true);
  console.log(x);
  let path = request.url;

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.writeHead(200, {
      "Content-type": "text/html",
      "my-header": "DOPE SHIT!",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in the Home Page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200);
    response.end(
      html.replace(
        "{{%CONTENT%}}",
        "You are in the About page. Learn more about us!"
      )
    );
  } else if (path.toLocaleLowerCase() === "/contact") {
    response.writeHead(200);
    response.end(
      html.replace(
        "{{%CONTENT%}}",
        "You are in the Contact page. Contact us now!"
      )
    );
  } else if (path.toLocaleLowerCase() === "/products") {
    let productResponse = html.replace(
      "{{%CONTENT%}}",
      productHTMLArray.join(",")
    );
    response.writeHead(200, { "Content-type": "text/html" });
    response.end(productResponse);
  } else {
    response.writeHead(404);
    response.end(html.replace("{{%CONTENT%}}", "Page not found!"));
  }
});

/* STEP2: START THE SERVER
192.168.1.241 if in flat
192.168.1.99 if in house
*/
server.listen(8000, "192.168.1.99", () => {
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
