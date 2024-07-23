import { useEffect, useState } from "react";
import { BannerState } from "./bannerSate";
import { useNavigate, useParams } from "react-router-dom";
import { AppRouter } from "../../../../RouterType";
import { useForm } from "react-hook-form";
import { BannerModel, BannerServie } from "../../services/banner.service";
import { useLayoutContext } from "../../contexts/LayoutContext";
import { container } from "tsyringe";

export default function BannerCurdHook() {
    const  [bannerService] = useState(container.resolve(BannerServie));
    const { setActiveMenuItem } = useLayoutContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [componentState, setComponentState] = useState(new BannerState());
    const form = useForm<BannerModel>({ defaultValues: { title: '', image: '' } });
   /**
     * Load page
     */
   async function loadPage(): Promise<void> {
    const pageState: BannerState = componentState.copy();
    await pageState.init();
    if (id) {
       bannerService.get(id).then( rs => {
        form.reset(rs);
      });
    }
    setComponentState(pageState);
}
    function onSubmit(data: BannerModel) {
        if(data.id) {
            bannerService.edit(data.id,data).then(() => {
               navigate(AppRouter.banner);
             });
        } else {
            bannerService.add(data).then(() => {
               navigate(AppRouter.banner);
             });
        }
     }
     
    useEffect(() => {
        setActiveMenuItem([AppRouter.banner]);
        loadPage();
        return () => {
            console.log('Component banner crud unmount');
        };
    }, []);
    return {
        componentState,
        onSubmit,
        form
    };
}