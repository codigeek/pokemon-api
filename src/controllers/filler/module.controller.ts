
import { Request, Response, Router } from "express";
import { ModuleService } from "../../services/filler/module.service";

export class ModuleController {
    public router = Router();

    constructor(
        private moduleService: ModuleService
    ) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.findAll).post(this.add);
        this.router.route("/:id").get(this.findByID).delete(this.delete).put(this.update);
    }

    private findAll = async (req: Request, res: Response) => {
        try {
            const tableInfo = await this.moduleService.tableInfo();
            const count = await this.moduleService.count(req.query.search);
            const records = await this.moduleService.findAll(req.query.quantity, req.query.page, req.query.search);
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
            const record = await this.moduleService.findByID(req.params.id);
            res.send(record);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private add = async (req: Request, res: Response) => {
        try {
            const addRecord = await this.moduleService.add(req.body.params);
            res.send(addRecord);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private delete = async (req: Request, res: Response) => {
        try {
            const deleteRecordResult = await this.moduleService.delete(
                req.params.id
            );
            res.send(deleteRecordResult);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private update = async (req: Request, res: Response) => {
        try {
            const updateRecordResult = await this.moduleService.update(
                req.params.id,
                req.body.params
            );
            res.send(updateRecordResult);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };


}