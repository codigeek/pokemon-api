import { User } from "../models/user.model";
import { Brand } from "../models/brand.model";
import { Branch } from "../models/branch.model";
import { IUser } from "../interfaces/user.interface";
import { IBrand } from "../interfaces/brand.interface";
import { IBranch } from "../interfaces/branch.interface";

import { getUserPermissions } from "./functions/authenticationFunctions";
import mongoose from "mongoose";

export class AuthenticationService {

  public authenticate(user: IUser): Promise<IUser[]> {
    return User.find({ email: user.email, password: user.password }).exec();
    // return User.aggregate([
    //   {
    //     $lookup: {
    //       from: "orders",
    //       localField: "_id",
    //       foreignField: "customerId",
    //       as: "orders_info",
    //     },
    //   }
    // ]).exec();
  }

  public signup(user: IUser): Promise<IUser[]> {
    return User.find({ email: user.email, password: user.password }).exec();
  }

  public getPermissions(user: any): any {
    return getUserPermissions(user.user_type_id);
  }

  public getBrands = async (type: any, brandId: any) => {
    if (type === 1) {
      const brands = await Brand.aggregate([
        {
          $match: {
            active: true,
            _id: brandId
          }
        }
      ]).exec();
      if (brands[0]) {
        return brands[0];
      }
      return undefined;
    }
    return undefined;
  }

  public getBranches = async (type: any, brandId: any) => {
    if (type === 1) {
      const branches = await Branch.aggregate([
        {
          $match: {
            active: true,
            brand: brandId
          }
        }
      ]).exec();
      if (branches[0]) {
        return branches[0];
      }
      return undefined;
    }
    return undefined;
  }

  public authenticationData = async (user: any, permissions: any) => {
    if (permissions.isAdmin) {
      try {
        const brands = await Brand
          .aggregate([
            {
              $match: {
                active: true
              }
            }
          ])
          .exec();
        if (brands?.length > 0) {
          return {
            canLogin: true,
            brand: brands[0],
            branch: await this.getBranches(1, brands[0]._id)
          };
        } else {
          return {
            canLogin: false,
            brand: undefined,
            branch: undefined
          };
        }
      } catch (err) {
        return {
          canLogin: false,
          brand: undefined,
          branch: undefined
        };
      }
    }
    if (permissions.isBrandAdmin) {
      try {
        const brands = await Brand
          .aggregate([
            {
              $match: {
                active: true,
                users: user._id
              }
            }
          ])
          .exec();
        if (brands?.length > 0) {
          return {
            canLogin: true,
            brand: brands[0],
            branch: await this.getBranches(1, brands[0]._id)
          };
        } else {
          return {
            canLogin: false,
            brand: undefined,
            branch: undefined
          };
        }
      } catch (err) {
        return {
          canLogin: false,
          brand: undefined,
          branch: undefined
        };
      }
    }
    if (permissions.isBranchAdmin) {
      try {
        const branches = await Branch
          .aggregate([
            {
              $match: {
                active: true,
                users: user._id
              }
            }
          ])
          .exec();
        if (branches?.length > 0) {
          return {
            canLogin: true,
            brand: await this.getBrands(1, branches[0].brand),
            branch: branches[0]
          };
        } else {
          return {
            canLogin: false,
            brand: undefined,
            branch: undefined
          };
        }
      } catch (err) {
        return {
          canLogin: false,
          brand: undefined,
          branch: undefined
        };
      }
    }
    return {
      canLogin: false,
      brand: undefined,
      branch: undefined
    };
  }

}