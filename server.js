var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  console.log("*****************JSON NUEVO*********************");
  console.log(req.body);
  console.log("-------------------Completo---------------------");
  console.log(JSON.stringify(req.body));
  console.log("************************************************");
  res.sendStatus(200);
});

app.listen(PORT, function () {
  console.log("Esperando POST: " + PORT);
});
