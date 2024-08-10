import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRouter } from "../../../../../RouterType";
import { useForm } from "react-hook-form";
import { inject } from "../../../../../utils/inject";
import {
  EmployeeModel,
  EmployeeService,
} from "../../../services/employee.service";
import { EmployeeDetailState } from "./employeeDetailState";
import { useLayoutContext } from "../../../contexts/LayoutContext";

function EmployeeDetailHook() {
  const [employeeService] = useState(inject(EmployeeService));
  const { setActiveMenuItem, setBreadcrumb } = useLayoutContext();
  const [componentState] = useState(new EmployeeDetailState());
  const navigate = useNavigate();
  const form = useForm<EmployeeModel>({
    defaultValues: {
      code: "",
      fullname: "",
    },
  });
  function onSubmit(data: EmployeeModel) {
    if (data.id) {
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
    setActiveMenuItem([AppRouter.employee]);
    setBreadcrumb([
      {
        className: "text-blue-500",
        title: "Nhân sự",
      },
      { title: "Nhân viên" },
    ]);
  }, []);

  return {
    componentState,
    onSubmit,
    form,
  };
}

export default EmployeeDetailHook;
