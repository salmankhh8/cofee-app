var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");

//stotrage engine

const storage = multer.diskStorage({
  destination: "./testimage/images",
  filename: (req, file, cb) => {
    return cb( 
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.use("/profile", express.static("testimage/images"));

router.post("/", upload.single("profile"), (req, res) => {
  res.json({
    success: 1,
    profile_URL: `http://localhost:4000/public/images/${req.file.filename}`,
  });
});

module.exports = router;
