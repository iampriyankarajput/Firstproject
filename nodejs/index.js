var express = require('express');
var path = require('path');
var app = express();
var mongoose = require("mongoose");
var myParser = require("body-parser");
var server = app.listen(3000,listening);
function listening(){
    console.log("listening.. at 3000");
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nodejs',{useNewUrlParser: true},(err)=>{
    if(!err){console.log('mongodb connection succeeded.')}
    else{console.log('error in connection:'+err)}
});
var urlencodedParser = myParser.urlencoded({ extended: false });

var nameSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    Email_Id: {
        
            type: String,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
          
    },
    Mobile_Number: {
        type: Number,
        unique: true,
        required: "Password is Required",
        validate: [
            function(input) {
              return input.length = 10;
            },
            
          ]

    },
    Gender: String,


    password: {
        type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
    },

    Address: String
   });


   var User = mongoose.model("User", nameSchema);

// app.use(express.static('website'));
app.get('/', function (req, res) {
    User.find(function(err, result) {
        console.log(result);
    })
    res.sendFile('list.html', {
        root: path.join(__dirname, './')
    })
});

// app.use(express.static('website'));
app.get('/create', function (req, res) {
    console.log(req.body)
    res.sendFile('eg.html', {
        root: path.join(__dirname, './')
    })
});

app.post('/create', urlencodedParser, function (req, res) {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


app.get('/login', function (req, res) {
    res.sendFile('login.html', {
        root: path.join(__dirname, './')
    })
});

app.post('/login', urlencodedParser, function (req, res) {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});
    