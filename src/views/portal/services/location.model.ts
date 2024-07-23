import { EntityModel } from "./base/base.type";

export interface LocalModel extends EntityModel {
    id: string;
    name: string;
    parent: string;
  }
