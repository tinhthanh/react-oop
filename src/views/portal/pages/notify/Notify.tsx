import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppRouter } from "../../../../RouterType";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Input,
  Modal,
  Pagination,
  Popover,
  Space,
  Table,
  TableProps,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { BannerModel } from "../../services/banner.service";
import NotifyHook from "./NotifyHook";
import { AnyType } from "../../../../types/baseType";
import { NotifyService } from "../../services/notify.service";
import { inject } from "../../../../utils/inject";
import JSON5 from "json5";
interface ConfigFirebase {
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  vapidKey: string;
  serviceAccount: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
  };
}

const columns: TableProps<BannerModel>["columns"] = [
  {
    title: "Tiêu đề	",
    dataIndex: "title",
    key: "title",
    render: (text) => (
      <div className="justify-center items-start  text-blue-600">{text}</div>
    ),
  },
  {
    title: "ID Khu vực",
    dataIndex: "areaKey",
    key: "areaKey",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Banner",
    dataIndex: "image",
    key: "image",
    render: (_, record) => (
      <>
        <img className="w-[150px] rounded-lg shadow-lg" src={record.image} />
      </>
    ),
  },
  {
    title: "Bắt đầu",
    dataIndex: "start",
    key: "start",
    render: (text) => <>{dayjs(text).format("DD-MM-YYYY")}</>,
  },
  {
    title: "Kết thúc",
    dataIndex: "end",
    key: "end",
    render: (text) => <>{dayjs(text).format("DD-MM-YYYY")}</>,
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
    render: () => (
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
                  <div className="flex-1 justify-center px-5 text-sm leading-5 text-gray-700">
                    Cập nhật
                  </div>
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
const Notify: React.FC = () => {
  const [notifyService] = useState(inject(NotifyService));
  useEffect(() => {
    notifyService.requestPermission().then((token: string) => {
      if (token) {
        console.log("Notification permission granted");
        notifyService.getCouter().subscribe((couter) => {
          console.log(couter.length);
          console.log(notifyService._couter);
        });
      }
    });
  }, []);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConfigFirebase>();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const onSubmit = (data: ConfigFirebase) => {
    console.log(data);
    setIsModalVisible(false);
    reset();
    data.firebaseConfig = JSON5.parse(data.firebaseConfig as AnyType);
    data.serviceAccount = JSON5.parse(data.serviceAccount as AnyType);
    notifyService.setConfig(data);
    notifyService.init();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    reset();
  };

  const elHook = NotifyHook();
  const totalElements = elHook.componentState.rsList?.data?.totalElements || 0;
  const pageSize = elHook.componentState.rsList?.data?.size || 0;
  const currentPage = elHook.componentState.rsList?.data?.page || 0;

  const filterForm = useForm<{
    status: number;
    areaKey: string;
    pageSize: number;
    pageNumber: number;
  }>({
    defaultValues: {
      pageSize: 10,
      pageNumber: 1,
    },
  });
  const values = useWatch({
    control: filterForm.control,
  });
  useEffect(() => {
    elHook.onSearch(values as { pageNumber: number; pageSize: number });
  }, [values]);

  const formatJSON = (value: AnyType) => {
    // Chuyển đổi JSON đẹp thành JSON hợp lệ
    try {
      JSON5.parse(value);
      return true;
    } catch {
      return "Invalid JSON format";
    }
  };
  return (
    elHook && (
      <>
        <Modal
          title="Firebase Configuration"
          open={isModalVisible}
          onOk={handleSubmit(onSubmit)}
          onCancel={handleCancel}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <label>Vapid Key</label>
                <Controller
                  name="vapidKey"
                  control={control}
                  rules={{ required: "Trường này là bắt buộc" }}
                  render={({ field }) => (
                    <>
                      <Input {...field} style={{ marginBottom: "4px" }} />
                      {errors.vapidKey && (
                        <span style={{ color: "red" }}>
                          {errors.vapidKey.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Firebase Config (JSON)</label>
                <textarea
                  placeholder=""
                  className="p-2 text-gray-800 bg-white rounded-lg border border-gray-300 border-solid"
                  {...register("firebaseConfig", {
                    validate: formatJSON,
                  })}
                  rows={10}
                  style={{ width: "100%", marginBottom: "4px" }}
                />
                {errors.firebaseConfig && (
                  <span style={{ color: "red" }}>
                    {errors.firebaseConfig.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label>Firebase Admin SDK (JSON)</label>
                <textarea
                  placeholder=""
                  className="p-2 text-gray-800 bg-white rounded-lg border border-gray-300 border-solid"
                  {...register("serviceAccount", {
                    validate: formatJSON,
                  })}
                  rows={10}
                  style={{ width: "100%", marginBottom: "4px" }}
                />
                {errors.serviceAccount && (
                  <span style={{ color: "red" }}>
                    {errors.serviceAccount.message}
                  </span>
                )}
              </div>
             
            </div>
          </form>
        </Modal>
        <div className="h-[calc(100vh_-_48px)] overflow-y-auto">
          <div className="overflow-x-auto p-6">
            <div className="pb-5">
              <div className=" flex gap-5 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex-1 justify-center py-1.5 text-xl font-semibold leading-7 text-gray-800 max-md:max-w-full">
                  Danh sách thông báo
                </div>
                <div className="cursor-pointer flex flex-col flex-1 justify-center items-end  text-sm font-medium leading-5 text-center text-white max-md:max-w-full">
                  <Link to={AppRouter.notify}>
                    <div
                      onClick={showModal}
                      className=" justify-center px-3.5 py-2.5 bg-blue-600 rounded-lg"
                    >
                      Cài đặt firebase
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 ">
              <div className="card-body p-0">
                <div className="flex gap-0 px-5 text-center bg-white rounded-t-lg  border-gray-200 border-solid max-md:flex-wrap max-md:max-w-full p-4 ">
                  <div className="flex flex-row gap-4 flex-1 max-md:max-w-full">
                    <div className="relative "></div>
                  </div>
                </div>
                <Table
                  pagination={false}
                  rowKey="id"
                  bordered={false}
                  columns={columns}
                  dataSource={
                    elHook.componentState.rsList?.data?.elements || []
                  }
                />
                <div
                  className="
             rounded-b-lg  flex flex-col pb-2 text-sm leading-5 text-gray-400 bg-white max-md:max-w-full
             relative  justify-center gap-2 pt-5"
                >
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
        </div>
      </>
    )
  );
};
export default Notify;
