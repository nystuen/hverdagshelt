let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app: Object, eventCategoryDao: Object) {
  app.get("/get_eventcategory", urlencodedParser, (req, res) => {
    console.log("got request from get_eventcategory");

    eventCategoryDao.getEventCategory((status, data) => {
      res.status(status);
      res.json(data);
    });
  });
};
