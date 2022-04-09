const express = require("express");
var router = express.Router();
require("dotenv").config();
var { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.jwt;
const bcrypt = require("bcryptjs");
var multer = require("multer");
const path = require("path");
const url = process.env.DB_CONNECTION;
const uploadClient = new MongoClient(url);
uploadClient.connect(() => console.log("user details connected"));

const database = uploadClient.db("cofee");
const uploadCollection = database.collection("upload");

const storage = multer.diskStorage({
  destination: "./public/profileimages",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${new Date()
        .toISOString()
        .replace(/:/g, "-")}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.use("/user", express.static("upload/images"));
router.post("/", upload.single("user"), (req, res) => {
  var encPassword = req.body.password; // storing in variables
  var salt = bcrypt.genSaltSync(10); // salting of 10 rounds
  var newPassword = bcrypt.hashSync(encPassword, salt); // hashing the password and salting it
  const files = req.file;
  const fileDetails = {
    file: files,
    name: req.body.name,
    email: req.body.email,
    password: newPassword,
    number: req.body.password,
    date: req.body.date,
    myProducts:[{productId:req.body.productId}],
    description: req.body.description,
    rating: req.body.rating,
    profile_URL: `http://localhost:4000/profileimages/${req.file.filename}`,
  };
  uploadCollection.insertOne(fileDetails, function (err, result) {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        res.send({ status: "username already exist" });
      } else {
        throw err;
      }
    } else {
      res.json({
        sucess: 1,
        profile_url: `http://localhost:4000/profileimages/${req.file.filename}`, // sending file url
        data: fileDetails,
      });
      console.log("encrypted to ", newPassword);
    }
  });
  console.log(req.file);

  // res.send({ status:"successfully uploaded"})
});

router.get("/", (req, res) => {
  uploadCollection.find({}).toArray(function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.use(errHandler);
function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      sucess: 0,
      message: "file is too !large",
    });
  }
}

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  const response = await verifyUser(email, password);
  console.log(response);
  if (response.status === "ok") {
    res.cookie("token", response.token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: false,
    });
    console.log({
      status: 201,
      data: response.data,
    });
    res.json({
      data: response.data,
      token: response.token,
    });
  } else {
    res.send(response);
  }
});
const verifyUser = async (email, password) => {
  try {
    const user = await uploadCollection.findOne({ email: email });
    console.log(user);
    if (!user) {
      return {
        status: "error",
        error: "user Not found",
      };
    } else {
      if (await bcrypt.compare(password, user.password)) {
        var token = jwt.sign(
          { id: user._id, user: user.email, type: "user" },
          JWT_SECRET
        );
        return {
          status: "ok",
          token: token,
          data: user,
        };
      } else
        return {
          status: "error",
          error: "invalid password",
        };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: error,
    };
  }
};

router.get("/:id", (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  uploadCollection.findOne(query, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.put("/:id", upload.single("user"), (req, res) => {
  var encPassword = req.body.password; // storing in variables
  var salt = bcrypt.genSaltSync(10); // salting of 10 rounds
  var newPassword = bcrypt.hashSync(encPassword, salt); // hashing the password and salting it
  if (req.file) {
    const files = req.file;
    const fileDetails = {
      file: files,
      name:req.body.name,
      password: newPassword,
      number: req.body.number,
      description:req.body.description,
      profile_URL: `http://localhost:4000/profileimages/${req.file.filename}`,
    };
    var value = { $set: fileDetails };
    var query = { _id: new ObjectId(req.params.id) };
    uploadCollection.updateOne(query, value, function (err, result) {
      if (err) throw err;
      res.send({
        status: "userdetails updated sucessfully",
      });
    });
  } else if(!req.body.file) {
    const details = {
      name: req.body.name,
      password: newPassword,
      number: req.body.password,
      description: req.body.description,
      rating: req.body.rating,
    };

    var value = { $set: details };
    var query = { _id: new ObjectId(req.params.id) };
    uploadCollection.updateOne(query, value, function (err, result) {
      if (err) throw err;
      res.send({ status: "updated" });
    });
  }
  else if(req.body.productId){
    const productID={
      myProducts:[{productId:req.body.productId}],
    }
    var value= {$push :productID};
    var query = {_id: new ObjectId(req.params.id)}
    uploadCollection.updateOne(query, value, function (err, result){
      if (err) throw err;
      res.send({ status: "product Added sucessfully" });
    })
  }
});

module.exports = router;
