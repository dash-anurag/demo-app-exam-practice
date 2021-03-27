const express = require("express");
const app = express();

const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const editExcel = require("./utils/editExcel");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage }).single("file");

const PORT = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.post("/upload", (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    await editExcel("public/" + req.file.filename, req.file.filename);
    // console.log("public/" + req.file.filename);
    fs.unlinkSync("public/" + req.file.filename);
    return res.status(200).send(req.file);
  });
});

app.listen(PORT, () => {
  console.log("Server started at PORT " + PORT);
});
