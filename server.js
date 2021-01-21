var express = require("express");
var bodyParser = require("body-parser");
//require("body-parser-xml")(bodyParser);
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));

//app.use(bodyParser.text({ type: "text/*" }));

app.post("*", function (req, res) {
  console.log("************************************************");
  console.log(req.body);
  /* let nuevo = req.body.replace(/[\n\r]+/g, "");
  let array = nuevo.split(";");
  //console.log("ultimo", array[array.length]);
  array[array.length - 1] = array[array.length - 1].replace("#IOs", "");
  array[array.length - 1] = '{"IOS":"' + array[array.length - 1] + '"}';
  //console.log(array);

  array.map((dato) => console.log(JSON.parse(dato))); */
  console.log("------------------------------------------------");
  // console.log("************************************************");
  res.sendStatus(200);
});
let n = 0;
//setInterval(contador, 1000);

app.listen(PORT, function () {
  console.log("Esperando POST: " + PORT);
});

function contador() {
  console.log(n++);
}
