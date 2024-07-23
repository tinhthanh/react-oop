import { useEffect, useState } from 'react';
import { NewsListState } from './NewsListState';
import { AppRouter } from '../../../../../RouterType';
import { useLayoutContext } from '../../../contexts/LayoutContext';
import { NewsServie } from '../../../services/news.service';
import { inject } from '../../../../../utils/inject';

function NewsListHook() {
    const [newsServie] = useState(inject(NewsServie));
    const { setActiveMenuItem, setBreadcrumb } = useLayoutContext();
    const [componentState, setComponentState] = useState(new NewsListState());
    async function loadPage(): Promise<void> {
        const pageState: NewsListState = componentState.copy();
        await pageState.init();
        setComponentState(pageState);
    }
   async function onSearch(filter: {pageNumber: number; pageSize: number}) {
        const pageState: NewsListState = componentState.copy();
           newsServie.search(filter).then( rs => {
             pageState.rsList = rs;
             setComponentState(pageState);
           });
   }
    useEffect(() => {
        loadPage();
        setActiveMenuItem([AppRouter.news]);
        setBreadcrumb([{
            className:"text-blue-500",
            title: 'Marketing' },{ title: 'Tin tức và sự kiện' }]);   
    }, []);
    return {
        componentState,
        onSearch
    };
}

export default NewsListHook;