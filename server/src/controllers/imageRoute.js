let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
const multer = require("multer");
const path = require('path');
const fs = require('fs');

module.exports = function (app: Object) {

    const handleError = (err, res) => {
      res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
    };

    const upload = multer({
      dest: "./images"
    });


    app.post(
      "/upload",
      upload.single("avatar"),
      (req, res) => {
        console.log(req.file)
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../../images/" + (req.file.filename)+".png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
          fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            res.status(200)
            res.json(req.file.filename+".png")
          });
        } else {
          fs.unlink(tempPath, err => {
            if (err) return handleError(err, res);

            res
              .status(403)
              .contentType("text/plain")
              .end("Only .png files are allowed!");
          });
        }
      }
    );

    app.get("/image/:imagePath", (req, res) => {
      res.sendFile(path.join(__dirname, "../../images/"+req.params.imagePath));
    });
};
