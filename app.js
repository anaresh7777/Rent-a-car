
var express = require('express');
var path = require('path');
var multer  =   require('multer');
var app         =   express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session		=	require('express-session');

var routes = require('./routes/index');
//var users = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'my_data'
});
//connection.connect();

var sess;
app.post('/login',function(req,res){
    connection.query("select * from users where username = '" + req.body.email + "' and password = '" + req.body.pass  + "'", function (err, rows) {
        console.log(rows);
        console.log("above row object");
        var numRows = rows.length;
        console.log(numRows);
        if (err)
            return done(err);
        if (numRows == 0) {
            res.end('failed');
        }
        else {
            
            res.end('done');
        }
    });
});
//////////////////////*******************************///////////////////
var sess;
app.post('/carrent',function(req,res){
    connection.query("select * from carinfo where place = '" + req.body.pickupplace + "' and pickupdate = '" + req.body.startdate + "' and returndate = '" + req.body.enddate + "'",function (err, rows) {
        console.log(rows);
        res.type('text/plain');
        res.json(rows);
    });

});

//////////////////////*******************************///////////////////
var sess;
app.post('/userdetailform',function(req,res){
     connection.query("insert into pinfo(Firstname,Lastname,pdob,Passportnumber,dlicensenumber,carname) values('" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.dateofbirth + "','" + req.body.passnum + "','" + req.body.drivenum + "','" + req.body.carname + "')")
 res.end('You are successfully booked your car! Contact the nearest office');
 });

//////////////////////*******************************///////////////////
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + file.originalname );
    }
});
var upload = multer({ storage : storage}).single('userPhoto');
var sess;
app.post('/carinfo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
        console.log(req.file.originalname);
        connection.query("insert into carinfo(Carname,Carmodel,Enginesize,price,Image,pickupdate,returndate,place) values('" + req.body.carname + "','" + req.body.carmodel + "','" + req.body.enginesize + "','" + req.body.price + "','"+ "userPhoto-" +  req.file.originalname + "','" + req.body.pickupdate + "','" + req.body.returndate + "','" + req.body.place + "')")
        
    });

});

/*app.post('/audicars',function(req,res){
    connection.query("select * from carinfo where carname = '" + req.body.cars + "'",function (err, rows) {
        if (err) throw err;
        console.log(rows[0]);
        
       console.log(rows);
        res.type('text/plain');
        res.json(rows);
    });

});*/

var sess;
app.post('/listofcars',function(req,res){
    connection.query("select * from carinfo where carname = '" + req.body.cars + "'",function (err, rows) {
        console.log(rows);
        res.type('text/plain');
        res.json(rows);
    });

});

//////////////////////*******************************///////////////////

app.get('/',function(req,res){
    res.sendFile(__dirname + "./images");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
