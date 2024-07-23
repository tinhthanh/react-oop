import { EntityModel } from "./base/base.type";
import { BaseService } from './base/base.service';
import { Injectable } from "../../../utils/inject";

export interface BannerModel extends EntityModel {
    id: string;
    title: string;
    descript: string;
    image: string;
    redirectLink: string;
    start: string;
    end: string;
    status: number;
    areaKey: string;
  }
@Injectable
export class BannerServie extends BaseService<BannerModel> {
    fields(): { [K in keyof BannerModel]: keyof BannerModel; } {
        return {
            id: "id",
            title: "title",
            descript: "descript",
            image: "image",
            redirectLink: "redirectLink",
            start: "start",
            end: "end",
            status: "status",
            areaKey: "areaKey"
        };
    }
    constructor() {
        super("Banner");
    }
}