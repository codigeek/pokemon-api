
import { Request, Response, Router } from "express";
import { PokemonService } from "../services/pokemon.service";
import mongoose from "mongoose";

export class PokemonController {
    public router = Router();

    constructor(
        private pokemonService: PokemonService
    ) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").get(this.findAll).post(this.addFavorite);
        this.router.route("/:id").get(this.findByID).delete(this.delete);
    }

    private findAll = async (req: Request, res: Response) => {
        try {
            const records = await this.pokemonService.findAll(req.query.quantity, req.query.page, req.query.search);
            res.send(records);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private findByID = async (req: Request, res: Response) => {
        try {
            const record = await this.pokemonService.findByID(req.params.id);
            res.send(record);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private addFavorite = async (req: Request, res: Response) => {
        try {
            const record = await this.pokemonService.findByID(req?.body?.params?.id);          
            if (record.length === 0) {
                req.body.params._id = new mongoose.Types.ObjectId();
                await this.pokemonService.addFavorite(req?.body?.params);
                res.status(200).send("Pokemon favorited");
            } else {
                await this.pokemonService.delete(record[0]._id);
                res.status(200).send("Pokemon unfavorited");
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private delete = async (req: Request, res: Response) => {
        try {
            const deleteRecordResult = await this.pokemonService.delete(
                req.params.id
            );
            res.send(deleteRecordResult);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };


}