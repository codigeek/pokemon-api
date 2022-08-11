import { Warehouse } from "../models/warehouse.model";
import { IWarehouse } from "../interfaces/warehouse.interface";
import mongoose from "mongoose";

export class WarehouseService {

  public tableInfo(): Object {
    return {
      table_headers: [
        { lg: 4, header: "NOMBRE" },
        { lg: 4, header: "SUCURSAL" },
        { lg: 2, header: "ESTATUS" },
        { lg: 2, header: "" },
      ],
      table_properties: [
        {
          order: 1,
          orderLg: 1,
          lg: 4,
          xs: 12,
          property: "name",
          tag: "Nombre",
          link: true
        },
        {
          order: 2,
          orderLg: 2,
          lg: 4,
          xs: 12,
          property: "branch",
          nested: true,
          nestedValue: "name",
          tag: "Categoría"
        },
        {
          order: 4,
          orderLg: 4,
          lg: 2,
          xs: 12,
          property: "active",
          tag: "Estatus",
          status: true
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
          id: "name",
          label: "Nombre:",
          placeholder: "",
          type: "text",
          componentType: "text",
          validationType: "string",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["El nombre es requerido."]
            },
          ]
        },
        {
          id: "description",
          label: "Descripción:",
          placeholder: "",
          type: "text",
          componentType: "text",
          validationType: "string",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["La descripción es requerida."]
            },
          ]
        },
        {
          id: "address",
          label: "Dirección:",
          placeholder: "",
          type: "text",
          componentType: "text",
          validationType: "string",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["La dirección es requerida."]
            },
          ]
        },
        {
          id: "branch_id",
          label: "Sucursal:",
          placeholder: "",
          type: "select",
          componentType: "select",
          validationType: "select",
          displayValue: "name",
          getURL: "branch",
          fillSelect: true,
          fillSelectField: "branch",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["La sucursal es requerida."]
            },
          ]
        },
        {
          id: "active",
          label: "Estatus:",
          placeholder: "",
          type: "boolean",
          componentType: "boolean",
          validationType: "boolean",
          value: false,
          lg: 4,
          xs: 12,
          validations: [
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
    return Warehouse.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IWarehouse[]> {
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
      return Warehouse
        .find(paramSearch)
        .populate('branch')
        .skip(
          parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * parseInt(quantity)
        ).limit(
          parseInt(page) * parseInt(quantity)
        ).exec();
    } catch (error) {
      throw error;
    }
  }

  public findByID(id: string): Promise<IWarehouse[]> {
    return Warehouse.find({ id: id }).exec();
  }

  public findByBranchID(id: string): Promise<IWarehouse[]> {
    return Warehouse.find({ branch_id: id }).exec();
  }

  public add(record: IWarehouse): Promise<IWarehouse> {
    const newRecord = new Warehouse(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<IWarehouse> {
    const deletedDocument = await Warehouse.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: IWarehouse): Promise<IWarehouse> {
    const updatedDocument = await Warehouse.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}