
import { Console } from "console";
import { Request, Response, Router } from "express";
import { AuthenticationService } from "../services/authentication.service";

export class AuthenticationController {
    public router = Router();

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route("/").post(this.authenticate);
        this.router.route("/signup").post(this.signup);
    }

    private authenticate = async (req: Request, res: Response) => {
        try {
            const user = await this.authenticationService.authenticate(req.body);
            if (user?.length > 0) {
                console.log("User", user);
                const permissions = await this.authenticationService.getPermissions(user[0]);
                const businessData: any = await this.authenticationService.authenticationData(user[0], permissions);
                if (businessData?.canLogin) {
                    if (businessData?.brand) {
                        res.status(200).send({
                            status: "success",
                            message: "Bienvenido",
                            data: user[0],
                            brand: businessData?.brand,
                            branch: businessData?.branch
                        });
                    } else {
                        res.status(201).send({
                            status: "error",
                            message: "Contacta a soporte tu cuenta requiere configuraciones para poder iniciar sesión."
                        });
                    }
                }else{
                    res.status(201).send({
                        status: "error",
                        message: "Contacta a soporte tu cuenta requiere configuraciones para poder iniciar sesión."
                    });
                }
            } else {
                res.status(201).send({
                    status: "error",
                    message: "Tus credenciales son incorrectas."
                });
            }
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };

    private signup = async (req: Request, res: Response) => {
        try {
            const user = await this.authenticationService.signup(req.body);
            res.status(200).send({
                status: "success",
                message: "Test"
            });
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    };


}