import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppRouter } from "../../../../../RouterType";
import { Pagination, Space, TableProps, Table, Popover } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import SearchInput from "../../../forms/fields/SearchInput";
import SelectFilter from "../../../forms/fields/SelectFilter";
import EmployeeHook from "./employeeListHook";
import { EmployeeModel } from "../../../services/employee.service";

const columns: TableProps<EmployeeModel>["columns"] = [
  {
    title: "Mã nhân viên",
    dataIndex: "code",
    key: "code",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Họ tên",
    dataIndex: "fullname",
    key: "fullname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Công ty",
    dataIndex: "company",
    key: "company",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Trạng thái",
    key: "status",
    render: (_, record) => (
      <Space size="middle">
        {record.status === 1 ? (
          <div className="justify-center px-2 py-0.5 bg-green-100 text-green-700 rounded-xl">
            Đang làm việc
          </div>
        ) : (
          <div className="text-nowrap badge badge-ghost gap-2">
            Đã nghỉ việc
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
        <Popover
          content={
            <>
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
              </div>
            </>
          }
          trigger="click"
        >
          <EllipsisOutlined className="cursor-pointer text-2xl" />
        </Popover>
      </Space>
    ),
  },
];

export function EmployeeList() {
  const elHook = EmployeeHook();
  const filterForm = useForm<
    { status: number | null; title: string } & {
      pageSize: number;
      pageNumber: number;
      companyId: string;
      locationId: string;
    }
  >({
    defaultValues: { title: "", status: null, pageSize: 10, pageNumber: 1 },
  });
  const totalElements = elHook.componentState.rsList?.data?.totalElements || 0;
  const pageSize = elHook.componentState.rsList?.data?.size || 0;
  const currentPage = elHook.componentState.rsList?.data?.page || 0;
  const values = useWatch({
    control: filterForm.control,
  });
  useEffect(() => {
    console.log(values);
    elHook.onSearch(values as { pageNumber: number; pageSize: number });
  }, [values]);

  if (!elHook) return <></>;

  if (elHook) {
    return (
      <>
        <div className="flex flex-col pt-5">
          <div className="flex gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex-1 justify-center py-1.5 text-xl font-semibold leading-7 text-gray-800 max-md:max-w-full">
              Nhân viên
            </div>
            <Link to={AppRouter.recruitmentDetail}>
              <div className="cursor-pointer flex flex-col flex-1 justify-center items-end px-3 text-sm font-medium leading-5 text-center text-white max-md:max-w-full">
                <div className="justify-center px-3.5 py-2.5 bg-blue-600 rounded-lg">
                  Tạo nhân viên
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
                  <div className="flex gap-5 self-stretch px-5 pt-5 pb-2 bg-white max-md:flex-wrap">
                    <div className="flex gap-5 max-md:flex-wrap">
                      <Controller
                        name="locationId"
                        control={filterForm.control}
                        render={({ field }) => (
                          <SelectFilter
                            label="Khu vực"
                            value={field.value}
                            items={elHook.componentState.local.map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <Controller
                        name="companyId"
                        control={filterForm.control}
                        render={({ field }) => (
                          <SelectFilter
                            label="Công ty"
                            value={field.value}
                            items={elHook.componentState.companyList.map(
                              (item) => ({ label: item.name, value: item.id })
                            )}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    <div className="flex flex-col flex-1 justify-end items-end  text-sm leading-5 ">
                      <div className="relative flex flex-col justify-center w-[280px]">
                        <Controller
                          name="title"
                          control={filterForm.control}
                          render={({ field }) => (
                            <SearchInput
                              {...field}
                              placeholder="Nhập từ khoá tìm kiếm"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </FormProvider>

              <Table
                pagination={false}
                rowKey="id"
                bordered={false}
                columns={columns}
                dataSource={elHook.componentState.rsList?.data?.elements || []}
              />
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
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
