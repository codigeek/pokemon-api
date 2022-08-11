
import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

const upload = multer({ storage: storage }).single('file');

export class GeneralController {
    public router = Router();

    constructor() {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/upload").post(this.saveFile);
    }

    private saveFile = async (req: Request, res: Response) => {
        try {
            upload(req, res, function (err) {
                if (err) {
                    return res.end("Error uploading file.");
                }
                res.end("File is uploaded");
            });
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

}