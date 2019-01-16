let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app: Object, eventDao: Object) {
  app.get("/importantEvents/:countyId", (req, res) => {
    console.log("gets 10 newest events" + req.params.countyId);
    eventDao.get10newestEvents(req.params.countyId, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.post("/add_event", urlencodedParser, (req, res) => {
    console.log("received post request from add_event");
    eventDao.addEvent(req.body, (status, data) => {
      res.status(status);
    });
  });
};
