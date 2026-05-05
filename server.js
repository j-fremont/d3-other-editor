var path = require("path");
var express = require("express");

var DIST_DIR = path.join(__dirname, "build");
var PORT = 3033;
var app = express();

app.use(express.static(DIST_DIR));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
