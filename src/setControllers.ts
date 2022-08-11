
//Controllers
import { GeneralController } from "./controllers/general.controller";

//Controllers
import { AuthenticationController } from "./controllers/authentication.controller";
import { UserController } from "./controllers/user.controller";
import { BrandController } from "./controllers/brand.controller";
import { BranchController } from "./controllers/branch.controller";
import { ClientController } from "./controllers/client.controller";
import { ProviderController } from "./controllers/provider.controller";
import { ProductController } from "./controllers/product.controller";
import { WarehouseController } from "./controllers/warehouse.controller";
import { PurchaseController } from "./controllers/purchase.controller";
import { SaleController } from "./controllers/sale.controller";
import { InventoryController } from "./controllers/inventory.controller";
import { EstateController } from "./controllers/estate.controller";

//Services
import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";
import { BrandService } from "./services/brand.service";
import { BranchService } from "./services/branch.service";
import { ClientService } from "./services/client.service";
import { ProviderService } from "./services/provider.service";
import { ProductService } from "./services/product.service";
import { WarehouseService } from "./services/warehouse.service";
import { PurchaseService } from "./services/purchase.service";
import { SaleService } from "./services/sale.service";
import { InventoryService } from "./services/inventory.service";
import { EstateService } from "./services/estate.service";

//Fillers
import { UserTypeController } from "./controllers/filler/user_type.controller";
import { UserTypeService } from "./services/filler/user_type.service";
import { ProductCategoryController } from "./controllers/filler/product_category.controller";
import { ProductCategoryService } from "./services/filler/product_category.service";
import { BrandCategoryController } from "./controllers/filler/brand_category.controller";
import { BrandCategoryService } from "./services/filler/brand_category.service";
import { PaymentTypeController } from "./controllers/filler/payment_type.controller";
import { PaymentTypeService } from "./services/filler/payment_type.service";
import { StatusSPController } from "./controllers/filler/status_sp.controller";
import { StatusSPService } from "./services/filler/status_sp.service";
import { ModuleController } from "./controllers/filler/module.controller";
import { ModuleService } from "./services/filler/module.service";

export const setControllers = (app:any) => {
    
    const authenticationController = new AuthenticationController(new AuthenticationService());
    const userController = new UserController(new UserService());
    const userTypeController = new UserTypeController(new UserTypeService());
    const productCategoryController = new ProductCategoryController(new ProductCategoryService());
    const brandCategoryController = new BrandCategoryController(new BrandCategoryService());
    const paymentTypeController = new PaymentTypeController(new PaymentTypeService());
    const statusSPController = new StatusSPController(new StatusSPService());
    const productController = new ProductController(new ProductService());
    const warehouseController = new WarehouseController(new WarehouseService());
    const inventoryController = new InventoryController(new InventoryService());
    const purchaseController = new PurchaseController(new PurchaseService());
    const moduleController = new ModuleController(new ModuleService());
    const brandController = new BrandController(new BrandService());
    const branchController = new BranchController(new BranchService());
    const clientController = new ClientController(new ClientService());
    const providerController = new ProviderController(new ProviderService());
    const saleController = new SaleController(new SaleService());
    const generalController = new GeneralController();

    const estateController = new EstateController(new EstateService());

    // Telling express to use our Controller's routes
    app.use("/authentication", authenticationController.router);
    app.use("/user", userController.router);
    app.use("/user_type", userTypeController.router);
    app.use("/product_category", productCategoryController.router);
    app.use("/brand_category", brandCategoryController.router);
    app.use("/payment_type", paymentTypeController.router);
    app.use("/status_sp", statusSPController.router);
    app.use("/product", productController.router);
    app.use("/warehouse", warehouseController.router);
    app.use("/inventory", inventoryController.router);
    app.use("/module", moduleController.router);
    app.use("/brand", brandController.router);
    app.use("/branch", branchController.router);
    app.use("/client", clientController.router);
    app.use("/purchase", purchaseController.router);
    app.use("/sale", saleController.router);
    app.use("/provider", providerController.router);
    app.use("/general", generalController.router);

    app.use("/estate", estateController.router);
}