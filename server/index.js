const express = require("express");
const app = express();

const path = require("path");
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

    fs.unlinkSync("public/" + req.file.filename);

    const filepath = path.resolve("outputFolder/" + req.file.filename);

    return res.sendFile(filepath, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
    // res.download(filepath, req.file.filename);
  });
});

app.listen(PORT, () => {
  console.log("Server started at PORT " + PORT);
});
