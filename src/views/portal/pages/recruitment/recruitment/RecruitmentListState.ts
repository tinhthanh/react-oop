import { CompanyModel } from "../../../services/company.model";
import { ResponseBase } from "../../../services/base/base.type";
import { RecruitmentNewsModel } from "../../../services/recruitmentNews.service";
import { LocalModel } from "../../../services/location.model";
import { ComponentState } from "../../../../../services/componentState";
export class RecruitmentListState extends ComponentState {
  companyList: CompanyModel[] = [];
  local: LocalModel[] = [];
  rsList!: ResponseBase<RecruitmentNewsModel>;
  public async init(): Promise<void> {}
}
