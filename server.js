//const bodyParser = require("body-parser");
const express = require("express");
const _ = require("loadsh");
const axios = require("axios");
const { transports, createLogger, format } = require("winston");
const app = express();
const PORT = process.env.PORT || 8080;
const Equipos = require("./equipos.js");
const URLCamiones = "http://localhost:8001";
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
      level: "error",
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
  const Antena = [[], [], [], []];
  const _JSONsAEnviarContenedores = {};
  const _JSONsAEnviarCamiones = {};
  let arregloJSONsContenedores = [];
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

    const arregloTagsContenedores = [];
    const arregloTagsCamiones = [];
    if (element.length !== 0) {
      let date;
      element.map((tag) => {
        Anden = Equipos[String(tag[4])][String(tag[5])];
        date = tag[1];
        let objeto = {};
        let TipoTag = "";

        String(tag[0]).startsWith("3130")
          ? (TipoTag = "Camion")
          : (TipoTag = "Contenedor");

        _.assign(objeto, {
          rssi: tag[3],
          logicaldevice: Anden,
          count: tag[2],
          epc: tag[0],
          fields: {
            TipoTag,
          },
        });
        if (TipoTag === "Camion") {
          console.log("es Camion");
          arregloTagsCamiones.push(objeto);
        } else {
          console.log("es Contenedor");
          arregloTagsContenedores.push(objeto);
        }
      });
      if (arregloTagsContenedores.length > 0) {
        _.assign(_JSONsAEnviarContenedores, {
          location: Anden,
          date,
          tagcount: element.length,
          tags: arregloTagsContenedores,
        });
      }
      if (arregloTagsCamiones.length > 0) {
        _.assign(_JSONsAEnviarCamiones, {
          location: Anden,
          date,
          tagcount: element.length,
          tags: arregloTagsCamiones,
        });
      }
      arregloJSONsContenedores.push({
        ..._JSONsAEnviarContenedores,
      });
      arregloJSONsCamiones.push({
        ..._JSONsAEnviarCamiones,
      });
    }
  }
  //console.log("Camiones", arregloJSONsCamiones);
  //console.log("Contenedores", arregloJSONsContenedores);
  console.log("================================================");

  arregloJSONsContenedores.map((dato) => {
    //console.log("isEmptyContenedores: ", isEmpty(dato));
    //console.log(dato);
    if (!isEmpty(dato)) {
      console.log("Post en Contenedores ", URLContenedores);
      axios
        .post(URLContenedores, dato)
        .then((res) => {
          console.log("Resultado: ", res.status);
          console.log("------------------------------------------------");
          console.log(JSON.stringify(dato));
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        })
        .catch((error) => {
          logger.error("Error de Envio: " + String(error));
          console.log("Error en envio:", error.code);
          console.log("------------------------------------------------");
        });
    }
  });

  arregloJSONsCamiones.map((dato) => {
    // console.log("isEmptyCamiones: ", isEmpty(dato));
    // console.log(dato);
    if (!isEmpty(dato)) {
      console.log("Post en Camiones ", URLCamiones);
      axios
        .post(URLCamiones, dato)
        .then((res) => {
          console.log("Resultado: ", res.status);
          console.log("------------------------------------------------");
          console.log(JSON.stringify(dato));
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        })
        .catch((error) => {
          logger.error("Error de Envio: " + String(error));
          console.log("Error en envio:", error.code);
          console.log("------------------------------------------------");
        });
    }
  });
});

app.listen(PORT, function () {
  console.log("Esperando POST: " + PORT);
});

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
