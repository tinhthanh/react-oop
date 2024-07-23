
import { ResponseBase } from "../../../services/base/base.type";
import { News } from "../../../services/news.service";
import { ComponentState } from "../../../../../services/componentState";

export class NewsListState extends ComponentState {
  public rsList!: ResponseBase<News>;
  public async init(): Promise<void> {}
}
