import { useEffect, useState } from 'react';
import { RecruitmentDetailState } from './RecruitmentDetailState';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRouter } from '../../../../../RouterType';
import { RecruitmentNewsModel, RecruitmentNewsService } from '../../../services/recruitmentNews.service';
import { useForm } from 'react-hook-form';
import { inject } from '../../../../../utils/inject';
import { ProductServie } from '../../../services/product.service';

function RecruitmentDetailHook() {
    const [recruitmentNewsServie] = useState(inject(RecruitmentNewsService));
    const [productServie] = useState(inject(ProductServie));
    
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
           recruitmentNewsServie.edit(data).then(() => {
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
        productServie.search({pageSize: 10, pageNumber: 1 }).then( rs => {
            console.log(rs);
        });
        loadPage();
    }, []);

    return {
        componentState,
        onSubmit,
        form
    };
}

export default RecruitmentDetailHook;