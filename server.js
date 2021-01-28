var express = require("express");
var bodyParser = require("body-parser");
//require("body-parser-xml")(bodyParser);
var app = express();
var PORT = process.env.PORT || 8080;
const Equipos = require("./equipos.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//console.log("Equipos : ", Equipos.Equipo3[0]);
//app.use(bodyParser.text({ type: "text/*" }));

app.post("*", function (req, res) {
  console.log("************************************************");
  console.log(Math.floor(Math.random() * 1000));
  const body = req.body;
  console.log(body);
  //console.log(Equipos[body.Equipo[]]);

  /* let nuevo = req.body.replace(/[\n\r]+/g, "");
  let array = nuevo.split(";");
  //console.log("ultimo", array[array.length]);
  array[array.length - 1] = array[array.length - 1].replace("#IOs", "");
  array[array.length - 1] = '{"IOS":"' + array[array.length - 1] + '"}';
  //console.log(array);

  array.map((dato) => console.log(JSON.parse(dato))); */
  console.log("···············································");

  let dato_a_enviar = {
    location: "Equipos.req.body.Equipo",
    date: 1611687247620,
    tagcount: "1",
    tags: [
      {
        rssi: "-43.5",
        logicaldevice: "Anden7",
        count: "27",
        epc: "313030303030303030303031",
        fields: {
          TipoTag: "Contenedor",
        },
      },
    ],
  };
  console.log("Resultado: ", dato_a_enviar);
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
