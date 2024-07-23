import { EntityModel } from "./base/base.type";

export interface CompanyModel extends EntityModel {
    id: string;
    type: string;
    name: string;
  }
