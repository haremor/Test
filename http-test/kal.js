const http = require("http");
const fs = require("fs");

const PORT = 8080;

let fileData = fs.readFileSync("table.csv", "utf-8");
fileData = fileData.split("\r\n");

let imageTable = []

let len = fileData.length;
for (let i = 0; i < len; i++) { // Process the csv file
    const el = fileData[i].split(",");
    const imageData = { path: el[0], name: el[1] };
    imageTable.push(imageData);
}

const server = http.createServer((req, res) => {
    if (req.url === "/") { // Index page response
        fs.readFile("./index.html", (e, d) => {
            res.write(!e ? d : "sluchilsya puk perduk");
            let imgs = "";
            imageTable.forEach(el => {
                imgs += `<figure>
                            <img src=\"${"./public" + el.path.substring(1)}\" alt=\"${el.name}\"></img>
                            <figcaption>${el.name}</figcaption>
                        </figure>`;
            });
            res.write(`<div id="img_container">${imgs}</div>`);
            res.end()
        })
    } else { // Image response
        const fileExt = "." + req.url.split(".").pop();
        if (fileExt === ".jpg" || fileExt === ".png") {
            fs.readFile("./" + req.url, (e, d) => {
                res.write(d, "binary");
                res.end()
            })
        }
    }
})

server.listen(PORT, () => console.log("ar u hepy nau?"))