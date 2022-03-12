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
import language from "./language/language.json";
import account from './controller/Account';
import exchange from './controller/Exchange';
import posts from './controller/Posts';
import crypto from './controller/Crypto';
//const reqSock = new Request()
//const repSock = new zmq.Reply()

const ServiceAPI = "http://127.0.0.1:8083";


const app: Application = express();

const server: http.Server = http.createServer(app);

const publicDirectoryPath = path.join(__dirname, "./public");
const code = "vn";
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
	res.render("index",{page : jsonfile.main, lang : language.vn})
});

app.use("/account",account);
app.use("/exchange",exchange);
app.use("/posts",posts);
app.use("/crypto",crypto);

/** Error handling */
app.use((req, res, next) => {
   
    return res.status(404).render("404",{page : {title : "Error 404",description : ""}});
});

server.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
  
});
