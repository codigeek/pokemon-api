
import { Request, Response, Router } from "express";
import { WarehouseService } from "../services/warehouse.service";
import { IInventory } from "../interfaces/inventory.interface";
import { Inventory } from "../models/inventory.model";
import { InventoryService } from "../services/inventory.service";
import mongoose from "mongoose";

export class WarehouseController {
    public router = Router();
    public inventoryService = new InventoryService();

    constructor(
        private warehouseService: WarehouseService
    ) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.findAll).post(this.add);
        this.router.route("/branch/:id").get(this.findByBranchID);
        this.router.route("/:id").get(this.findByID).delete(this.delete).put(this.update);
    }

    private findAll = async (req: Request, res: Response) => {
        try {
            const tableInfo = await this.warehouseService.tableInfo();
            const count = await this.warehouseService.count(req.query.search);
            const records = await this.warehouseService.findAll(req.query.quantity, req.query.page, req.query.search);
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
            const record = await this.warehouseService.findByID(req.params.id);
            res.send(record);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private findByBranchID = async (req: Request, res: Response) => {
        try {
            const record = await this.warehouseService.findByBranchID(req.params.id);
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
                    req.body.params.photo = `http://localhost:9001/public/warehouse_${req.body.params._id}.png`;
                }
            }
            const warehouseExists = await this.warehouseService.findByBranchID(req.body.params.branch_id);
            if( warehouseExists.length === 0 ){
                const addRecord = await this.warehouseService.add(req?.body?.params);
                const inventory = new Inventory({
                    warehouse_id: addRecord._id,
                    warehouse: addRecord._id
                });
                this.inventoryService.add(inventory);
                res.send(addRecord);
            }else{
                res.status(201).send({
                    customMessage : "Esta sucursal ya tiene una bodega asignada."
                });
            }            
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private update = async (req: Request, res: Response) => {
        try {
            req.body.params.date_modified = req.body.info.date;
            if (req?.body?.params?.photo) {
                if (req?.body?.params?.photo.includes("blob:")) {
                    req.body.params.photo = `http://localhost:9001/public/warehouse_${req.params.id}.png`;
                }
            }
            const updateRecordResult = await this.warehouseService.update(
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
            const deleteRecordResult = await this.warehouseService.delete(
                req.params.id
            );
            res.send(deleteRecordResult);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };


}