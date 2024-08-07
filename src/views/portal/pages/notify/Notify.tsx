import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppRouter } from "../../../../RouterType";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Input,
  Modal,
} from "antd";
import { ConfigFirebase, NotifyService } from "../../services/notify.service";
import { inject } from "../../../../utils/inject";
import JSON5 from "json5";
import { AnyType } from "../../../../types/baseType";



const Notify: React.FC = () => {
  const [notifyService] = useState(inject(NotifyService));
  const [ token , setToken] = useState<string | null>(null);
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
    notifyService.getDeviceId().subscribe((token) => {
      setToken(token);
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
    // notifyService.init();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    reset();
  };

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
   (
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
                 {(token && <Alert message={token} type="success" /> )}
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
                {/* <Table
                  pagination={false}
                  rowKey="id"
                  bordered={false}
                  columns={columns}
                  dataSource={
                    elHook.componentState.rsList?.data?.elements || []
                  }
                /> */}
               
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default Notify;
