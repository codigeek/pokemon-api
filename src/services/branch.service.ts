import { Branch } from "../models/branch.model";
import { IBranch } from "../interfaces/branch.interface";
import mongoose from "mongoose";

export class BranchService {

  public tableInfo(): Object {
    return {
      table_headers: [
        { lg: 6, header: "NOMBRE" },
        { lg: 4, header: "ESTATUS" },
        { lg: 2, header: "" },
      ],
      table_properties: [
        {
          order: 1,
          orderLg: 1,
          lg: 6,
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
          property: "active",
          tag: "Estatus",
          status: true
        },
        {
          order: 3,
          orderLg: 3,
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
          id: "brand_id",
          label: "Marca:",
          placeholder: "",
          type: "select",
          componentType: "select",
          validationType: "select",
          displayValue: "name",
          getURL: "brand",
          fillSelect: true,
          fillSelectField: "brand",
          value: "",
          lg: 6,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["El acceso es requerido."]
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
        {
          id: "users",
          label: "Administradores de la sucursal:",
          placeholder: "",
          type: "selectMulti",
          componentType: "selectMulti",
          validationType: "selectMulti",
          getURL: "user",
          value: "",
          lg: 12,
          xs: 12,
          validations: []
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
    return Branch.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IBranch[]> {
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
      return Branch
        .find(paramSearch)
        .populate('brand')
        .skip(
          parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * parseInt(quantity)
        ).limit(
          parseInt(page) * parseInt(quantity)
        ).exec();
    } catch (error) {
      throw error;
    }
  }

  public findByID(id: string): Promise<IBranch[]> {
    return Branch.find({ id: id }).exec();
  }

  public add(record: IBranch): Promise<IBranch> {
    const newRecord = new Branch(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<IBranch> {
    const deletedDocument = await Branch.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: IBranch): Promise<IBranch> {
    const updatedDocument = await Branch.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}