const net = require('net');
const port = 9090;
const host = '0.0.0.0';
const mysql = require('mysql2');

var express = require('express');
var app = express();
var serverHTTP = require("http").Server(app);
var io = require("socket.io")(serverHTTP);

// create the connection to database


const server = net.createServer();
let sockets = [];


server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});



server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.setEncoding('utf8');

    sock.setTimeout(800000,function(){
      // called after timeout -> same as socket.on('timeout')
      // it just tells that soket timed out => its ur job to end or destroy the socket.
      // socket.end() vs socket.destroy() => end allows us to send final data and allows some i/o activity to finish before destroying the socket
      // whereas destroy kills the socket immediately irrespective of whether any i/o operation is goin on or not...force destry takes place
      sock.end();
      console.log('Socket timed out');
    });

    sock.on('data', function(data) {
        console.log("get data",sock.remoteAddress);
        let extract = {};
        try {
		    extract = JSON.parse(data);
		    if(extract.data == "signal"){
		    	sockets.forEach(async function(sockd, index, array) {
                    
                    if(sockd.remoteAddress != "127.0.0.1"){
    		            await sockd.write(data + '\r\n');
                        console.log("send data",sockd.remoteAddress);
                    }
		        });
               

		    }
            
            //Close order
            if(extract.data == "connect"){
                let serial = extract.serial;
                if(serial != null && serial != ""){
                    try {
                        let buff = new Buffer(serial, 'base64');
                        let jsonSerial = buff.toString('ascii');
                        let jsonUser = JSON.parse(jsonSerial);
                       
                        sock.write('unlock\r\n');
                    }catch (e) {
                    }
                }
                
            }

            
            

		} catch (e) {
		    //console.log('DATA ' + sock.remoteAddress + ': ' + data);
		}

        // Write the data back to all the connected, the client will receive it as data from the server
        
    });
    

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
    sock.on('error',function(){
       
    	console.log('Error: ');
    });

    sock.on('drain',function(){
      console.log('write buffer is empty now .. u can resume the writable stream');
      sock.resume();
    });
    sock.on('timeout',function(){
       sock.destroy();
      // can call socket.destroy() here too.
    });

    sock.on('end',function(data){
      console.log('Socket ended from other end!');
      console.log('End data : ' + data);

    });
    
    setTimeout(function(){
      var isdestroyed = sock.destroyed;
      console.log('Socket destroyed:' + isdestroyed);
      sock.resume();
    },1200000);
});