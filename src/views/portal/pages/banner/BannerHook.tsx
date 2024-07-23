import { useEffect, useState } from "react";
import { BannerState } from "./BannerState";
import { useLayoutContext } from "../../contexts/LayoutContext";
import { AppRouter } from "../../../../RouterType";
import { BannerServie } from "../../services/banner.service";
import { inject } from "../../../../utils/inject";


export default function BannerHook() { 
    const [bannerService] = useState(inject(BannerServie));
    const { setActiveMenuItem , setBreadcrumb} = useLayoutContext();
    const [componentState, setComponentState] = useState(new BannerState());
    async function init() {
       await componentState.init();
       const pageState: BannerState = componentState.copy();
       setComponentState(pageState);
    }
    async function onSearch(filter: {pageNumber: number; pageSize: number}) {
        const pageState: BannerState = componentState.copy();
          await bannerService.search(filter).then( rs => {
            pageState.rsList = rs;
            setComponentState(pageState);
          });
   }
    useEffect(() => {
        setActiveMenuItem([AppRouter.banner]);
        setBreadcrumb([{
            className:"text-blue-500",
            title: 'Marketing' },{ title: 'Banner' }]);   
        init();
    }, []);
    return {
        componentState,
        onSearch
    };
}

