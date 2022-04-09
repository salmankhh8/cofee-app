var express = require("express");
var router = express.Router();
require("dotenv").config();

var { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.jwt;
const url = process.env.DB_CONNECTION;
const registerClient = new MongoClient(url);
registerClient.connect(() => console.log("mongodb connected"));

const database = registerClient.db("cofee");
const registerCollection = database.collection("register");

router.get("/", function (req, res) {
  registerCollection.find({}).toArray(function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/", (req, res) => {
  var encPassword = req.body.password; // storing in variables
  var salt = bcrypt.genSaltSync(10); // salting of 10 rounds
  var newPassword = bcrypt.hashSync(encPassword, salt); // hashing the password and salting it
  const insertQuery = {
    name: req.body.name,
    email: req.body.email,
    password: newPassword,
    phonenumber: req.body.phonenumber,
  };
  registerCollection.insertOne(insertQuery, function (err, result) {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        res.send({ status: "username already exist" });
      } else {
        throw err;
      }
    } else {
      res.send({ status: "Registered sucessfully" });
      console.log("encrypted to ", newPassword);
    }
  });
});

////login route

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
      const user = await registerCollection.findOne({ email: email });
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


module.exports = router;
