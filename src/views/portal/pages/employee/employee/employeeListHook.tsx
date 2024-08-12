import { useEffect, useState } from "react";
import { inject } from "../../../../../utils/inject";
import { EmployeeService } from "../../../services/employee.service";
import { useLayoutContext } from "../../../contexts/LayoutContext";
import { EmployeeListState } from "./employeeListState";
import { useNavigate } from 'react-router-dom';
import { AppRouter } from "../../../../../RouterType";
import { AnyType } from "../../../../../types/baseType";

function EmployeeHook() {
    const [employeeService] = useState(inject(EmployeeService));
    const { setActiveMenuItem, setBreadcrumb } = useLayoutContext();
    const [componentState, setComponentState] = useState(new EmployeeListState());
    const navigate = useNavigate();

    /**
     * Load page
     */
    async function loadPage(): Promise<void> {
      
    }

    async function onSearch(filter: {pageNumber: number; pageSize: number}) {
        //   await componentState.onSearch(filter);
          employeeService.search(filter).then((rs: AnyType) => {
            componentState.rsList = rs;
            const pageState: EmployeeListState = componentState.copy();
            setComponentState(pageState);
          });
        
   }

    function handleClickEdit(id: string) {
        navigate(AppRouter.employee + `/${id}`);
    }

    function handleClickView(id: string) {
        navigate(AppRouter.employee + `/${id}`);
    }
   

    useEffect(() => {
        // userEffect implement here
        loadPage();
        setActiveMenuItem([AppRouter.employee]);
        setBreadcrumb([{
            className:"text-blue-500",
            title: 'Nhân sự' },{ title: 'Nhân viên' }]); 
    }, []);
    return {
        componentState,
        handleClickEdit,
        handleClickView,
        onSearch
    };
}

export default EmployeeHook;