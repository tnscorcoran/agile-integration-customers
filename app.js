
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

app.use(

    connection(mysql,{

        //host: '172.30.139.23', // host mysql service
        //user: 'dbuser',
        //password : 'password',
        //port : 3306, // port mysql service
        //database:'sampledb'
      
        //host: '172.30.188.41', // host mysql service
        //user: 'root',
        //password : 'Q8p1AXkQ7P5eEVVN',
        //port : 3306, // port mysql service
        //database:'sampledb'
      
        host: '172.30.188.41', // host mysql service
        user: 'root',
        password : 'Q8p1AXkQ7P5eEVVN',
        port : 3306, 
        database: 'sampledb'
      
      

    },'pool') // pool or single

);

console.log('######################################################################################################');

console.log( process.env.database + ', '+process.env.host + ', '+process.env.password );
console.log( process.env.port + ', '+process.env.username );

console.log('######################################################################################################');

// Web application
app.get('/', customersweb.listall);



app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
