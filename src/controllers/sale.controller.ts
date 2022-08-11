
import { Request, Response, Router } from "express";
import { SaleService } from "../services/sale.service";
import mongoose from "mongoose";

export class SaleController {
    public router = Router();

    constructor(
        private saleService: SaleService
    ) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.findAll).post(this.add);
        this.router.route("/:id").get(this.findByID).delete(this.delete).put(this.update);
    }

    private findAll = async (req: Request, res: Response) => {
        try {
            const tableInfo = await this.saleService.tableInfo();
            const count = await this.saleService.count(req.query.search);
            const records = await this.saleService.findAll(req.query.quantity, req.query.page, req.query.search);
            res.send({
                tableInfo: tableInfo,
                records: records,
                count: count
            });
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private findByID = async (req: Request, res: Response) => {
        try {
            const record = await this.saleService.findByID(req.params.id);
            res.send(record);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private add = async (req: Request, res: Response) => {
        try {
            req.body.params.date_created = req?.body?.info?.date;
            req.body.params._id = new mongoose.Types.ObjectId();
            if (req?.body?.params?.photo) {
                if (req?.body?.params?.photo.includes("blob:")) {
                    req.body.params.photo = `http://localhost:9001/public/sale_${req.body.params._id}.png`;
                }
            }
            const addRecord = await this.saleService.add(req?.body?.params);
            res.send(addRecord);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private update = async (req: Request, res: Response) => {
        try {
            req.body.params.date_modified = req.body.info.date;
            if (req?.body?.params?.photo) {
                if (req?.body?.params?.photo.includes("blob:")) {
                    req.body.params.photo = `http://localhost:9001/public/sale_${req.params.id}.png`;
                }
            }
            const updateRecordResult = await this.saleService.update(
                req.params.id,
                req.body.params
            );
            res.send(updateRecordResult);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private delete = async (req: Request, res: Response) => {
        try {
            const deleteRecordResult = await this.saleService.delete(
                req.params.id
            );
            res.send(deleteRecordResult);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };


}