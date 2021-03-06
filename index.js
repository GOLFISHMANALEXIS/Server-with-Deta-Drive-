const { Deta } = require("deta");
const express = require("express");
const upload = require("express-fileupload");
PORT = 3000;

const app = express();

app.use(upload());

const deta = Deta("b0ei6rus_9YsU9imxXfJMfgsTpPBH9eP9ufJtSVV5");
const drive = deta.Drive("images");
//b0ei6rus
app.get('/', (req, res) => {
    res.send(`
    <form action="/upload" enctype="multipart/form-data" method="post">
      <input type="file" name="file">
      <input type="submit" value="Upload">
    </form>`);
});

app.post("/upload", async (req, res) => {
    const name = req.files.file.name;
    const contents = req.files.file.data;
    const img = await drive.put(name, {data: contents});
    res.send(img);
});
app.get("/download/:name", async (req, res) => {
    const name = req.params.name;
    const img = await drive.get(name);
    const buffer = await img.arrayBuffer();
    res.send(Buffer.from(buffer));
    new Error(message);
}); 

app.listen(
    PORT,
     () => 
     console.log(`Listening on http://localhost:${PORT}`));