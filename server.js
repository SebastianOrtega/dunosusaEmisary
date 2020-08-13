var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./routes/apiRoutes")(app);

app.listen(PORT, function () {
  console.log("Esperando POST: " + PORT);
});
