const { response } = require("express");

module.exports = function (app) {
  app.post("/", function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
  });
};
