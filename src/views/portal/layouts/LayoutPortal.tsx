import React, { useEffect, useState } from "react";
import LeftBar from "./LeftBar/LeftBar";
import { Outlet, useNavigate } from "react-router-dom";
import { LayoutProvider, useLayoutContext } from "../contexts/LayoutContext";
import { Layout, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { AppRouter } from "../../../RouterType";
import TopBar from "./TopBar/TopBar";
import { Toaster } from 'sonner';

type MenuItem = Required<MenuProps>['items'][number];

const menu = [
  {
    key: 'sub2',
    label: 'Marketing',
    icon: (
      <img
        loading="lazy"
         src="/assets/portal/menu/icon2.svg"
        style={{ width: 20 }}
        alt="Icon"
      />
    ),
    children: [
      { key: AppRouter.news, label: 'Tin tức và sự kiện' },
      { key: AppRouter.banner, label: 'Banner' },
      { key: 'themes', label: 'Themes',  disabled: true },
      { key: 'notification', label: 'Notification' ,  disabled: true },
      { key: 'version', label: 'Version' ,  disabled: true  },
    ],
  },
  {
    key: 'sub1',
    label: 'Nhân sự',
    icon: (
      <img
        loading="lazy"
        src="/assets/portal/menu/icon1.svg"
        style={{ width: 20 }}
        alt="Icon"
      />
    ),
    children: [
      {
        key: AppRouter.recruitment,
        label: 'Tuyển dụng',
      },
      {
        key: AppRouter.employee,
        label: 'Nhân viên',
      },
      {
        key: 'contract',
        label: 'Ký hợp đồng',
        disabled: true
      },
    ],
  },
  {
    key: 'sub3',
    label: 'Management',
    icon: (
      <img
        loading="lazy"
         src="/assets/portal/menu/icon2.svg"
        style={{ width: 20 }}
        alt="Icon"
      />
    ),
    children: [
      {
        key: AppRouter.browserTasks,
        label: 'Browser Tasks',
      },
    ],
  }
];

export function LayoutPortal(): React.JSX.Element {
  const { collapsed, setCollapsed , setActiveMenuItem} = useLayoutContext();
  const navigate = useNavigate();
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key); // Điều hướng đến trang tương ứng
    setActiveMenuItem([e.key]);
  };
  const [menuItems, setMenuItems] = useState<MenuItem[]>([{
    key: 'version-info',
    label: 'version 2.0.0',
    disabled: true,
  }]);

  async function getProfile() {
    setMenuItems(menu);
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
     <Layout style={{ minHeight: '100vh' }}>
      <Sider width={230} theme="light"  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="p-2 flex items-center justify-center" >
         LOGO
        </div>
        <LeftBar items={menuItems} onMenuClick={handleMenuClick} />
      </Sider>
      <Layout >
          <TopBar/>
          <Outlet />
      </Layout>
      <Toaster position="top-right" closeButton richColors />
    </Layout>
    </>
  );
}

const LayoutPortalWithProvider = () => (
  <LayoutProvider>
    <LayoutPortal />
  </LayoutProvider>
);
export default LayoutPortalWithProvider;
