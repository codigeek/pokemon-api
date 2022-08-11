import { Purchase } from "../models/purchase.model";
import { IPurchase } from "../interfaces/purchase.interface";
import mongoose from "mongoose";

export class PurchaseService {

  public tableInfo(): Object {
    return {
      table_headers: [
        { lg: 3, header: "FOLIO" },
        { lg: 3, header: "PROVEEDOR" },
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
          property: "provider",
          nested: true,
          nestedValue: "name",
          tag: "Proveedor"
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
          id: "provider_id",
          label: "Proveedor:",
          placeholder: "",
          type: "select",
          componentType: "select",
          validationType: "select",
          displayValue: "name",
          getURL: "provider",
          fillSelect: true,
          fillSelectField: "provider",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["El proveedor es requerido."]
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
    return Purchase.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IPurchase[]> {
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
      return Purchase
        .find(paramSearch)
        .populate('provider')
        .populate('payment_type')
        .populate('status_sp')
        .skip(
          parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * parseInt(quantity)
        ).limit(
          parseInt(page) * parseInt(quantity)
        ).exec();
    } catch (error) {
      throw error;
    }
  }

  public findByID(id: string): Promise<IPurchase[]> {
    return Purchase.find({ id: id }).exec();
  }

  public add(record: IPurchase): Promise<IPurchase> {
    const newRecord = new Purchase(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<IPurchase> {
    const deletedDocument = await Purchase.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: IPurchase): Promise<IPurchase> {
    const updatedDocument = await Purchase.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}