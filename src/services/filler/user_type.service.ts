import { UserType } from "../../models/filler/user_type.model";
import { IUserType } from "../../interfaces/filler/user_type.interface";
import mongoose from "mongoose";

export class UserTypeService {

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
          lg: 6,
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
          lg: 6,
          xs: 12,
          validations: [
          ]
        },
        {
          id: "isAdmin",
          label: "Admin",
          placeholder: "",
          type: "boolean",
          componentType: "boolean",
          validationType: "boolean",
          value: false,
          lg: 3,
          xs: 12,
          validations: [
          ]
        },
        {
          id: "isBusiness",
          label: "Negocio",
          placeholder: "",
          type: "boolean",
          componentType: "boolean",
          validationType: "boolean",
          value: false,
          lg: 3,
          xs: 12,
          validations: [
          ]
        },
        {
          id: "isBrand",
          label: "Marca",
          placeholder: "",
          type: "boolean",
          componentType: "boolean",
          validationType: "boolean",
          value: false,
          lg: 3,
          xs: 12,
          validations: [
          ]
        },
        {
          id: "isClient",
          label: "Cliente",
          placeholder: "",
          type: "boolean",
          componentType: "boolean",
          validationType: "boolean",
          value: false,
          lg: 3,
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
    return UserType.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IUserType[]> {
    try {
      let paramSearch = {};
      if (search) {
        paramSearch = {
          $or: [
            { description: { $regex: search, $options: "i" } }
          ]
        };
      }
      return UserType.
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

  public findByID(id: string): Promise<IUserType[]> {
    return UserType.find({ id: id }).exec();
  }

  public add(record: IUserType): Promise<IUserType> {
    const newRecord = new UserType(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<IUserType> {
    const deletedDocument = await UserType.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: IUserType): Promise<IUserType> {
    const updatedDocument = await UserType.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}