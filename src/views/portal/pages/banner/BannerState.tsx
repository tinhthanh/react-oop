import { BannerModel } from '../../services/banner.service';
import { AreaModel } from '../../services/area.model';
import { ResponseBase } from '../../services/base/base.type';
import { ComponentState } from '../../../../services/componentState';
export class BannerState extends ComponentState { 
  areaList: AreaModel[] = [{
    id: "key1",
    key: "key1",
    descript: "HN"
  },
  {
    id: "key2",
    key: "key2",
    descript: "HCM"
  }]; 
    rsList!: ResponseBase<BannerModel>;
    public async  init() {}
}
