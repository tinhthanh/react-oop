import React from "react";
import EmployeeDetailHook from "./employeeDetailHook";
import { Link } from "react-router-dom";
import { AppRouter } from "../../../../../RouterType";

function EmployeeDetail(): React.JSX.Element {
  const elHook = EmployeeDetailHook();

  if (elHook) {
    return (
      <>
        <div className="flex flex-col self-stretch">
          <div className="flex flex-col pt-5 w-full max-md:max-w-full">
            <div className="flex gap-5 px-5 w-full justify-between">
              <div className="justify-center py-1.5 max-md:max-w-full text-xl font-semibold leading-7 text-gray-800">
                Hồ sơ nhân viên
              </div>
              <div className="flex flex-row gap-0">
                <Link to={AppRouter.recruitmentDetail}>
                  <div className="cursor-pointer flex flex-col flex-1 justify-center items-end px-3 text-sm font-medium leading-5 text-center text-white max-md:max-w-full">
                    <div className="justify-center px-3.5 py-2.5 bg-blue-600 rounded-lg">
                      Xoá
                    </div>
                  </div>
                </Link>
                <Link to={AppRouter.recruitmentDetail}>
                  <div className="cursor-pointer flex flex-col flex-1 justify-center items-end px-3 text-sm font-medium leading-5 text-center text-white max-md:max-w-full">
                    <div className="justify-center px-3.5 py-2.5 bg-blue-600 rounded-lg">
                      Cập nhật
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex gap-0 px-5 pt-5 w-full justify-between">
              <div className="bg-white flex w-full rounded-lg">
                <div className="flex-1 w-1/3 p-5">
                  <div className="flex w-full items-center gap-4">
                    <div className="w-[120px] h-[120px] bg-slate-400 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                      <h1 className="font-medium text-xl">Nguyễn Phương Anh</h1>
                      <div>
                        <span className="bg-green-200 text-green-700 rounded-3xl px-2 py-1">
                          Chính thức
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-2 w-2/3 border-l border-l-slate-200 p-5">
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col">
                      <div className="text-slate-600 text-sm">Mã nhân viên</div>
                      <div className="font-medium">G1000567</div>
                    </div>
                    <div className="flex flex-row">
                      <div className="flex flex-col flex-1">
                        <div className="text-slate-600 text-sm">Email</div>
                        <div className="font-medium">anh.np@gmail.com</div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="text-slate-600 text-sm">Phone</div>
                        <div className="font-medium">0389947783</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default EmployeeDetail;
