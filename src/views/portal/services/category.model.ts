import { EntityModel } from "./base/base.type";

export interface CategoryModel extends EntityModel {
    id: string;
    type: string;
    name: string;
  }
