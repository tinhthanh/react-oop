import { EntityModel } from "./base/base.type";
import { BaseService } from './base/base.service';
import { Injectable } from "../../../utils/inject";

export interface News extends EntityModel {
    id: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    lastModifiedDate: string;
    categoryId: string;
    categoryType: number;
    categoryName: string;
    image: string;
    title: string;
    description: string;
    content: string;
    newsDate: string;
    status: number;
  }
@Injectable
export class NewsServie extends BaseService<News> {
    fields(): { [K in keyof News]: keyof News; } {
        return {
            id: "id",
            createdBy: "createdBy",
            createdDate: "createdDate",
            updatedBy:"updatedBy",
            lastModifiedDate :"lastModifiedDate",
            categoryId:"categoryId",
            categoryType: "categoryType",
            categoryName :"categoryName",
            image: "image",
            title: "title",
            description: "description",
            content:"content",
            newsDate: "newsDate",
            status:"status"
        };
    }
    constructor() {
        super("News");
    }

}