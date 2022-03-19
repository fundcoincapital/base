import express, { Application, Request, Response } from "express";
import path from "path";
import http from "http";
import fs from "fs";
import debug from "./config/debug";
import expressLayouts from 'express-ejs-layouts';
import ejs from 'ejs';

import bodyParser from "body-parser";

import * as jsonfile from "./data.json"
import axios, {AxiosResponse} from 'axios';
//const reqSock = new Request()
//const repSock = new zmq.Reply()
import template from './controller/TemplateAdmin';
import post from './controller/PostsAdmin';
//import page from './controller/Pages';
const ServiceMT4 = "127.0.0.1";
const ServiceAPI = "http://127.0.0.1:3000/api";

const app: Application = express();

const server: http.Server = http.createServer(app);

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting the port
const port = 8084;


// EJS setup
app.use(expressLayouts);

// Setting the root path for views directory
app.set('views', path.join(__dirname, 'admin'));

// Setting the view engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

/* Home route */
app.get("/", (req: Request, res: Response) => {
	res.render("index",{page : jsonfile.main})
});
app.use("/template",template);

server.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
  
});