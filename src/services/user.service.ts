import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

export class UserService {

  public tableInfo(): Object {
    return {
      table_headers: [
        { lg: 4, header: "NOMBRE" },
        { lg: 3, header: "CORREO" },
        { lg: 3, header: "ACCESO" },
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
          lg: 3,
          xs: 12,
          property: "email",
          tag: "Correo"
        },
        {
          order: 3,
          orderLg: 3,
          lg: 3,
          xs: 12,
          property: "user_type",
          nested: true,
          nestedValue: "description",
          tag: "Acceso"
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
          id: "last_name",
          label: "Apellido:",
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
              params: ["El apellido es requerido."]
            },
          ]
        },
        {
          id: "email",
          label: "Correo:",
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
              params: ["El correo es requerido."]
            },
          ]
        },
        {
          id: "phone",
          label: "Teléfono:",
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
              params: ["El teléfono es requerido."]
            },
            {
              type: "min",
              params: [10, "El teléfono es requerido."]
            },
          ]
        },
        {
          id: "password",
          label: "Contraseña:",
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
              params: ["La contraseña es requerida."]
            },
          ]
        },
        {
          id: "user_type_id",
          label: "Acceso:",
          placeholder: "",
          type: "select",
          componentType: "select",
          validationType: "select",
          displayValue: "description",
          getURL: "user_type",
          fillSelect: true,
          fillSelectField: "user_type",
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
    return User.find(paramSearch).count().exec();
  }

  public findAll(quantity: any, page: any, search: any): Promise<IUser[]> {
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
      return User
        .find(paramSearch)
        .populate('user_type')
        .skip(
          parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * parseInt(quantity)
        ).limit(
          parseInt(page) * parseInt(quantity)
        ).exec();
    } catch (error) {
      throw error;
    }
  }

  public findByID(id: string): Promise<IUser[]> {
    return User.find({ id: id }).exec();
  }

  public add(record: IUser): Promise<IUser> {
    const newRecord = new User(record);
    return newRecord.save();
  }

  public async delete(id: string): Promise<IUser> {
    const deletedDocument = await User.findByIdAndDelete(
      id
    ).exec();
    if (!deletedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return deletedDocument;
  }

  public async update(id: string, record: IUser): Promise<IUser> {
    const updatedDocument = await User.findByIdAndUpdate(
      id,
      record
    ).exec();
    if (!updatedDocument) {
      throw new Error(`Document with id '${id}' not found`);
    }
    return updatedDocument;
  }

}