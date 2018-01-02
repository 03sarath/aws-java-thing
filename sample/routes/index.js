var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath:'5a26619c73-private.pem.key' ,
    certPath: '5a26619c73-certificate.pem.crt',
    caPath: 'rootCA.pem',
    clientId:'MyBus',
    host:'adaexyrkpjo5d.iot.ap-southeast-1.amazonaws.com'
});

var contents ="Started.....!!!!";

//function myfunction() {

//}



app.use(bodyParser.urlencoded({ extended : false }));
/* GET home page. */



app.get('/', function (req, res) {
    res.render('index.ejs');
});



app.post('/top', function (req, res)
{
   // device.on('connect', function () {

        //console.log('connect');
        //device.subscribe(busPolicy);
        device.publish('$aws/things/IoTTestDevice/shadow/update', JSON.stringify({
            "state": {
                "reported": {
                    "test_value1": 99,
                    "test_value2": 82,
                    "test_value3": 66
                }
            }
        }));
        // console.log('Message Sent...');

  //  });
    console.log(req.body.todo + " is added to top of the list.");
    res.redirect('/');
    //myfunction();
});

app.post('/bottom', function (req, res) {
    console.log(req.body.todo + " is added to bottom of the list.");
    res.redirect('/');
});

app.listen(8000);
console.log('App is listening on PORT 8000');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
