import React from "react";
import { Link } from "react-router-dom";
import BannerCurdHook from "./bannerCurdHook";
import { AppRouter } from "../../../../RouterType";
import { Controller, SubmitHandler } from "react-hook-form";
import { BannerModel } from "../../services/banner.service";
import { Select } from "antd";
import CustomDatePicker from "../../forms/fields/CustomDatePicker";
import UploadThumbnails from "../../forms/fields/UploadThumbnails";
export const BannerCrud: React.FC = () =>  {
  const elHook = BannerCurdHook();
  const form = elHook.form;

  const onSubmit: SubmitHandler<BannerModel> = (data) => {
    elHook.onSubmit(data);
  };
  
  return (
    elHook && (
      <form onSubmit={form.handleSubmit(onSubmit)} >
      <div className="h-[calc(100vh_-_48px)] overflow-y-auto">
        <div className="BannerCrud bg-neutral-100 flex flex-col px-6 max-md:px-5 pt-6">
        <div className="flex flex-col max-md:max-w-full">
            <div className="flex flex-col justify-center items-start p-5 text-base font-semibold leading-6 text-gray-800 bg-white rounded-t-lg border-b border-gray-200 border-solid max-md:max-w-full">
              <div className="justify-center">Thông tin chung </div>
            </div>
            <div className="flex flex-col justify-center p-5 bg-white rounded-b-lg max-md:max-w-full">
              <div className="flex gap-4 max-md:flex-wrap">
                <div className="flex flex-col flex-1 max-md:max-w-full">
                  <div className="flex gap-1 max-md:flex-wrap">
                    <div className="text-sm font-medium leading-5 text-gray-800">ID khu vực</div>
                    <div className="text-red-600">*</div>
                  </div>
                  <Controller
                    name="areaKey"
                    control={elHook.form.control}
                    rules={{ required: 'Trường này là bắt buộc' }}
                    render={({ field ,fieldState}) => (
                      <>
                       <Select
                       {...field}
                        size="large"
                        className="mt-2 w-full"
                        options={ elHook.componentState.areaList.map((item) => ({ label: item.descript, value: item.key }))}
                 />
                        {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col flex-1 text-stone-900 max-md:max-w-full">
                  <div className="text-sm font-medium leading-5 text-gray-800">Tiêu đề</div>
                  <Controller
                    name="title"
                    control={form.control}
                    defaultValue=""
                    rules={{ required: 'Trường này là bắt buộc' }}
                    render={({ field ,fieldState}) => (
                      <>
                      <input {...field} className="h-[40px] justify-center py-2.5 pr-2 pl-3 mt-2 text-sm leading-5 text-gray-800 bg-white rounded-lg border border-gray-300 border-solid max-md:max-w-full" />
                        {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-4 text-stone-900 max-md:flex-wrap">
                <div className="flex flex-col flex-1 whitespace-nowrap max-md:max-w-full">
                  <div className="text-sm font-medium leading-5 text-gray-800">Mô tả</div>
                  <Controller
                    name="descript"
                    control={form.control}
                    defaultValue=""
                    rules={{ required: 'Trường này là bắt buộc' }}
                    render={({ field ,fieldState}) => (
                      <>
                      <input {...field} className="h-[40px] justify-center py-2.5 pr-2 pl-3 mt-2 text-sm leading-5 text-gray-800 bg-white rounded-lg border border-gray-300 border-solid max-md:max-w-full" />
                        {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-4 max-md:flex-wrap">
                <div className="flex flex-col flex-1 max-md:max-w-full">
                  <div className="flex gap-1 max-md:flex-wrap">
                    <div className="text-sm font-medium leading-5 text-gray-800">Ngày bắt đầu</div>
                    <div className="text-red-600">*</div>
                  </div>
                  <div className="mt-2 flex-1">
                  <Controller
                    name="start"
                    control={elHook.form.control}
                    rules={{ required: 'Trường này là bắt buộc' }}
                    render={({ field ,fieldState}) => (
                       <>
                       <CustomDatePicker {...field} format="YYYY-MM-DDTHH:mm:ss.SSS" onChange={(dateString) => field.onChange(dateString)} />
                         {fieldState.error && (
                           <span className="text-red-600">{fieldState.error.message}</span>
                         )}
                       </>
                    )}
                  />
                  </div>
                </div>

                <div className="flex flex-col flex-1 max-md:max-w-full">
                  <div className="flex gap-1 max-md:flex-wrap">
                    <div className="text-sm font-medium leading-5 text-gray-800">Ngày kết thúc</div>
                    <div className="text-red-600">*</div>
                  </div>
                  <div className="mt-2 ">
                  <Controller
                    name="end"
                    control={elHook.form.control}
                    rules={{ required: 'Trường này là bắt buộc' }}
                    render={({ field ,fieldState}) => (
                       <>
                       <CustomDatePicker {...field} format="YYYY-MM-DDTHH:mm:ss.SSS"  onChange={(dateString) => field.onChange(dateString)} />
                         {fieldState.error && (
                           <span className="text-red-600">{fieldState.error.message}</span>
                         )}
                       </>
                    )}
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 max-md:max-w-full">
            <div className="flex flex-col justify-center items-start p-5 text-base font-semibold leading-6 text-gray-800 bg-white rounded-t-lg border-b border-gray-200 border-solid max-md:max-w-full">
              <div className="justify-center">Hình ảnh</div>
            </div>
            <div className="flex flex-col justify-center p-5 bg-white rounded-b-lg max-md:max-w-full">
              <Controller
                name="image"
                rules={{ required: 'Trường này là bắt buộc' }}
                control={form.control}
                render={({ field ,fieldState}) => (
                  <>
                  <UploadThumbnails title="Ảnh thumbnails"
                    value={field.value}
                    onChange={field.onChange}
                    required={true}
                  />
                   {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end   mt-5 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
            <button onClick={ () =>form.setValue('status', 0) } type="submit" className="justify-center px-3.5 py-2.5 text-sm font-medium leading-5 text-center text-gray-700 bg-white rounded-lg border border-gray-200 border-solid">
              Lưu nháp
            </button>
            <div className="flex flex-col justify-center py-2">
              <div className="shrink-0 h-6 bg-gray-200 rounded-3xl" />
            </div>
            <Link to={AppRouter.banner}>
              <button type="button" className="cursor-pointer justify-center px-3.5 py-2.5 text-sm font-medium leading-5 text-center text-gray-700 whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid">
                Huỷ
              </button>
            </Link>
            <button onClick={ () => form.setValue('status', 1) } type="submit" className="justify-center px-3.5 py-2.5 text-sm font-medium leading-5 text-center text-white bg-blue-800 rounded-lg">
              Đăng bài
            </button>
          </div>
        </div>
      </div>
      </form>
    )
  );
};
