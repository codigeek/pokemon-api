import { Brand } from "../models/brand.model";
import { IBrand } from "../interfaces/brand.interface";
import mongoose from "mongoose";

export class BrandService {

  public tableInfo(): Object {
    return {
      table_headers: [
        { lg: 4, header: "NOMBRE" },
        { lg: 3, header: "CATEGORÍA" },
        { lg: 3, header: "ESTATUS" },
        { lg: 2, header: "" },
      ],
      table_properties: [
        {
          order: 2,
          orderLg: 2,
          lg: 4,
          xs: 12,
          property: "name",
          tag: "Nombre",
          link: true
        },
        {
          order: 2,
          orderLg: 2,
          lg: 3,
          xs: 12,
          property: "category",
          nested: true,
          nestedValue: "description",
          tag: "Categoría"
        },
        {
          order: 3,
          orderLg: 3,
          lg: 3,
          xs: 12,
          property: "active",
          tag: "Estatus",
          status: true
        },
        {
          order: 4,
          orderLg: 4,
          lg: 2,
          xs: 6,
          property: "",
          tag: "Acciones",
          actions: true
        },
      ],
      form_properties: [
        {
          id: "photo",
          label: "Photo:",
          placeholder: "",
          type: "photo",
          componentType: "photo",
          validationType: "photo",
          value: "",
          lg: 12,
          xs: 12,
          validations: []
        },
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
          id: "category_id",
          label: "Categoría:",
          placeholder: "",
          type: "select",
          componentType: "select",
          validationType: "select",
          displayValue: "description",
          getURL: "brand_category",
          fillSelect: true,
          fillSelectField: "category",
          value: "",
          lg: 4,
          xs: 12,
          validations: [
            {
              type: "required",
              params: ["La categoría es requerida."]
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
          label: "Administradores de la marca:",
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
    return Brand.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IBrand[]> {
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
      return Brand
        .find(paramSearch)
        .populate('category')
        .skip(
          parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * parseInt(quantity)
        ).limit(
          parseInt(page) * parseInt(quantity)
        ).exec();
    } catch (error) {
      throw error;
    }
  }

  public findByID(id: string): Promise<IBrand[]> {
    try {
      return Brand
        .find({ _id: id })
        .populate('category')
        .exec();
    } catch (error) {
      throw error;
    }
  }

  public add(record: IBrand): Promise<IBrand> {
    const newRecord = new Brand(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<IBrand> {
    const deletedDocument = await Brand.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: IBrand): Promise<IBrand> {
    const updatedDocument = await Brand.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}