import { AppRouter } from "../../../../RouterType";
import { ComponentState } from "../../../../services/componentState";
import { LeftMenuType } from "../../../../types/commonType";

export class LeftBarState extends ComponentState {
    public menu: LeftMenuType[] = [
       
        {
            link: AppRouter.news,
            icon: "/assets/portal/left-bar/icon2.svg",
            name: 'Tin tức',
            matchPath: [AppRouter.news, AppRouter.newsDetail, AppRouter.newsView, new RegExp(`^\\${AppRouter.newsDetail}\\/[0-9a-fA-F]+(?:\\?type=[^&]+)?$`)]
        },
        {
            link: AppRouter.recruitment,
            icon: "/assets/portal/left-bar/icon2.svg",
            name: 'Tuyển dụng',
            matchPath: [AppRouter.recruitment, AppRouter.recruitmentDetail,new RegExp(`^\\${AppRouter.recruitmentDetail}\\/[^/]+$`)]
        },
        {
            link: AppRouter.banner,
            icon: "/assets/portal/left-bar/icon3.svg",
            name: 'Banner',
            matchPath: [AppRouter.banner, AppRouter.bannerCurd, new RegExp(`^\\${AppRouter.bannerCurd}\\/[^/]+$`)]
        }
    ];

    public init(): void {} 

    public activeMenu = '';

    setActiveMenu(link: string) {
        this.activeMenu = link;
    }
   
}