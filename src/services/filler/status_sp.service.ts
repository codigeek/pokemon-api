import { StatusSP } from "../../models/filler/status_sp.model";
import { IStatusSP } from "../../interfaces/filler/status_sp.interface";
import mongoose from "mongoose";

export class StatusSPService {

  public tableInfo(): Object {
    return {
      table_headers: [
        { lg: 10, header: "DESCRIPCIÓN" },
        { lg: 2, header: "" },
      ],
      table_properties: [
        {
          order: 1,
          orderLg: 1,
          lg: 10,
          xs: 12,
          property: "description",
          tag: "Descripción",
          link: true
        },
        {
          order: 2,
          orderLg: 2,
          lg: 2,
          xs: 6,
          property: "",
          tag: "Acciones",
          actions: true
        },
      ],
      form_properties: [
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
          id: "editable",
          label: "Control administrativo:",
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
        description: "",
      },
      properties_details: [
        { description: "description", type: "text" },
      ]
    };
  }

  public count(search: any): Promise<number> {
    let paramSearch = {};
    if (search) {
      paramSearch = {
        $or: [
          { description: { $regex: search, $options: "i" } }
        ]
      };
    }
    return StatusSP.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IStatusSP[]> {
    try {
      let paramSearch = {};
      if (search) {
        paramSearch = {
          $or: [
            { description: { $regex: search, $options: "i" } }
          ]
        };
      }
      return StatusSP.
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

  public findByID(id: string): Promise<IStatusSP[]> {
    return StatusSP.find({ id: id }).exec();
  }

  public add(record: IStatusSP): Promise<IStatusSP> {
    const newRecord = new StatusSP(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<IStatusSP> {
    const deletedDocument = await StatusSP.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: IStatusSP): Promise<IStatusSP> {
    const updatedDocument = await StatusSP.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}