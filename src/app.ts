import express, { Application, Request, Response } from "express";
import path from "path";
import http from "http";
import fs from "fs";
import debug from "./config/debug";
import expressLayouts from 'express-ejs-layouts';
import ejs from 'ejs';
import bodyParser from "body-parser";
import { connect } from './database';
//import net from 'net';
//const client = new net.Socket();

import * as jsonfile from "./data.json"
//const reqSock = new Request()
//const repSock = new zmq.Reply()

const ServiceAPI = "http://127.0.0.1:8083";


const app: Application = express();

const server: http.Server = http.createServer(app);

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting the port
const port = debug.PORT;


// EJS setup
app.use(expressLayouts);

// Setting the root path for views directory
app.set('views', path.join(__dirname, 'views'));

// Setting the view engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

/* Home route */
app.get("/", (req: Request, res: Response) => {
	res.render("index",{page : jsonfile.main})
});


server.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
  
});
