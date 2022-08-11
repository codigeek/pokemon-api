import { Sale } from "../models/sale.model";
import { ISale } from "../interfaces/sale.interface";
import mongoose from "mongoose";

export class SaleService {

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
    return Sale.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<ISale[]> {
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
      return Sale
        .find(paramSearch)
        .populate('client')
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

  public findByID(id: string): Promise<ISale[]> {
    return Sale.find({ id: id }).exec();
  }

  public add(record: ISale): Promise<ISale> {
    const newRecord = new Sale(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<ISale> {
    const deletedDocument = await Sale.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: ISale): Promise<ISale> {
    const updatedDocument = await Sale.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}