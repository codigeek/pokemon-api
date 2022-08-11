
import { Request, Response, Router } from "express";
import { PurchaseService } from "../services/purchase.service";
import { InventoryService } from "../services/inventory.service";
import { WarehouseService } from "../services/warehouse.service";
import mongoose from "mongoose";

export class PurchaseController {

    public router = Router();

    public inventoryService = new InventoryService();
    public warehouseService = new WarehouseService();

    constructor(
        private purchaseService: PurchaseService
    ) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.findAll).post(this.add);
        this.router.route("/:id").get(this.findByID).delete(this.delete).put(this.update);
    }

    private findAll = async (req: Request, res: Response) => {
        try {
            const tableInfo = await this.purchaseService.tableInfo();
            const count = await this.purchaseService.count(req.query.search);
            const records = await this.purchaseService.findAll(req.query.quantity, req.query.page, req.query.search);
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
            const record = await this.purchaseService.findByID(req.params.id);
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
                    req.body.params.photo = `http://localhost:9001/public/purchase_${req.body.params._id}.png`;
                }
            }
            const warehouse = await this.warehouseService.findByBranchID(req.body.params.branch_id);
            if( warehouse.length === 0 ){
                res.status(201).send({
                    customMessage : "Esta sucursal no tiene bodega asignada."
                });
                return;
            }
            const addRecord = await this.purchaseService.add(req?.body?.params);
            this.inventoryService.updateProducts(addRecord.branch_id, addRecord.products, 1);
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
                    req.body.params.photo = `http://localhost:9001/public/purchase_${req.params.id}.png`;
                }
            }
            const updateRecordResult = await this.purchaseService.update(
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
            const deleteRecordResult = await this.purchaseService.delete(
                req.params.id
            );
            res.send(deleteRecordResult);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };


}