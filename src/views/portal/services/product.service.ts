import { EntityModel } from "./base/base.type";
import { BaseService } from './base/base.service';
import { Injectable } from "../../../utils/inject";

export interface ProductModel extends EntityModel {
    cost: number;
    deleted: boolean;
    groupName: string;
    id: string;
    isActive: boolean;
    name: string;
    onHand: number;
    sellingPrice: number;
    seqNo: number;
    sync: boolean;
    type: number;
  }
@Injectable
export class ProductServie extends BaseService<ProductModel> {
    fields(): { [K in keyof ProductModel]: keyof ProductModel; } {
       return {
        id: "id",
        cost: "cost",
        deleted: "deleted",
        groupName: "groupName",      
        isActive: "isActive",
        name: "name",
        onHand: "onHand",
        sellingPrice: "sellingPrice",
        seqNo: "seqNo",
        sync: "sync",
        type: "type"
       };
    }
    constructor() {
        super("PRODUCT");
    }
}