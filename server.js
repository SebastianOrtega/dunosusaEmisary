//const bodyParser = require("body-parser");
const express = require("express");
const _ = require("loadsh");
const axios = require("axios");
const {
  transports,
  createLogger,
  format
} = require("winston");
const app = express();
const PORT = process.env.PORT || 8080;
const Equipos = require("./equipos.js");
const URL = "http://localhost:8000";
const URLCamiones = "http://localhost:8000";
const URLContenedores = "http://localhost:8000";

process.on("uncaughtException", (ex) => {
  console.log("ERROR");
  logger.error(ex.message, ex);
});

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/error.log",
      level: "error"
    }),
    new transports.File({
      filename: "logs/activity.log",
      level: "info",
    }),
  ],
});

//throw new Error('Algo fallo');

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("*", function (req, res) {
  res.sendStatus(200);
  const Antena = [
    [],
    [],
    [],
    []
  ];
  const _JSONsAEnviar = {};
  const _JSONsAEnviarCamiones = {};
  let arregloJSONs = [];
  let arregloJSONsCamiones = [];
  let entrada;

  console.log("************************************************");
  // console.log(Math.floor(Math.random() * 1000));
  const body = req.body;
  //console.log(body);
  entrada = req.body.Entrada;
  //console.log("Entrada: ", entrada);

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

  for (let index = 0; index < Antena.length; index++) {
    const element = Antena[index];

    const arregloTags = [];
    const arregloTagsCamiones = [];
    if (element.length !== 0) {
      let date;
      element.map((tag) => {
        Anden = Equipos[String(tag[4])][String(tag[5])];
        date = tag[1];
        let objeto = {};
        let TipoTag = "";

        String(tag[0]).startsWith("3130") ?
          (TipoTag = "Contenedor") :
          (TipoTag = "Camion");

        _.assign(objeto, {
          rssi: tag[3],
          logicaldevice: Anden,
          count: tag[2],
          epc: tag[0],
          fields: {
            TipoTag,
          },
        });
        if (TipoTag === "Camiones") {
          arregloTagsCamiones.push(objeto);
        } else {
          arregloTags.push(objeto);
        }

      });


      _.assign(_JSONsAEnviar, {
        location: Anden,
        date,
        tagcount: element.length,
        tags: arregloTags,
      });
      _.assign(_JSONsAEnviarCamiones, {
        location: Anden,
        date,
        tagcount: element.length,
        tags: arregloTagsCamiones,
      });
      arregloJSONs.push({
        ..._JSONsAEnviar,
      });
      arregloJSONsCamiones.push({
        ..._JSONsAEnviarCamiones,
      });
    }
  }

  console.log("================================================");
  arregloJSONs.map((dato) => {
    //winston.info(dato);
    //console.log("dato #" , dato);
    axios
      .post(URL, dato)
      .then((res) => {
        // console.log(`statusCode: ${res.statusCode}`)
        //console.log("Tipo: ", dato);
        console.log("Resultado: ", res.status);
        console.log("------------------------------------------------");
      })
      .catch((error) => {
        logger.error("Error de Envio: " + String(error));
        console.log("Error en envio:", error.code);
        console.log("------------------------------------------------");
      });
  });
  arregloJSONsCamiones.map((dato) => {
    //winston.info(dato);
    //console.log("dato #" , dato);
    axios
      .post(URL, dato)
      .then((res) => {
        // console.log(`statusCode: ${res.statusCode}`)
        //console.log("Tipo: ", dato);
        console.log("Resultado: ", res.status);
        console.log("------------------------------------------------");
      })
      .catch((error) => {
        logger.error("Error de Envio: " + String(error));
        console.log("Error en envio:", error.code);
        console.log("------------------------------------------------");
      });
  });
});

app.listen(PORT, function () {
  console.log("Esperando POST: " + PORT);
});