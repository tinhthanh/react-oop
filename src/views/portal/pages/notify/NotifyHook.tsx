import { useEffect, useState } from "react";
import { useLayoutContext } from "../../contexts/LayoutContext";
import { AppRouter } from "../../../../RouterType";
import { BannerServie } from "../../services/banner.service";
import { inject } from "../../../../utils/inject";
import { NotifyState } from "./NotifyState";

export default function NotifyHook() { 
    const [bannerService] = useState(inject(BannerServie));
    const { setActiveMenuItem , setBreadcrumb} = useLayoutContext();
    const [componentState, setComponentState] = useState(new NotifyState());
    async function init() {
       await componentState.init();
       const pageState: NotifyState = componentState.copy();
       setComponentState(pageState);
    }
    async function onSearch(filter: {pageNumber: number; pageSize: number}) {
        const pageState: NotifyState = componentState.copy();
          await bannerService.search(filter).then( rs => {
            pageState.rsList = rs;
            setComponentState(pageState);
          });
   }
    useEffect(() => {
        setActiveMenuItem([AppRouter.notify]);
        setBreadcrumb([{
            className:"text-blue-500",
            title: 'Danh sách thông báo' }]);   
        init();
    }, []);
    return {
        componentState,
        onSearch
    };
}

