import React from "react";
import RecruitmentDetailHook from "./RecruitmentDetailHook";
import { Controller, SubmitHandler } from "react-hook-form";
import CKEditorInput from "../../../forms/fields/CKEditorInput";
import { Input, Select } from "antd";
import CustomDatePicker from "../../../forms/fields/CustomDatePicker";
import { Link } from "react-router-dom";
import { AppRouter } from "../../../../../RouterType";
import { RecruitmentNewsModel } from "../../../services/recruitmentNews.service";
function RecruitmentDetail(): React.JSX.Element {
  const elHook = RecruitmentDetailHook();
  
  const negotiation = elHook.form.watch('negotiation');
  React.useEffect(() => {
    if (!negotiation) {
      elHook.form.setValue('salaryMin', "");
      elHook.form.setValue('salaryMax', "");
    } 
  }, [negotiation]);

  const onSubmit: SubmitHandler<RecruitmentNewsModel> = (data) => {
      console.log(data);
      elHook.onSubmit(data);
  };
  if (elHook) {
    return (
      <>
      <div className="flex flex-col self-stretch">
    <div className="flex flex-col pt-5 w-full text-xl font-semibold leading-7 text-gray-800 max-md:max-w-full">
      <div className="flex flex-col justify-center items-start px-5 w-full max-md:max-w-full">
        <div className="justify-center py-1.5 max-md:max-w-full">
          Tạo tuyển dụng
        </div>
      </div>
    </div>
    <form onSubmit={elHook.form.handleSubmit(onSubmit)} >
    <div className="flex flex-col px-5 py-5 w-full max-md:max-w-full">
      <div className="flex flex-col max-md:max-w-full">
        <div className="flex flex-col justify-center items-start p-5 text-base font-semibold leading-6 text-gray-800 bg-white rounded-t-lg border-b border-gray-200 border-solid max-md:max-w-full">
          <div className="justify-center">Thông tin công việc</div>
        </div>
        <div className="flex flex-col justify-center p-5 bg-white rounded-b-lg max-md:max-w-full">
          <div className="flex flex-col pb-5 max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="flex gap-0 max-md:flex-wrap">
                <div className="text-sm font-medium leading-5 text-gray-800">
                  Tiêu đề vị trí tuyển dụng
                </div>
                <div className="my-auto text-xs font-semibold leading-4 text-red-600 max-md:max-w-full">
                  *
                </div>
              </div>
            
              <Controller
                    name="title"
                    control={elHook.form.control}
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

          <div className="pb-5 flex flex-col justify-center mt-1 max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="flex gap-0 max-md:flex-wrap">
                <div className="text-sm font-medium leading-5 text-gray-800">
                  Mô tả công việc
                </div>
                <div className="my-auto text-xs font-semibold leading-4 text-red-600 max-md:max-w-full">
                  *
                </div>
              </div>
              <div className="mt-2 ">
              <Controller
                      rules={{ required: 'Trường này là bắt buộc' }}
                      name="jobDescription"
                      control={elHook.form.control}
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

          <div className="pt-2 flex flex-col justify-center mt-1 max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="flex gap-0 max-md:flex-wrap">
                <div className="text-sm font-medium leading-5 text-gray-800">
                  Phúc lợi
                </div>
                <div className="my-auto text-xs font-semibold leading-4 text-red-600 max-md:max-w-full">
                  *
                </div>
              </div>
              <div className="mt-2 ">
              <Controller
                      rules={{ required: 'Trường này là bắt buộc' }}
                      name="benefit"
                      control={elHook.form.control}
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
        </div>
      </div>
      <div className="flex flex-col mt-5 max-md:max-w-full">
        <div className="flex flex-col justify-center items-start p-5 text-base font-semibold leading-6 text-gray-800 bg-white rounded-t-lg border-b border-gray-200 border-solid max-md:max-w-full">
          <div className="justify-center">
            Thông tin công ty và mức lương
          </div>
        </div>
        <div className="flex flex-col justify-center p-5 bg-white rounded-b-lg max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-wrap">
            <div className="flex flex-col flex-1 justify-center self-start max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <div className="flex gap-0 max-md:flex-wrap">
                  <div className="text-sm font-medium leading-5 text-gray-800">
                    Công ty tuyển dụng
                  </div>
                  <div className="my-auto text-xs font-semibold leading-4 text-red-600">
                    *
                  </div>
                </div>
                <div>
                <Controller
                    name="companyId"
                    control={elHook.form.control}
                    rules={{ required: 'Trường này là bắt buộc' }}
                    render={({ field ,fieldState}) => (
                      <>
                       <Select
                       {...field}
                        size="large"
                        className="mt-2 w-full"
                        options={ elHook.componentState.companyList.map((item) => ({ label: item.name, value: item.id }))}
                 />
                        {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 pb-5 max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <div className="flex gap-0 max-md:flex-wrap">
                  <div className="text-sm font-medium leading-5 text-gray-800">
                    Khu vực
                  </div>
                  <div className="my-auto text-xs font-semibold leading-4 text-red-600 max-md:max-w-full">
                    *
                  </div>
                </div>
                <Controller
                    name="locationId"
                    control={elHook.form.control}
                    rules={{ required: 'Trường này là bắt buộc' }}
                    render={({ field, fieldState }) => (
                      <>
                      <Select
                      {...field}
                      size="large"
                      className="mt-2 w-full"
                      options={elHook.componentState.local.map((item) => ({ label: item.name, value: item.id }))}
                      />
                       {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                      </>
                    )}
                  />
                
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-1 max-md:max-w-full">
            <div className="flex gap-0 max-md:flex-wrap">
              <div className="text-sm font-medium leading-5 text-gray-800">
                Mức lương
              </div>
              <div className="my-auto text-xs font-semibold leading-4 text-red-600 max-md:max-w-full">
                *
              </div>
            </div>
            <div className="flex gap-2 pr-20 mt-4 max-md:flex-wrap max-md:pr-5">
            <Controller
                    name="negotiation"
                    control={elHook.form.control}
                    render={({ field }) => (
                      <>  
                      <div>
                      <label className="custom-radio !text-[#1F1F1F] !font-medium">
                        <input
                          type="radio"
                          checked={ field.value === true }
                          onChange={() =>
                            elHook.form.setValue('negotiation', true)
                          }
                          className="mr-2"
                        />
    
                        Thoả thuận
                      </label>
                    </div>
                    <div>
                      <label className="custom-radio !text-[#1F1F1F] !font-medium">
                        <input
                          type="radio"
                          checked={ field.value === false }
                          onChange={() =>
                            elHook.form.setValue('negotiation', false)
                            }
                          className="mr-2 "
                        />
                        Theo khoảng tiền
                      </label>
                    </div>
                      </>
                    )}
                  />
            </div>
            <div className="flex gap-5 mt-1 max-md:flex-wrap">
              {negotiation}
           {negotiation  && (
            <div className="flex flex-1 pt-2 gap-5 whitespace-nowrap max-md:flex-wrap">
              <div className="flex flex-col flex-1 pb-5">
                <div className="flex flex-col">
                  <div className="flex gap-0">
                    <div className="text-sm font-medium leading-5 text-gray-800">
                      Từ
                    </div>
                   
                  </div>
                  <div className="flex gap-2  mt-2 flex-col ">
                  <Controller
                    name="salaryMin"
                    control={elHook.form.control}
                    render={({ field ,fieldState}) => (
                      <>
                      <Input {...field} size="large" />
                        {fieldState.error && (
                          <span className="text-red-600">{fieldState.error.message}</span>
                        )}
                      </>
                    )}
                  />
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 pb-5">
                <div className="flex flex-col">
                  <div className="flex gap-0">
                    <div className="text-sm font-medium leading-5 text-gray-800">
                      Đến
                    </div>
                  
                  </div>
                  <div className="flex gap-2 flex-col  mt-2 ">
                  <Controller
                    name="salaryMax"
                    control={elHook.form.control}
                    render={({ field ,fieldState}) => (
                       <>
                       <Input {...field} size="large"/>
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
           )}
            
          </div>
          </div>
          <div className="flex flex-col justify-center py-5 mt-1 max-md:max-w-full">
            <div className="flex flex-col justify-center max-md:max-w-full">
              <div
                className="w-full border border-dashed border-zinc-200 stroke-[1px] stroke-zinc-200 max-md:max-w-full"
              ></div>
            </div>
          </div>
          <div className="flex gap-5 mt-1 max-md:flex-wrap">
            <div className="flex flex-col flex-1 pb-5 max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <div className="flex gap-0 max-md:flex-wrap mb-2">
                  <div className="text-sm font-medium leading-5 text-gray-800">
                  Ngày hết hạng
                  </div>
                  <div className="my-auto text-xs font-semibold leading-4 text-red-600 max-md:max-w-full">
                    *
                  </div>
                </div>
                <Controller
                    name="endDate"
                    control={elHook.form.control}
                    rules={{ required: 'Trường này là bắt buộc' }}
                    render={({ field ,fieldState}) => (
                       <>
                       <CustomDatePicker {...field} format="DD-MM-YYYY"  onChange={(dateString) => field.onChange(dateString)} />
                         {fieldState.error && (
                           <span className="text-red-600">{fieldState.error.message}</span>
                         )}
                       </>
                    )}
                  />
              </div>
            </div>
            <div className="flex flex-1 gap-5 whitespace-nowrap max-md:flex-wrap"> </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 pl-20 mt-5 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
        <button onClick={ () =>elHook.form.setValue('status', 2) } type="submit" className="justify-center px-3.5 py-2.5 text-sm font-medium leading-5 text-center text-gray-700 bg-white rounded-lg border border-gray-200 border-solid">
          Lưu nháp
        </button>
        <div className="flex flex-col justify-center py-2">
          <div className="shrink-0 h-6 bg-gray-200 rounded-3xl" />
        </div>
        <Link to={AppRouter.recruitment}>
        <button className="justify-center px-3.5 py-2.5 text-sm font-medium leading-5 text-center text-gray-700 whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid">
          Huỷ
        </button>
        </Link>
       
        <button onClick={ () => elHook.form.setValue('status', 1) } type="submit" className="justify-center px-3.5 py-2.5 text-sm font-medium leading-5 text-center text-white bg-blue-600 rounded-lg">
          Đăng tuyển
        </button>
      </div>
    </div>
    </form>
   
  </div>
      </>
    
    );
  } else {
    return <></>;
  }
}

export default RecruitmentDetail;


