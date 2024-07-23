import React from "react";
import { Link } from "react-router-dom";
import { AppRouter } from "../../../../../RouterType";
import { Controller, SubmitHandler } from "react-hook-form";
import CKEditorInput from "../../../forms/fields/CKEditorInput";
import SelectInline from "../../../forms/fields/SelectInline";
import UploadThumbnails from "../../../forms/fields/UploadThumbnails";
import NewsDetailHook from "./NewsDetailHook";
import { News } from "../../../services/news.service";

function NewsDetail(): React.JSX.Element {
  const elHook = NewsDetailHook();
  const form = elHook.form;

  const onSubmit: SubmitHandler<News> = (data) => {
    elHook.onSubmit(data);
  };
  return elHook &&(
    <div className=" bg-neutral-100 flex flex-col px-6 max-md:px-5 pt-6 pb-20">
      <div className="flex flex-col self-stretch">
        <div className="flex flex-col  w-full text-xl font-semibold leading-7 text-gray-800 max-md:max-w-full">
          <div className="flex flex-col justify-center items-start w-full max-md:max-w-full">
            <div className="justify-center py-1.5 max-md:max-w-full">
              Tạo tin tức sự kiện
            </div>
          </div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col py-5 w-full max-md:max-w-full">
          <div className="flex flex-col max-md:max-w-full">
            <div className="flex flex-col justify-center items-start p-5 text-base font-semibold leading-6 text-gray-800 bg-white rounded-t-lg border-b border-gray-200 border-solid max-md:max-w-full">
              <div className="justify-center">Thông tin chung </div>
            </div>
            <div className="flex flex-col justify-center p-5 bg-white rounded-b-lg max-md:max-w-full">
              <div className="flex flex-col pb-5 max-md:max-w-full">
                <div className="flex flex-col max-md:max-w-full">
                  <div className="flex gap-0 max-md:flex-wrap">
                    <div className="text-sm font-medium leading-5 text-gray-800">
                      Tiêu đề
                    </div>
                    <div className="my-auto text-xs font-semibold leading-4 text-red-600 max-md:max-w-full">
                      *
                    </div>
                  </div>
                  <Controller
                    name="title"
                    control={form.control}
                    rules={{ required: 'Trường này là bắt buộc' }}
                    render={({ field ,fieldState}) => (
                      <>
                      <input {...field} className="justify-center py-2.5 pr-2 pl-3 mt-2 text-sm leading-5 text-gray-800 bg-white rounded-lg border border-gray-300 border-solid max-md:max-w-full" />
                        {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col pb-5 mt-1 max-md:max-w-full">
                <div className="flex flex-col max-md:max-w-full">
                  <div className="flex gap-0 max-md:flex-wrap">
                    <div className="text-sm font-medium leading-5 text-gray-800">
                      Nội dung
                    </div>
                    <div className="my-auto text-xs font-semibold leading-4 text-red-600 max-md:max-w-full">
                      *
                    </div>
                  </div>
                  <div className="flex flex-col mt-2 max-md:max-w-full">
                    <Controller
                      rules={{ required: 'Trường này là bắt buộc' }}
                      name="content"
                      control={form.control}
                      defaultValue="" // Thêm defaultValue để tránh cảnh báo
                      render={({ field ,fieldState}) => (
                        <>
                        <CKEditorInput value={field.value} onChange={field.onChange} />
                         {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col pb-5 mt-1 max-md:max-w-full">
                <Controller
                  name="categoryId"
                  rules={{ required: 'Trường này là bắt buộc' }}
                  control={form.control}
                  render={({ field,fieldState }) => (
                    <>
                     <SelectInline
                      title={"Loại bản tin"}
                      required={true}
                      items={(elHook.componentState.catagoryList.map( 
                        (it) => ({ title: it.name, value: it.id })))}
                      value={field.value}
                      onChange={field.onChange}
                    />
                     {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col justify-center mt-1 max-md:max-w-full">
                <div className="w-full border border-dashed border-zinc-200 stroke-[1px] stroke-zinc-200 max-md:max-w-full" >
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
            <button onClick={ () =>form.setValue('status', 2) } type="submit" className="justify-center px-3.5 py-2.5 text-sm font-medium leading-5 text-center text-gray-700 bg-white rounded-lg border border-gray-200 border-solid">
              Lưu nháp
            </button>
            <div className="flex flex-col justify-center py-2">
              <div className="shrink-0 h-6 bg-gray-200 rounded-3xl" />
            </div>
            <Link to={AppRouter.news}>
              <button type="button" className="cursor-pointer justify-center px-3.5 py-2.5 text-sm font-medium leading-5 text-center text-gray-700 whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid">
                Huỷ
              </button>
            </Link>
            <button onClick={ () => form.setValue('status', 1) } type="submit" className="justify-center px-3.5 py-2.5 text-sm font-medium leading-5 text-center text-white bg-blue-800 rounded-lg">
              Đăng bài
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsDetail;