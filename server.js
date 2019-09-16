const express = require("express");
const path = require("path");
const app = express();

const DIR = "/dist/repository";
const PORT = process.env.PORT || 8000;

app
  .use(express.static(__dirname + DIR))
  .get("/*", function(req, res) {
    res.sendFile(path.join(__dirname + DIR + "/index.html"));
  })
  .listen(PORT, () => {
    console.log("App is running on port " + PORT);
  });
