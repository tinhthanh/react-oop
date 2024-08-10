import { Injectable } from "../../../utils/inject";
import { BaseService } from "./base/base.service";
import { EntityModel } from "./base/base.type";
import { CompanyModel } from "./company.model";

export interface EmployeeModel extends EntityModel {
    id: string;
    code: string;
    fullname: string;
    company: CompanyModel;
    phoneNumber: string;
    email: string;
    contractType: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    status: number;
}

@Injectable
export class EmployeeService extends BaseService<EmployeeModel> {
    constructor() {
        super('Employees');
    }
    fields(): { [K in keyof EmployeeModel]: keyof EmployeeModel } {
        return {
            id: 'id',
            code: 'code',
            fullname: 'fullname',
            company: 'company',
            phoneNumber: 'phoneNumber',
            email: 'email',
            contractType: 'contractType',
            createdBy: 'createdBy',
            createdDate: 'createdDate',
            updatedBy: 'updatedBy',
            status: 'status',
        };
    }
}