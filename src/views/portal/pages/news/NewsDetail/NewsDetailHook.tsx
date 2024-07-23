import { useEffect, useState } from 'react';
import { NewsDetailState } from './NewsDetailState';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRouter } from '../../../../../RouterType';
import { useLayoutContext } from '../../../contexts/LayoutContext';
import { useForm } from 'react-hook-form';
import { News, NewsServie } from '../../../services/news.service';
import dayjs from 'dayjs';
import { inject } from '../../../../../utils/inject';


function NewsDetailHook() {
    const  [newService]  = useState(inject(NewsServie));
    const { setActiveMenuItem } = useLayoutContext();
    const form = useForm<News>({ defaultValues: { categoryId: '', content: '', title: '', image: '' } });
    const [componentState, setComponentState] = useState(new NewsDetailState());
    const { id } = useParams();
    const navigate = useNavigate();
    /**
     * Load page
     */
    async function loadPage(): Promise<void> {
        const pageState: NewsDetailState = componentState.copy();
        await pageState.init();
        if (id) {
          await newService.get(id).then( rs => {
            form.reset(rs);
          });
        }
        setComponentState(pageState);
    }
    function onSubmit(data: News) {
         if(data.id) {
            newService.edit(data).then(() => {
                navigate(AppRouter.news);
              });
         } else {
            newService.add({...data, newsDate : dayjs(new Date()).format("DD-MM-YYYY")}).then(() => {
                navigate(AppRouter.news);
              });
         }
      }
    useEffect(() => {
        // userEffect implement here
        setActiveMenuItem([AppRouter.news]);
        loadPage();
       
    }, []);

    return {
        componentState,
        form,
        onSubmit
    };
}

export default NewsDetailHook;