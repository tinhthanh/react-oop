import { CompanyModel } from '../../../services/company.model';
import { LocalModel } from '../../../services/location.model';
import { ComponentState } from '../../../../../services/componentState';
export class EmployeeDetailState extends ComponentState {
    companyList: CompanyModel[] = [{
        id: "PAL",
        type: "TECH",
        name: "PALTECT"
    },
    {
        id: "BSTART",
        type: "BSTAT",
        name: "BStart"
    }];
    local: LocalModel[] = [{
        id: "key1",
        parent: "key1",
        name: "HN"
      },
      {
        id: "key2",
        parent: "key2",
        name: "HCM"
      }];
    public async init(): Promise<void> { }
}