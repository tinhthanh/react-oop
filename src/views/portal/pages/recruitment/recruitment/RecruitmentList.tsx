import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import RecruitmentListHook from "./RecruitmentListHook";
import { AppRouter } from "../../../../../RouterType";
import { Pagination, Space, TableProps, Table, Popover } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { RecruitmentNewsModel } from "../../../services/recruitmentNews.service";
import StatusFilter from "../../../forms/fields/StatusFilter";
import SearchInput from "../../../forms/fields/SearchInput";
import SelectFilter from "../../../forms/fields/SelectFilter";

const columns: TableProps<RecruitmentNewsModel>["columns"] = [
  {
    title: "Vị trí tuyển dụng",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Hết hạn",
    dataIndex: "endDate",
    key: "endDate",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Ứng viên",
    dataIndex: "applied",
    key: "applied",
    render: (_, record) => (<>
      {(record.applyingList || []).length > 0 && (
        <>
         {record.applyingList.length} ứng viên</>
      )}
    </>)
  },
  {
    title: "Trạng thái",
    key: "status",
    render: (_, record) => (
      <Space size="middle">
        {record.status === 1 ? (
          <div className="justify-center px-2 py-0.5 bg-green-100 text-green-700 rounded-xl">Đã đăng</div>
        ) : (
          <div className="text-nowrap badge badge-ghost gap-2">
            Nháp
          </div>

        )}
      </Space>
    ),
  },
  {
    title: "Thao tác",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Popover content={<>
          <div className="flex flex-col bg-white max-w-[200px]">
            <div className="cursor-pointer flex gap-2 py-2 pr-1 pl-1.5 mt-1 w-full rounded">
              <div className="flex flex-col justify-center items-start">
                <svg
                  className="w-5 aspect-square"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0514 3.73889L15.4576 2.33265C16.0678 1.72245 17.0572 1.72245 17.6674 2.33265C18.2775 2.94284 18.2775 3.93216 17.6674 4.54235L8.81849 13.3912C8.37792 13.8318 7.83453 14.1556 7.23741 14.3335L5 15L5.66648 12.7626C5.84435 12.1655 6.1682 11.6221 6.60877 11.1815L14.0514 3.73889ZM14.0514 3.73889L16.25 5.93749M15 11.6667V15.625C15 16.6605 14.1605 17.5 13.125 17.5H4.375C3.33947 17.5 2.5 16.6605 2.5 15.625V6.87499C2.5 5.83946 3.33947 4.99999 4.375 4.99999H8.33333"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Link
                className="text-blue-500"
                to={AppRouter.recruitmentDetail + "/" + record.id}
              >
                <div className="flex-1 justify-center px-5 text-sm leading-5 text-gray-700">
                  Cập nhật
                </div>
              </Link>
            </div>
            {/* <div className="cursor-pointer flex gap-2 py-2 pr-1 pl-1.5 mt-1 w-full rounded">
              <div className="flex flex-col justify-center items-start">
                <svg
                  className="w-5 aspect-square"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2837 7.5L11.9952 15M8.00481 15L7.71635 7.5M16.023 4.82547C16.308 4.86851 16.592 4.91456 16.875 4.96358M16.023 4.82547L15.1332 16.3938C15.058 17.3707 14.2434 18.125 13.2637 18.125H6.73631C5.75655 18.125 4.94198 17.3707 4.86683 16.3938L3.97696 4.82547M16.023 4.82547C15.0677 4.6812 14.1013 4.57071 13.125 4.49527M3.125 4.96358C3.40798 4.91456 3.69198 4.86851 3.97696 4.82547M3.97696 4.82547C4.93231 4.6812 5.89874 4.57071 6.875 4.49527M13.125 4.49527V3.73182C13.125 2.74902 12.3661 1.92853 11.3838 1.8971C10.9244 1.8824 10.463 1.875 10 1.875C9.53696 1.875 9.07565 1.8824 8.61618 1.8971C7.63388 1.92853 6.875 2.74902 6.875 3.73182V4.49527M13.125 4.49527C12.0938 4.41558 11.0516 4.375 10 4.375C8.94836 4.375 7.9062 4.41558 6.875 4.49527"
                    stroke="#DC2626"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>
              <div className="flex-1 justify-center px-5 text-sm leading-5 text-red-600 whitespace-nowrap">
                Xoá
              </div>
            </div> */}
          </div>
        </>} trigger="click">
          <EllipsisOutlined className="cursor-pointer text-2xl" />
        </Popover>
      </Space>
    ),
  },
];

