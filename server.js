//the backend
const _ = require('lodash'); //require - meaning install packages
const http = require('http');
const fs = require('fs'); //needs file server to read files such as the index.html


//method that creates a server can be use in web sockets. 
// Takes in a callback function () that will run everytime there's a request in the server
    //ex. Homepage is request, then the function will run and return the homepage.html
//req (obj) - loaded with functions all about the request (ex. url being requested). GET and POST req
//res - used to send a response to the user/browser
const server = http.createServer((req, res)=> {
    console.log(req.url, req.method); //response the routes that can be used to implement routing
 
    //lodash - key features
    //gets a random number
    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    })
    //creates new variable - to append to req.url 
    let path = './views/'; 

    switch (req.url){ //reads and cycle through the web pages - the routing system

        case '/':
            path += 'index.html'; 
            res.statusCode = 200; //everything is ok
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200; //everything is ok
            break;
        
            //redirect
        case '/about-hey': //redirect this path to about page
            res.statusCode = 301; //this means that the resource is permanently moved and a redirect is needed
            res.setHeader('Location', './about'); //used to redirect
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404; //everything is not ok - resources does not exist
            break; 
    }

    //set header content type - sending plain text (can be html or json etc)
    res.setHeader('Content-Type', 'text/html');
    
    //send an html file with path variable
    fs.readFile(path, (err, data) => {
       if(err){
        console.log(err);
        res.end();
       } else {
         //the data of the file
        res.end(data);
       }
    });
}); 


//arguments (portname, localhost, function that will listen for request). listens for host for requests
server.listen(3000, 'localhost', () => {
    console.log('listening on requests on port 3000')
});

