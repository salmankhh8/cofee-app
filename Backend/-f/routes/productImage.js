const express = require("express");
var router = express.Router();

const multer = require("multer");
const path = require("path");
var { MongoClient, ObjectId } = require("mongodb");

const url = process.env.DB_CONNECTION;
const productClient = new MongoClient(url);
productClient.connect(() => console.log("product colletion connected"));

const database = productClient.db("cofee");
const productCollection = database.collection("products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const multiplefilesUpload = upload.fields([
  { name: "ProductImage" },
  { name: "supportingImage", maxCount: 5 },
]);

router.get("/", (req, res) => {
  productCollection.find({}).toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/", multiplefilesUpload, (req, res) => {
  // const fileDetails = req.files;
  const supportingImageSave = [];
  for (let i = 0; i < req.files.supportingImage.length; i++) {
    supportingImageSave.push(
      `http://localhost:4000/images/${req.files.supportingImage[i].filename}`
    );
  }
  const productDetails = {
    //  images: fileDetails,
    ownerId: req.body.ownerID,
    name: req.body.name,
    buyerId: [
      {
        buyerID: req.body.BuyerID,
        name: req.body.buyerName,
        quantity: req.body.Quantity,
        orderPrice: req.body.orderedPrice,
        adddress:req.body.BuyerAddress,
      },
    ],
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    productImage_URL: `http://localhost:4000/images/${req.files.ProductImage[0].filename}`,
    supportingImage_URL: supportingImageSave,
  };
  console.log(supportingImageSave);
  productCollection.insertOne(productDetails, function (err, result) {
    res.json({
      details: productDetails,
      status: "updated",
    });
  });
});

router.get("/:id", (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  productCollection.findOne(query, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.put("/:id", (req, res) => {
  if (req.body.price) {
    var value = { $set: { price: req.body.price } };
    var query = { _id: new ObjectId(req.params.id) };
    productCollection.updateOne(query, value, function (err, result) {
      if (err) throw err;
      res.send({ status: "price added" });
    });
  } else if (req.body.name) {
    console.log("name requested");
    var value = { $set: { name: req.body.name } };
    var query = { _id: new ObjectId(req.params.id) };
    productCollection.updateOne(query, value, function (err, result) {
      if (err) throw err;
      res.send({ status: "name changed successfully" });
    });
  } else if (req.files) {
    if (err) throw err;
    console.log("requesting product image");
    res.send({ status: "name changed successfully" });
    console.error("error");
  } else if (req.body.addTOCart) {
    var value = req.body.addTOCart
  } else {
    res.send({ status: "invalid request" });
  }
});

router.delete("/:id", (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  productCollection.deleteOne(query, function (err, result) {
    if (err) throw err;
    res.send({ status: "producted deleted sucessfully" });
  });
});
module.exports = router;
