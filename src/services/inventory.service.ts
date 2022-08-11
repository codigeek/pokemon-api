import { Inventory } from "../models/inventory.model";
import { IInventory } from "../interfaces/inventory.interface";

import { WarehouseService } from "../services/warehouse.service";

import mongoose from "mongoose";

export class InventoryService {

  public warehouseService = new WarehouseService();

  public tableInfo(): Object {
    return {
      table_headers: [
        { lg: 3, header: "FOLIO" },
        { lg: 3, header: "CLIENTE" },
        { lg: 2, header: "TOTAL" },
        { lg: 2, header: "ESTATUS" },
        { lg: 2, header: "" },
      ],
      table_properties: [
        {
          order: 1,
          orderLg: 1,
          lg: 3,
          xs: 12,
          property: "_id",
          tag: "Folio",
          truncate: true,
          link: true
        },
        {
          order: 2,
          orderLg: 2,
          lg: 3,
          xs: 12,
          property: "client",
          nested: true,
          nestedValue: "name",
          tag: "Cliente"
        },
        {
          order: 3,
          orderLg: 3,
          lg: 2,
          xs: 12,
          property: "total",
          tag: "Total"
        },
        {
          order: 4,
          orderLg: 4,
          lg: 2,
          xs: 12,
          property: "status_sp",
          nested: true,
          nestedValue: "description",
          tag: "Estatus"
        },
        {
          order: 5,
          orderLg: 5,
          lg: 2,
          xs: 6,
          property: "",
          tag: "Acciones",
          actions: true
        },
      ],
      form_properties: [
        {
          id: "client_id",
          label: "Cliente:",
          placeholder: "",
          type: "select",
          componentType: "select",
          validationType: "select",
          displayValue: "name",
          getURL: "client",
          fillSelect: true,
          fillSelectField: "client",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["El cliente es requerido."]
            },
          ]
        },
        {
          id: "payment_type_id",
          label: "Forma de pago:",
          placeholder: "",
          type: "select",
          componentType: "select",
          validationType: "select",
          displayValue: "description",
          getURL: "payment_type",
          fillSelect: true,
          fillSelectField: "payment_type",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["La forma de pago es requerida."]
            },
          ]
        },
        {
          id: "status_sp_id",
          label: "Estatus:",
          placeholder: "",
          type: "select",
          componentType: "select",
          validationType: "select",
          displayValue: "description",
          getURL: "status_sp",
          fillSelect: true,
          fillSelectField: "status_sp",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["El estatus es requerido."]
            },
          ]
        },
        {
          id: "sessions",
          label: "Cantidad de sesiones:",
          placeholder: "",
          type: "number",
          componentType: "number",
          validationType: "number",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["La cantidad de sesiones es requerida."]
            },
          ]
        },
      ]
    };
  }

  public detailInfo(): Object {
    return {
      properties: {
        name: "",
        description: "",
      },
      properties_details: [
        { name: "name", type: "text" },
        { description: "description", type: "text" },
      ]
    };
  }

  public count(search: any): Promise<number> {
    let paramSearch = {};
    if (search) {
      paramSearch = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ]
      };
    }
    return Inventory.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IInventory[]> {
    try {
      let paramSearch = {};
      if (search) {
        paramSearch = {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { last_name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ]
        };
      }
      return Inventory
        .find(paramSearch)
        .populate('warehouse')
        .skip(
          parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * parseInt(quantity)
        ).limit(
          parseInt(page) * parseInt(quantity)
        ).exec();
    } catch (error) {
      throw error;
    }
  }

  public findByID(id: string): Promise<IInventory[]> {
    return Inventory.find({ id: id }).exec();
  }

  public findByWarehouseID(id: string): Promise<IInventory[]> {
    return Inventory.find({ warehouse_id: id }).exec();
  }

  public add(record: IInventory): Promise<IInventory> {
    const newRecord = new Inventory(record);
    return newRecord.save();
  }

  public async delete(id: string) { // : Promise<IInventory>
    // const deletedDocument = await Inventory.findByIdAndDelete(
    //   id
    // ).exec();
    // if (!deletedDocument) {
    //   throw new Error(`Document with id '${id}' not found`);
    // }
    // return deletedDocument;
    const deletedDocument = await Inventory.deleteMany().exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return "x";
  }

  public async update(id: string, record: IInventory): Promise<IInventory> {
    const updatedDocument = await Inventory.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

  public async updateProducts(branch_id: string, purchaseProducts: any, type: any) { //Promise<IInventory>
    // Type is used to know if the products are going to be added or substracted 1-add, 2-substract
    const warehouse = await this.warehouseService.findByBranchID(branch_id);
    const inventory = await this.findByWarehouseID(warehouse[0]._id.toString());
    if (inventory[0].products.length > 0) {
      for( let i = 0; i<purchaseProducts.length; i++ ){
        let productFound = false;
        let index = -1;
        for( let j = 0; j<inventory[0].products.length; j++ ){
          if( purchaseProducts[i]._id.toString().trim() === inventory[0].products[j]._id.toString().trim() ){
            productFound = true;
            index = j;
          }
        }
        if( productFound ){
          inventory[0].products[index].quantity += purchaseProducts[i].quantity;
        }else{
          inventory[0].products.push(purchaseProducts[i])
        }
      }
      // inventory[0].products.map((product) => {
      //   const index = purchaseProducts.findIndex((purchaseProduct: any) => {
      //     return purchaseProduct._id.toString().trim() === product._id.toString().trim();
      //   });
      //   if (index !== -1) {
      //     product.quantity += purchaseProducts[index].quantity;
      //   } else {
      //     inventory[0].products.push(purchaseProducts[index])
      //   }
      // });
    } else {
      inventory[0].products = purchaseProducts;
    }
    const updatedDocument = await this.update(inventory[0]._id, inventory[0]);
    // const updatedDocument = await Inventory.findByIdAndUpdate(
    //   inventory[0]._id,
    //   inventory[0].products
    // ).exec();
    // if (!updatedDocument) {
    //   throw new Error(`Document not found`);
    // }
    // return updatedDocument;
  }

}