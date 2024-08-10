import { ComponentState } from "../../../../../services/componentState";
import { ResponseBase } from "../../../services/base/base.type";
import { CompanyModel } from "../../../services/company.model";
import { EmployeeModel } from "../../../services/employee.service";
import { LocalModel } from "../../../services/location.model";
export class EmployeeListState extends ComponentState {
  companyList: CompanyModel[] = [];
  local: LocalModel[] = [];
  rsList!: ResponseBase<EmployeeModel>;
  public async init(): Promise<void> {}
}
