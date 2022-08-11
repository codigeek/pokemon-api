import { Request, Response, Router } from "express";
import { PaymentTypeService } from "../../services/filler/payment_type.service";

export class PaymentTypeController {
    public router = Router();

    constructor(
        private usertypeService: PaymentTypeService
    ) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.findAll).post(this.add);
        this.router.route("/:id").get(this.findByID).delete(this.delete).put(this.update);
    }

    private findAll = async (req: Request, res: Response) => {
        try {
            const tableInfo = await this.usertypeService.tableInfo();
            const count = await this.usertypeService.count(req.query.search);
            const records = await this.usertypeService.findAll(req.query.quantity, req.query.page, req.query.search);
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
            const record = await this.usertypeService.findByID(req.params.id);
            res.send(record);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private add = async (req: Request, res: Response) => {
        try {
            const addRecord = await this.usertypeService.add(req.body.params);
            res.send(addRecord);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private delete = async (req: Request, res: Response) => {
        try {
            const deleteRecordResult = await this.usertypeService.delete(
                req.params.id
            );
            res.send(deleteRecordResult);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private update = async (req: Request, res: Response) => {
        try {
            const updateRecordResult = await this.usertypeService.update(
                req.params.id,
                req.body.params
            );
            res.send(updateRecordResult);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };


}