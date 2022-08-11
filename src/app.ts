import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { setControllers } from "./setControllers";

import 'dotenv/config';


class App {
    public app: Application;
    public MONGO_URL = process?.env?.MONGO_URL?.toString();

    constructor() {
        this.app = express();
        this.setConfig();
        setControllers(this.app);
        this.setMongoConfig();
    }

    private setConfig() {
        // Allows us to receive requests with data in json format
        this.app.use(bodyParser.json({ limit: "50mb" }));
        // Allows us to receive requests with data in x-www-form-urlencoded format
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        // Enables cors
        // this.app.use(cors());
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", '*');
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                return res.status(200).json({});
            }
            next();
        });
        this.app.use('/public', express.static('public'));
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(`${process.env.MONGO_URL}`, { })
        // var db = mongoose.connection
        // db.on('error', function (err) {
        // })
        // db.once('open', function () {
        // })
    }

}

export default new App().app;