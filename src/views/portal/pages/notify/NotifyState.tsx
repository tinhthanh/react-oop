import { BannerModel } from '../../services/banner.service';
import { ResponseBase } from '../../services/base/base.type';
import { ComponentState } from '../../../../services/componentState';
export class NotifyState extends ComponentState { 
    rsList!: ResponseBase<BannerModel>;
    public async  init() {}
}
