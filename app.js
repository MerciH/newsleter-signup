const express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    const data = {
        members: [
            {
                "email_address": email,
                "status": "subscribed",
                "merge_fields": {
                    "FNAME": fname,
                    "LNAME": lname
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);

    //mail chimp url to send the email data to
    const url ="https://us9.api.mailchimp.com/3.0/lists/7ad25f6407";

    const options = {
        method:"POST",
        auth:"Meme:9e86ea7d9ee9489cc1cf1e42c64ad824-us9"
    }

    const request_ = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request_.write(jsonData);
    request_.end();

    // console.log(name); console.log(email);
});

app.post("/failure", function(req, res){
    res. redirect("/");
})
var portNumber = 3000;

app.listen(portNumber, function()
    {
        console.log("server is running on port " + portNumber);
});

// MailChimp API Key
// 9e86ea7d9ee9489cc1cf1e42c64ad824-us9

//list ID
// 7ad25f6407