import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRouter } from '../../../../../RouterType';
import { useForm } from 'react-hook-form';
import { inject } from '../../../../../utils/inject';
import { ProductServie } from '../../../services/product.service';
import { EmployeeModel, EmployeeService } from '../../../services/employee.service';
import { EmployeeDetailState } from './employeeDetailState';

function EmployeeDetailHook() {
    const [employeeService] = useState(inject(EmployeeService));
    const [productServie] = useState(inject(ProductServie));
    
    const [componentState] = useState(new EmployeeDetailState());
    const { id } = useParams();
    const navigate  = useNavigate();
    const form = useForm<EmployeeModel>({
        defaultValues: {
          code: "",
          fullname: "",
        }
      });
    /**
     * Load page
     */
   
    async function loadPage(): Promise<void> {
        if (id) {
          await employeeService.get(id).then( rs => {
            if(rs) {
              form.reset(rs);
            }
          });
        }
       
    }
    function onSubmit(data: EmployeeModel) {
        if(data.id) {
          employeeService.edit(data).then(() => {
               navigate(AppRouter.employee);
             });
        } else {
          employeeService.add(data).then(() => {
               navigate(AppRouter.employee);
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

export default EmployeeDetailHook;