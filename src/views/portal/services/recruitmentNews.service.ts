import { EntityModel } from "./base/base.type";
import { BaseService } from './base/base.service';
import { Injectable } from "../../../utils/inject";


export interface Company {
  id: string;
  logo: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  parent: string;
}

export interface ApplyingList {
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  lastModifiedDate: string;
  id: string;
  recruitmentId: string;
  name: string;
  phone: string;
  email: string;
  linkedIn: string;
  cv: string;
  status?: number;
}

export interface RecruitmentNewsModel extends EntityModel {
  id: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  lastModifiedDate: string;
  company: Company;
  title: string;
  location: Location;
  negotiation: boolean;
  salaryMin: string;
  salaryMax: string;
  endDate: string;
  jobDescription: string;
  benefit: string;
  status: number;
  applyingList: ApplyingList[];
  locationId?: string;
  companyId?: string;
}

@Injectable
export class RecruitmentNewsService extends BaseService<RecruitmentNewsModel> {
  constructor() {
    super('RecruitmentNews');
  }
  fields(): { [K in keyof RecruitmentNewsModel]: keyof RecruitmentNewsModel } {
    return {
      id: "id",
      seqNo:"seqNo",
      deleted: "deleted",
      sync: "sync",
      createdBy: "createdBy",
      createdDate: "createdDate",
      updatedBy: "updatedBy",
      lastModifiedDate: "lastModifiedDate",
      company: "company",
      title: "title",
      location: "location",
      negotiation: "negotiation",
      salaryMin: "salaryMin",
      salaryMax: "salaryMax",
      endDate: "endDate",
      jobDescription: "jobDescription",
      benefit: "benefit",
      status: "status",
      applyingList: "applyingList",
      locationId: "locationId",
      companyId: "companyId" 
    };
  }
}
