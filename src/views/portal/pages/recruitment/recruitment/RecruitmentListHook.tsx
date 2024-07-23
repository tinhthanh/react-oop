import { useEffect, useState } from 'react';
import { RecruitmentListState } from './RecruitmentListState';
import { useNavigate } from 'react-router-dom';
import { AppRouter } from '../../../../../RouterType';
import { useLayoutContext } from '../../../contexts/LayoutContext';
import { RecruitmentNewsService } from '../../../services/recruitmentNews.service';
import { inject } from '../../../../../utils/inject';

function RecruitmentListHook() {
    const [recruitmentNewsService] = useState(inject(RecruitmentNewsService));
    const { setActiveMenuItem, setBreadcrumb } = useLayoutContext();
    const [componentState, setComponentState] = useState(new RecruitmentListState());
    const navigate = useNavigate();

    /**
     * Load page
     */
    async function loadPage(): Promise<void> {
      
    }

    async function onSearch(filter: {pageNumber: number; pageSize: number}) {
        //   await componentState.onSearch(filter);
          recruitmentNewsService.search(filter).then( rs => {
            componentState.rsList = rs;
            const pageState: RecruitmentListState = componentState.copy();
            setComponentState(pageState);
          });
        
   }

    function handleClickEdit(id: string) {
        navigate(AppRouter.recruitmentDetail + `/${id}`);
    }

    function handleClickView(id: string) {
        navigate(AppRouter.recruitmentDetail + `/${id}`);
    }
   

    useEffect(() => {
        // userEffect implement here
        loadPage();
        setActiveMenuItem([AppRouter.recruitment]);
        setBreadcrumb([{
            className:"text-blue-500",
            title: 'Nhân sự' },{ title: 'Tuyển dụng' }]); 
    }, []);
    return {
        componentState,
        handleClickEdit,
        handleClickView,
        onSearch
    };
}

export default RecruitmentListHook;