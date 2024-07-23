import { useEffect, useState } from 'react';
import { RecruitmentDetailState } from './RecruitmentDetailState';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRouter } from '../../../../../RouterType';
import { RecruitmentNewsModel, RecruitmentNewsService } from '../../../services/recruitmentNews.service';
import { useForm } from 'react-hook-form';
import { container } from 'tsyringe';

function RecruitmentDetailHook() {
    const [recruitmentNewsServie] = useState(container.resolve(RecruitmentNewsService));
    const [componentState] = useState(new RecruitmentDetailState());
    const { id } = useParams();
    const navigate  = useNavigate();
    const form = useForm<RecruitmentNewsModel>({
        defaultValues: {
          title: "",
          negotiation: true,
          locationId: "",
          companyId: "",
        }
      });
    /**
     * Load page
     */
   
    async function loadPage(): Promise<void> {
        if (id) {
          await recruitmentNewsServie.get(id).then( rs => {
            if(rs) {
              form.reset(rs);
            }
          });
        }
       
    }
    function onSubmit(data: RecruitmentNewsModel) {
        if(data.id) {
           recruitmentNewsServie.edit(data.id,data).then(() => {
               navigate(AppRouter.recruitment);
             });
        } else {
           recruitmentNewsServie.add(data).then(() => {
               navigate(AppRouter.recruitment);
             });
        }
     }
    useEffect(() => {
        // userEffect implement here
        loadPage();
    }, []);

    return {
        componentState,
        onSubmit,
        form
    };
}

export default RecruitmentDetailHook;