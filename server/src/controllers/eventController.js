let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app: Object, eventDao: Object) {
  app.post("/add_event", urlencodedParser, (req, res) => {
    console.log("received post request from add_event");
    eventDao.addEvent(req.body, (status, data) => {
      res.status(status);
    });
  });
};
