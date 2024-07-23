import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NewsListHook from "./NewsListHook";
import { AppRouter } from "../../../../../RouterType";
import { Pagination, Popover, Space, Table, TableProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import SearchInput from "../../../forms/fields/SearchInput";
import StatusFilter from "../../../forms/fields/StatusFilter";
import { News } from "../../../services/news.service";

const columns: TableProps<News>["columns"] = [
  {
    title: "Tin tức / Sự kiện",
    dataIndex: "title",
    key: "title",
    render: (text) => (
      <div className="justify-center items-start  text-blue-600">{text}</div>
    ),
  },
  {
    title: "Ngày đăng",
    dataIndex: "newsDate",
    key: "newsDate",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Loại",
    dataIndex: "categoryName",
    key: "categoryName",
    render: (_, record) => <>{record.categoryName}</>,
  },
  {
    title: "Trạng thái",
    key: "status",
    render: (_, record) => (
      <Space size="middle">
        {record.status === 1 ? (
          <div className="justify-center px-2 py-0.5 bg-green-100 text-green-700 rounded-xl">
            Đã đăng
          </div>
        ) : (
          <div className="text-nowrap badge badge-ghost gap-2">Nháp</div>
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
                    to={AppRouter.newsDetail + "/" + record.id}
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

const NewsList: React.FC = () => {
  const filterForm = useForm<{ status: number | null; title: string } & {pageSize: number; pageNumber: number}>({
    defaultValues: {title: '', status: null , pageSize: 10, pageNumber: 1},
  });
  const elHook = NewsListHook();
  const totalElements = elHook.componentState.rsList?.data?.totalElements || 0;
  const pageSize = elHook.componentState.rsList?.data?.size || 0;
  const currentPage = elHook.componentState.rsList?.data?.page || 0;
  const values = useWatch({
    control: filterForm.control,
  });
  useEffect( () => {
     elHook.onSearch(values as {pageNumber: number; pageSize: number});
  },[values]);
  if (elHook) {
    return (
      <div className=" p-6 h-[100vh] overflow-x-auto bg-inherit">
        <div className="pb-5">
        <div className=" flex gap-5 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex-1 justify-center py-1.5 text-xl font-semibold leading-7 text-gray-800 max-md:max-w-full">
            Danh sách tin tức sự kiện
          </div>
          <div className="cursor-pointer flex flex-col flex-1 justify-center items-end  text-sm font-medium leading-5 text-center text-white max-md:max-w-full">
            <Link
              to={
                AppRouter.newsDetail +
                  "?type=public"
              }
            >
              <div className=" justify-center px-3.5 py-2.5 bg-blue-600 rounded-lg">
                Thêm tin tức / sự kiện
              </div>
            </Link>
          </div>
         </div>
        </div>
        <FormProvider {...filterForm}>
          <form>
            <Controller
              name="status"
              control={filterForm.control}
              defaultValue={null}
              render={({ field }) => (
                <StatusFilter
                  items={[
                    { title: "Tất cả", value: null },
                    { title: "Publish", value: 1 },
                    { title: "Draft", value: 2 },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="bg-white px-5 py-5 flex flex-col justify-center max-md:max-w-full">
              <Controller
                name="title"
                control={filterForm.control}
                render={({ field }) => (
                  <SearchInput {...field} placeholder="Nhập từ khoá tìm kiếm" />
                )}
              />
                 
            </div>
          </form>
        </FormProvider>
        <div className="flex flex-col w-full max-md:max-w-full">
          <div className="rounded-b-lg  flex flex-col pb-2 text-sm leading-5 text-gray-400 bg-white max-md:max-w-full">
            <Table
              pagination={false}
              rowKey="id"
              bordered={false}
              columns={columns}
              dataSource={elHook.componentState.rsList?.data?.elements || []}
            />
            <div className="p-4 relative ">
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
    );
  } else {
    return<></>;
  }
};

export default NewsList;
