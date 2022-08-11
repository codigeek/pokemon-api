import { Product } from "../models/product.model";
import { IProduct } from "../interfaces/product.interface";
import mongoose from "mongoose";

export class ProductService {

  public tableInfo(): Object {
    return {
      table_headers: [
        { lg: 3, header: "NOMBRE" },
        { lg: 3, header: "CATEGORÍA" },
        { lg: 2, header: "PRECIO" },
        { lg: 2, header: "ESTATUS" },
        { lg: 2, header: "" },
      ],
      table_properties: [
        {
          order: 1,
          orderLg: 1,
          lg: 3,
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
          lg: 2,
          xs: 12,
          property: "purchase_price",
          tag: "Precio"
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
          id: "idif",
          label: "Identificador fiscal:",
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
              params: ["El identificador es requerido."]
            },
          ]
        },
        {
          id: "sale_price",
          label: "Precio de venta:",
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
              params: ["El precio de venta es requerido."]
            },
          ]
        },
        {
          id: "purchase_price",
          label: "Precio de compra:",
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
              params: ["El precio de compra es requerido."]
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
          getURL: "product_category",
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
    return Product.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IProduct[]> {
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
      return Product
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

  public findByID(id: string): Promise<IProduct[]> {
    return Product.find({ id: id }).exec();
  }

  public add(record: IProduct): Promise<IProduct> {
    const newRecord = new Product(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<IProduct> {
    const deletedDocument = await Product.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: IProduct): Promise<IProduct> {
    const updatedDocument = await Product.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}