// const formidable = require("formidable");
// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const server = http.createServer((req, res) => {
//     if (req.url == "/fileupload" && req.method.toLowerCase() === "post") {
//         const form = new formidable.IncomingForm();
        
//         form.parse(req, (err, fields, files) => {
//             if (err) {
//                 res.writeHead(500, { "Content-Type": "text/plain" });
//                 res.end("Internal Server Error");
//                 return;
//             }
            
//             const oldpath = files.fileupload.path;
//             const filename = files.fileupload.name;
//             if (!filename) {
//                 res.writeHead(400, { "Content-Type": "text/plain" });
//                 res.end("No file uploaded");
//                 return;
//             }
//             const newpath = path.join(__dirname, filename);
            
//             fs.rename(oldpath, newpath, (err) => {
//                 if (err) {
//                     res.writeHead(500, { "Content-Type": "text/plain" });
//                     res.end("Error moving file");
//                     return;
//                 }
                
//                 res.writeHead(200, { "Content-Type": "text/html" });
//                 res.write("File uploaded and moved!");
//                 res.end();
//             });
//         });
//     } else {
//         res.writeHead(200, { "Content-type": "text/html" });
//         res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
//         res.write('<input type="file" name="fileupload"><br>');
//         res.write('<input type="submit">');
//         res.write('</form>');
//         res.end();
//     }
// });

// server.listen(3000, () => {
//     console.log("Server is running at Port 3000");
// });


const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const app = express();

app.post("/fileupload", (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).send("Internal Server Error");
            return;
        }

        const oldpath = files.fileupload.path;
        const filename = files.fileupload.name;

        if (!filename) {
            res.status(400).send("No file uploaded");
            return;
        }

        const newpath = path.join(__dirname, filename);

        fs.rename(oldpath, newpath, (err) => {
            if (err) {
                res.status(500).send("Error moving file");
                return;
            }

            res.status(200).send("File uploaded and moved!");
        });
    });
});

app.get("/", (req, res) => {

    res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="fileupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    
});

app.listen(3000, () => {
    console.log("Server is running at Port 3000");
});

