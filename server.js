const bodyParser = require("body-parser");
const express = require("express");
const _ = require("loadsh");
//require("body-parser-xml")(bodyParser);
const app = express();
const PORT = process.env.PORT || 8080;
const Equipos = require("./equipos.js");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//console.log("Equipos : ", Equipos.Equipo3[0]);
//app.use(bodyParser.text({ type: "text/*" }));

app.post("*", function (req, res) {
  res.sendStatus(200);
  const Antena = [[], [], [], []];
  const _JSONsAEnviar = {};
  let arregloJSONs = [];

  console.log("************************************************");
  console.log(Math.floor(Math.random() * 1000));
  const body = req.body;

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
  //console.log("ArregloAntenas", Antena);
  // console.log("Antena: ", Antena.length);

  for (let index = 0; index < Antena.length; index++) {
    //console.log("Trabajando Antena: " + index);
    const element = Antena[index];

    const arregloTags = [];
    if (element.length !== 0) {
      //console.log("Elemento " + index + ": " + element.length);
      let date;
      element.map((tag) => {
        Anden = Equipos[String(tag[4])][String(tag[5])];
        //console.log(tag);
        date = tag[1];
        let objeto = {};
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
      });

      _.assign(_JSONsAEnviar, {
        location: Anden,
        date,
        tagcount: element.length,
        tags: arregloTags,
      });
      arregloJSONs.push({ ..._JSONsAEnviar });
    }
  }

  console.log("================================================");
  arregloJSONs.map((dato) => console.log(dato));
  console.log("------------------------------------------------");
});
let n = 0;
//setInterval(contador, 1000);

app.listen(PORT, function () {
  console.log("Esperando POST: " + PORT);
});

function contador() {
  console.log(n++);
}
