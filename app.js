//app.js
const readline = require("readline");
const fs = require("fs");
const http = require("http");
const url = require("url");

const html = fs.readFileSync("./Template/index.html", "utf-8");
let product = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
let productListHTML = fs.readFileSync("./Template/product-list.html", "utf-8");
let productDetailsHTML = fs.readFileSync(
  "./Template/product-details.html",
  "utf-8"
);

function replaceHTMLArray(template, product) {
  let output = productListHTML.replace("{{%IMAGES%}}", product.productImage);
  output = output.replace("{{%NAME%}}", product.name);
  output = output.replace("{{%MODELNAME%}}", product.modeName);
  output = output.replace("{{%MODELNO%}}", product.modelNumber);
  output = output.replace("{{%SIZE%}}", product.size);
  output = output.replace("{{%CAMERA%}}", product.camera);
  output = output.replace("{{%PRICE%}}", product.price);
  output = output.replace("{{%COLOR%}}", product.color);
  output = output.replace("{{%ID%}}", product.id);
  output = output.replace("{{%ROM%}}", product.ROM);
  output = output.replace("{{%DESC%}}", product.Description);

  return output;
}

// STEP1: CREATE THE SERVER
const server = http.createServer((request, response) => {
  let { query, pathname: path } = url.parse(request.url, true);
  //console.log(x);
  //let path = request.url;

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
    if (!query.id) {
      let productHTMLArray = product.map((prod) => {
        return replaceHTMLArray(productListHTML, prod);
      });
      let productResponse = html.replace(
        "{{%CONTENT%}}",
        productHTMLArray.join(",")
      );
      response.writeHead(200, { "Content-type": "text/html" });
      response.end(productResponse);
    } else {
      let prod = product[query.id];
      let productDetailsResponseHTML = replaceHTMLArray(
        productDetailsHTML,
        prod
      );
      response.end(html.replace("{{%CONTENT%}}", productDetailsResponseHTML));
    }
  } else {
    response.writeHead(404);
    response.end(html.replace("{{%CONTENT%}}", "Page not found!"));
  }
});

/* STEP2: START THE SERVER
192.168.1.241 if in flat
192.168.1.99 if in house
*/
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
