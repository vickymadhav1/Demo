const HTTP = require ('http');
const express = require('express');
const path = require('path')
const nodemailer = require('nodemailer');
const bodyparser= require('body-parser');
const exphbs = require('express-handlebars');

const app =express();
 
app.listen(5000, function () {
    console.log('port is running on 5000!')
});
app.use('/include',express.static('include'));
app.use('vendor',express.static('vendor')); //load files & plugins from assets
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/include', express.static('include'));
app.use('/images', express.static('images'));

// about.html page calling
app.get('/about/', function (req, res) {
    res.sendFile(__dirname + '/about.html');
});

//gallery.html page calling
app.get('/gallery/', function (req, res) {
    res.sendFile(__dirname + '/gallery.html');
});

//single.html page calling
app.get('/single/', function (req, res) {
    res.sendFile(__dirname + '/single.html');
});
// contact page calling
app.get('/contact/', function (req, res) {
    res.sendFile(__dirname + '/contact.html');
});
//category.html page calling
app.get('/category/', function (req, res) {
    res.sendFile(__dirname + '/category.html');
});
//single-standard.html page calling
app.get('/single-standard/', function (req, res) {
    res.sendFile(__dirname + '/single-standard.html');
});
//style-guide.html page calling
app.get('/style-guide/', function (req, res) {
    res.sendFile(__dirname + '/style-guide.html');
});
//index page calling
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//send Email 
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
//body parser middle ware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.post('/contact/', (req,res) => {
   console.log('Email is', req.body)
const output=`
<p>You have a new Enquiry</p>
<h3>Contact detils</h3>
<ul>
<li>Email: ${req.body.cName}</li>
<li>option: ${req.body.cEmail}</li>
<li>:Website ${req.body.cWebsite}</li>
<li>message: ${req.body.cMessage}</li>
</ul>
<h3>message<h3>
<h5>${req.body.message }</h5>
`;
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
   // host: 'mail.traversymeadia.com',
   service: 'gmail',
   port: 587,
   secure: false, // true for 465, false for other ports
   auth: {
       user:'testvigilare@gmail.com', // generated ethereal user
       pass: 'testdurity' // generated ethereal password
   },
   tls:{
       rejectUnauthorized:false
   }
});
// setup email data with unicode symbols
let mailOptions = {
   from: '"Ardizen" <testvigilare@gmail.com>', // sender address
   to: 'vickymadhav2@gmail.com', // list of receivers
   subject: 'need Demo', // Subject line
   text: 'Hello world!', // plain text body
   html: output // html body
};
// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
    return console.log(error);
   }
});
});

