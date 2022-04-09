var express = require('express');
var router = express.Router();
var{MongoClient, ObjectId}= require('mongodb')

const url= "mongodb+srv://salmankhh8:salmankhh8@cluster0.1r0c2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const reviewClient = new MongoClient(url)
reviewClient.connect()

const database = reviewClient.db("cofee")

var reviewCollection = database.collection("review")


// for getting the data

router.get('/', function(req, res){
    reviewCollection.find({}).toArray(function(err,result){
        if(err) throw err;
        res.send(result)
    })
});

//postinga new data
router.post("/", function(req, res){
    const inserterQuery={
        name:req.body.name,
        message:req.body.message,
        time: new Date().toLocaleDateString()
    }
    reviewCollection.insertOne(inserterQuery, function(err,result){
        if(err) throw err;
        res.send({status:"review added"})
    })
})









module.exports = router