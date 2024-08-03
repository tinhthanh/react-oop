import React from "react";
import EmployeeDetailHook from "./employeeDetailHook";
import { Link } from "react-router-dom";
import { AppRouter } from "../../../../../RouterType";
import Avatar from "boring-avatars";

function EmployeeDetail(): React.JSX.Element {
  const elHook = EmployeeDetailHook();

  if (elHook) {
    return (
      <>
        <div className="flex flex-col self-stretch gap-4">
          <div className="flex flex-col pt-5 w-full max-md:max-w-full">
            <div className="flex gap-5 px-5 w-full justify-between">
              <div className="justify-center py-1.5 max-md:max-w-full text-xl font-semibold leading-7 text-gray-800">
                Hồ sơ nhân viên
              </div>
              <div className="flex flex-row gap-0">
                <Link to={AppRouter.recruitmentDetail}>
                  <div className="cursor-pointer flex flex-col flex-1 justify-center items-end px-3 text-sm font-medium leading-5 text-center text-white max-md:max-w-full">
                    <div className="justify-center px-3.5 py-2.5 bg-red-600 rounded-lg">
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
                    <div className="">
                      <Avatar size={120} name="Nguyễn Phương Anh" />
                    </div>
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

          <div className="flex flex-col mx-5 rounded-lg bg-white">
            <div className="border-b border-b-slate-200 p-4">
              <h1 className="font-medium text-sm">Thông tin cá nhân</h1>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-row ">
                <div className="w-1/4">Họ và tên</div>
                <div className="w-3/4 font-medium">Nguyễn Phương Anh</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Giới tính</div>
                <div className="w-3/4 font-medium">Nữ</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Ngày sinh</div>
                <div className="w-3/4 font-medium">08/08/2008</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Nơi sinh</div>
                <div className="w-3/4 font-medium">Đà Lạt</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Tình trạng hôn nhân</div>
                <div className="w-3/4 font-medium">Độc thân</div>
              </div>
              <hr className="border-b border-b-slate-200 border-dashed my-4" />
              <div className="flex flex-row">
                <div className="w-1/4">Quốc gia</div>
                <div className="w-3/4 font-medium">Việt Nam</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Dân tộc</div>
                <div className="w-3/4 font-medium">Kinh</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Tôn giáo</div>
                <div className="w-3/4 font-medium">Thiên Chúa</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Số CMND/CCCD</div>
                <div className="w-3/4 font-medium">0687955868796</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Ngày cấp CMND/CCCD</div>
                <div className="w-3/4 font-medium">08/08/2008</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Nơi cấp CMND/CCCD</div>
                <div className="w-3/4 font-medium">Lâm Đồng</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Số hộ chiếu</div>
                <div className="w-3/4 font-medium">348795654654745</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Ngày cấp hộ chiếu</div>
                <div className="w-3/4 font-medium">12/12/2024</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Nơi cấp hộ chiếu</div>
                <div className="w-3/4 font-medium">Lâm Đồng</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Địa chỉ thường trú</div>
                <div className="w-3/4 font-medium">
                  128 Trần Hưng Đạo, P. Nguyễn Cư Trinh, Q.1, Tp. Hồ Chí Minh
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Địa chỉ tạm trú</div>
                <div className="w-3/4 font-medium">
                  128 Trần Hưng Đạo, P. Nguyễn Cư Trinh, Q.1, Tp. Hồ Chí Minh
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Điện thoại di động</div>
                <div className="w-3/4 font-medium">0989 889 888</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Điện thoại khẩn cấp</div>
                <div className="w-3/4 font-medium">-</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Email cá nhân</div>
                <div className="w-3/4 font-medium">anhnp@gmail.com</div>
              </div>
              <hr className="border-b border-b-slate-200 border-dashed my-4" />
              <div className="flex flex-row">
                <div className="w-1/4">Mã số thuế</div>
                <div className="w-3/4 font-medium">348795654654745</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Số giấy phép lao động</div>
                <div className="w-3/4 font-medium">879565465338</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Ngày hết hạn</div>
                <div className="w-3/4 font-medium">08/08/2024</div>
              </div>
              <hr className="border-b border-b-slate-200 border-dashed my-4" />
              <div className="flex flex-row">
                <div className="w-1/4">Số TK ngân hàng</div>
                <div className="w-3/4 font-medium">0687955868796</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Ngân hàng</div>
                <div className="w-3/4 font-medium">HDBank</div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/4">Chi nhánh</div>
                <div className="w-3/4 font-medium">Nguyễn Đình Chiểu</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-5 rounded-lg bg-white">
            <div className="border-b border-b-slate-200 p-4">
              <h1 className="font-medium text-sm">Thông tin công việc</h1>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-row ">
                <div className="w-1/4">Loại hợp đồng</div>
                <div className="w-3/4 font-medium">Chính thức</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Chức danh hiện tại</div>
                <div className="w-3/4 font-medium">Product Design</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Cấp bậc theo chức danh</div>
                <div className="w-3/4 font-medium">Junior</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Cấp bậc thực tế</div>
                <div className="w-3/4 font-medium">-</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Cấp phúc lợi</div>
                <div className="w-3/4 font-medium">-</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Chức danh kiêm nhiệm</div>
                <div className="w-3/4 font-medium">
                  Giám đốc nhân sự, Front-End Developer
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Ngày vào tập đoàn</div>
                <div className="w-3/4 font-medium">08/08/2024</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Ngày vào công ty</div>
                <div className="w-3/4 font-medium">10/08/2024</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Email công ty</div>
                <div className="w-3/4 font-medium">anh.np@galaxy.com</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Ban / Chuỗi / Khối</div>
                <div className="w-3/4 font-medium">Ban</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Cơ sở / Phòng TW</div>
                <div className="w-3/4 font-medium">Cơ sở</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Bộ phận</div>
                <div className="w-3/4 font-medium">Bộ phận</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Vùng</div>
                <div className="w-3/4 font-medium">Vùng</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Máy lẻ</div>
                <div className="w-3/4 font-medium">-</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-1/4">Địa điểm làm việc</div>
                <div className="w-3/4 font-medium">
                  192 Nguyễn Đình Chiểu, P. Đa Kao, Q. 1, Tp Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-5 rounded-lg bg-white">
            <div className="border-b border-b-slate-200 p-4">
              <h1 className="font-medium text-sm">
                Bằng cấp chứng chỉ chuyên môn
              </h1>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <h2 className="font-medium text-sm">Front-End Developer</h2>
                <div className="flex flex-row ">
                  <div className="w-1/4">Trường</div>
                  <div className="w-3/4 font-medium">ĐH Khoa học tự nhiên</div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-1/4">Xếp loại</div>
                  <div className="w-3/4 font-medium">
                    <span className="bg-yellow-100 text-yellow-700 rounded-3xl text-sm px-3 py-1">
                      Khá
                    </span>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-1/4">Thời gian đào tạo</div>
                  <div className="w-3/4 font-medium">
                    từ 28/08/2015 đến 09/08/2019
                  </div>
                </div>
              </div>
              <hr className="border-b border-b-slate-200 border-dashed my-4" />
              <div className="flex flex-col gap-2">
                <h2 className="font-medium text-sm">Quản lý dự án</h2>
                <div className="flex flex-row ">
                  <div className="w-1/4">Trường</div>
                  <div className="w-3/4 font-medium">Trung tâm PMP</div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-1/4">Xếp loại</div>
                  <div className="w-3/4 font-medium">
                    <span className="bg-green-100 text-green-700 rounded-3xl text-sm px-3 py-1">
                      Giỏi
                    </span>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-1/4">Thời gian đào tạo</div>
                  <div className="w-3/4 font-medium">
                    từ 28/08/2015 đến 09/08/2019
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-5 rounded-lg bg-white">
            <div className="border-b border-b-slate-200 p-4">
              <h1 className="font-medium text-sm">Quan hệ nhân thân</h1>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <h2 className="font-medium text-sm">Nguyễn Thanh Trúc</h2>
                <div className="flex flex-row ">
                  <div className="w-1/4">Mối quan hệ</div>
                  <div className="w-3/4 font-medium">Mẹ</div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-1/4">Ngày sinh</div>
                  <div className="w-3/4 font-medium">09/08/1988</div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-1/4">Mã số thuế NPT</div>
                  <div className="w-3/4 font-medium">0894586760</div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-1/4">Giảm / trừ</div>
                  <div className="w-3/4 font-medium">4.400.000đ</div>
                </div>
                <div className="flex flex-row ">
                  <div className="w-1/4">Hiệu lực giảm trừ</div>
                  <div className="w-3/4 font-medium">23/07/2024</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-5 mb-5 rounded-lg bg-white">
            <div className="border-b border-b-slate-200 p-4">
              <h1 className="font-medium text-sm">Cập nhật lần cuối</h1>
            </div>
            <div className="p-4 flex flex-row justify-between">
              <div className="flex flex-row justify-center items-center gap-2">
                <div>
                  <Avatar size={24} name="Nguyễn Bích Trâm" />
                </div>
                <div>Nguyễn Bích Trâm</div>
              </div>
              <div className="text-slate-400">23:28 24/04/2024</div>
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
