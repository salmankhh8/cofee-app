var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const userRecords = [
    {
      name:"salman",
      email:"salman@gmail.com",
    },
    {
      name:'aditya',
      email:"aditya@gmail.com",
    },
    {
      name:"harshit",
      email:"harshit@gmail.com",
    }
  ]
  res.send(userRecords);
  console.log("user data send sucessfully");
});

module.exports = router;
