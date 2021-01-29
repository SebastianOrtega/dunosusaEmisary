const bodyParser = require("body-parser");
const express = require("express");
const _ = require("loadsh");
//require("body-parser-xml")(bodyParser);
const app = express();
const PORT = process.env.PORT || 8080;
const Equipos = require("./equipos.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//console.log("Equipos : ", Equipos.Equipo3[0]);
//app.use(bodyParser.text({ type: "text/*" }));

app.post("*", function (req, res) {
  const Antena = [[], [], [], []];
  const JSONsAEnviar = [];

  console.log("************************************************");
  console.log(Math.floor(Math.random() * 1000));
  const body = req.body;
  //console.log(body);

  //console.log("···············································");

  //console.log(req.body.datos);

  for (let index = 0; index < req.body.datos.length; index++) {
    const element = req.body.datos[index];

    //console.log(Equipos[element[4]][element[5]]); //element[ 4 ]  es el nombre del equipo, element[ 5 ] es el numero de la antena
    let Anden = Equipos[element[4]][element[5]];
    if (element[5] == 0) {
      Antena[0].push(element);
    } else if (element[5] == 1) {
      Antena[1].push(element);
    } else if (element[5] == 2) {
      Antena[2].push(element);
    } else if (element[5] == 3) {
      Antena[3].push(element);
    }
  }
  console.log("Antena: ", Antena.length);
  for (let index = 0; index < Antena.length; index++) {
    const element = Antena[index];

    if (element.length !== 0)
      console.log("Elemento " + index + ": " + element.length);
    const arregloTags = [];
    element.map((tag) => {
      Anden = Equipos[String(tag[4])][String(tag[5])];
      //console.log(tag);
      const objeto = {};
      let TipoTag = "";

      String(tag[0]).startsWith("3130")
        ? (TipoTag = "Contenedor")
        : (TipoTag = "Camion");

      _.assign(objeto, {
        rssi: tag[3],
        logicaldevice: Anden,
        count: tag[2],
        epc: tag[0],
        fields: { TipoTag },
      });

      arregloTags.push(objeto);

      //console.log("TAG: ", tag[4], tag[5]);
      //console.log("Date: ", tag[1]);

      //console.log(JSONxAntena);
    });
    console.log("ArregloTags", arregloTags);
  }

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

/* const JSONxAntena = {
  location: Anden,
  date: 0,
  tagcount: String(element.length),
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
}; */