export function RecruitmentList(): React.JSX.Element {
  const elHook = RecruitmentListHook();
  const filterForm = useForm<{ status: number | null; title: string } & {pageSize: number; pageNumber: number; companyId:string; locationId:string}>({
    defaultValues: {title: '', status: null , pageSize: 10, pageNumber: 1},
  });
  const totalElements = elHook.componentState.rsList?.data?.totalElements || 0;
  const pageSize = elHook.componentState.rsList?.data?.size || 0;
  const currentPage = elHook.componentState.rsList?.data?.page || 0;
  const values = useWatch({
    control: filterForm.control,
  });
  useEffect( () => {
    console.log(values);
    elHook.onSearch(values as {pageNumber: number; pageSize: number});
 },[values]);
  if (elHook) {
    return (
      <>
        <div className="flex flex-col pt-5">
          <div className="flex gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex-1 justify-center py-1.5 text-xl font-semibold leading-7 text-gray-800 max-md:max-w-full">
              Tuyển dụng
            </div>
            <Link to={AppRouter.recruitmentDetail}>
              <div className="cursor-pointer flex flex-col flex-1 justify-center items-end px-3 text-sm font-medium leading-5 text-center text-white max-md:max-w-full">
                <div className="justify-center px-3.5 py-2.5 bg-blue-600 rounded-lg">
                  Tạo tuyển dụng
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="p-6 bg-inherit">
          <div className="card bg-base-100 ">
            <div className="card-body p-0 gap-0">
            <FormProvider {...filterForm}>
               <form> 
               <div className="flex-1">
                <div className="flex gap-0 self-stretch px-5 text-center bg-white rounded-t-lg border-b border-gray-200 border-solid max-md:flex-wrap">
                <Controller
                  name="status"
                  control={filterForm.control}
                  defaultValue={null}
                  render={({ field }) => (
                    <StatusFilter
                      items={[
                        { title: "Tất cả", value: null },
                        { title: "Đang tuyển", value: 1 },
                        { title: "Draft", value: 2 },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                 />
                </div>
              </div>
              <div className="flex gap-5 self-stretch px-5 pt-5 pb-2 bg-white max-md:flex-wrap">
                <div className="flex gap-5 max-md:flex-wrap">
                <Controller
                    name="locationId"
                    control={filterForm.control}
                    render={({ field }) => (
                      <SelectFilter 
                          label="Khu vực"
                          value={field.value}
                          items={elHook.componentState.local.map((item) => ({ label: item.name, value: item.id }))}
                          onChange={field.onChange} />
                    )}
                  />
                <Controller
                    name="companyId"
                    control={filterForm.control}
                    render={({ field }) => (
                      <SelectFilter 
                          label="Công ty"
                          value={field.value}
                          items={elHook.componentState.companyList.map((item) => ({ label: item.name, value: item.id }))}
                          onChange={field.onChange} />
                    )}
                  />
                </div>
                <div className="flex flex-col flex-1 justify-end items-end  text-sm leading-5 ">
                  <div className="relative flex flex-col justify-center w-[280px]">
                  <Controller
                    name="title"
                    control={filterForm.control}
                    render={({ field }) => (
                      <SearchInput {...field} placeholder="Nhập từ khoá tìm kiếm" />
                    )}
                  />
                  </div>
                </div>
              </div>
              </form>
            </FormProvider>
            
              <Table pagination={false} rowKey="id" bordered={false} columns={columns} dataSource={elHook.componentState.rsList?.data?.elements || []} />
              <div className="p-4 bg-white rounded-b-lg relative">
              <Pagination
                align="center"
                total={totalElements}
                showTotal={(total, range) => (
                  <>
                    {range[0]}-{range[1]} <b>của</b> {total} <b>tin</b>
                  </>
                )}
                pageSize={pageSize}
                current={currentPage}
                onChange={(page, pageSize) => {
                  filterForm.setValue("pageNumber", page);
                  filterForm.setValue("pageSize", pageSize);
                  }
                }
              />
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
