
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load list route
var customersweb = require('./routes/customersweb');
var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');

var base64 = require('base-64');

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/
var db = process.env.database.trim();
var host = process.env.host.trim();
var password = process.env.password.trim();
var port = process.env.port.trim();
var username = process.env.username.trim();


app.use(

    connection(mysql,{
        //host: '1.2.3.4', // host mysql service
        //user: 'root',
        //password : 'generated',
        //port : 3306, // port mysql service
        //database:'sampledb'
      
        host: host, // host mysql service
        user: username,
        password : password,
        port : port, 
        database: db
      
      

    },'pool') // pool or single

);


// Web application
app.get('/', customersweb.listall);



app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
