
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'my_data'
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('rentacar', { title: 'Express' });
});
router.get('/rentacar', function (req, res) {
    res.render('rentacar', { title: 'rentacar' });
});
router.get('/home', function (req, res) {
    res.render('home', { title: 'index' });
});
router.get('/index', function (req, res) {
    res.render('index', { title: 'index' });
});
/*router.get('/login', function (req, res) {
    res.render('login', { title: 'login' });
});**/
router.get('/admin', function (req, res) {
    res.render('admin', { title: 'admin' });
});
router.get('/carlist', function (req, res) {
    connection.query("select * from carinfo",function (err,rows) {
        console.log(rows);
        res.render('carlist', { title: 'details',carlist:rows });
    });
});
router.get('/details', function (req, res) {
    res.render('details', { title: 'details' });
});
router.get('/userdetails', function (req, res) {
    res.render('userdetails', { title: 'userdetails' });
});
/*router.get('/audicars', function (req, res) {
    res.render('audicars', {title: 'audicars'});
});*/
router.get('/contact', function (req, res) {
    res.render('contact', { title: 'contact' });
});


module.exports = router;
