import { CategoryModel } from '../../../services/category.model';
import { ComponentState } from '../../../../../services/componentState';
export class NewsDetailState extends ComponentState {
 
    public catagoryList: CategoryModel[] = [] ;
    public async init(): Promise<void> {
      this.catagoryList = [{
        id: "id1",
        type: "TT",
        name: "Tin tức"
      },
      {
        id: "id2",
        type: "SK",
        name: "Sự kiện"
      }];
    }
}