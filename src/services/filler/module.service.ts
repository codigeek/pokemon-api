import { Module } from "../../models/filler/module.model";
import { IModule } from "../../interfaces/filler/module.interface";
import mongoose from "mongoose";

export class ModuleService {

  public tableInfo(): Object {
    return {
      table_headers: [
        { lg: 5, header: "NOMBRE" },
        { lg: 5, header: "DESCRIPCIÓN" },
        { lg: 2, header: "" },
      ],
      table_properties: [
        {
          order: 1,
          orderLg: 1,
          lg: 5,
          xs: 12,
          property: "name",
          tag: "Nombre",
          link: true
        },
        {
          order: 2,
          orderLg: 2,
          lg: 5,
          xs: 12,
          property: "description",
          tag: "Descripción"
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
        }
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
          { description: { $regex: search, $options: "i" } }
        ]
      };
    }
    return Module.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IModule[]> {
    try {
      let paramSearch = {};
      if (search) {
        paramSearch = {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
          ]
        };
      }
      return Module.
        find(paramSearch)
        .skip(
          parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * parseInt(quantity)
        ).limit(
          parseInt(page) * parseInt(quantity)
        ).exec();
    } catch (error) {
      throw error;
    }
  }

  public findByID(id: string): Promise<IModule[]> {
    return Module.find({ id: id }).exec();
  }

  public add(record: IModule): Promise<IModule> {
    const newRecord = new Module(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<IModule> {
    const deletedDocument = await Module.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: IModule): Promise<IModule> {
    const updatedDocument = await Module.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}