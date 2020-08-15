const { response } = require("express");

module.exports = function (app) {
  app.post("/", function (req, res) {
    console.log("*****************JSON NUEVO*********************");
    console.log(req.body);
    console.log("-------------------Completo---------------------");
    console.log(JSON.stringify(req.body));
    console.log("************************************************");
    res.sendStatus(200);
  });
};
