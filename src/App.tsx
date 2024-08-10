import React, { useEffect } from "react";
import "./App.scss";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import NewsList  from "./views/portal/pages/news/NewsList/NewsList";
import { ProtectedRoute } from "./AppProtectedRoute";
import Banner from "./views/portal/pages/banner/banner";
import { BannerCrud } from "./views/portal/pages/banner-crud/banner-curd";
import NewsDetail from "./views/portal/pages/news/NewsDetail/NewsDetail";
import { RecruitmentList } from "./views/portal/pages/recruitment/recruitment/RecruitmentList";
import RecruitmentDetail from "./views/portal/pages/recruitment/recruitmentDetail/RecruitmentDetail";
import { AppRouter } from "./RouterType";
import LayoutPortalWithProvider from "./views/portal/layouts/LayoutPortal";
import requestPermission from "./request-permission";
import listenForMessages from "./listen-for-messages";
import { EmployeeList } from "./views/portal/pages/employee/employee/employeeList";
import EmployeeDetail from "./views/portal/pages/employee/employeeDetail/employeeDetail";
import BrowserTaskList from "./views/portal/pages/browser-tasks/browserTaskList";
import BrowserTask from "./views/portal/pages/browserTask/browserTask";

function App(): React.JSX.Element {
  useEffect(() => {
    requestPermission();
    listenForMessages();
  }, []);
  const router = createBrowserRouter([
    {
      path: AppRouter.noMatch,
      element: <Navigate to={AppRouter.default} replace />,
    },
    {
      path: AppRouter.default,
      element: <Navigate to={AppRouter.home} replace />,
    },
    {
      path: AppRouter.home,
      element: (
        <ProtectedRoute>
          <LayoutPortalWithProvider />
        </ProtectedRoute>
      ),
      children: [
        {
          path: AppRouter.news,
          element: <NewsList />,
        },
        {
          path: AppRouter.newsDetail,
          element: <NewsDetail />,
        },
        {
          path: AppRouter.newsDetail + `/:id`,
          element: <NewsDetail />,
        },
        {
          path: AppRouter.newsView + `/:id`,
          element: <NewsDetail />,
        },
        {
          path: AppRouter.banner,
          element: <Banner />,
        },
        {
          path: AppRouter.bannerCurd,
          element: <BannerCrud />,
        },
        {
          path: AppRouter.bannerCurd + "/:id",
          element: <BannerCrud />,
        },
        {
          path: AppRouter.recruitment,
          element: <RecruitmentList />,
        },
        {
          path: AppRouter.recruitmentDetail + `/:id`,
          element: <RecruitmentDetail />,
        },
        {
          path: AppRouter.recruitmentDetail,
          element: <RecruitmentDetail />,
        },
        {
          path: AppRouter.employee,
          element: <EmployeeList />,
        },
        {
          path: AppRouter.employeeDetail,
          element: <EmployeeDetail />,
        },
        {
          path: AppRouter.browserTasks,
          element: <BrowserTaskList />,
        },
        {
          path: AppRouter.browserTasks + "/:id",
          element: <BrowserTask />,
        },
      ],
    }
  ]);


  useEffect(() => {
    window.parent.document.title = import.meta.env.VITE_APP_TITLE;
    // console.warn(import.meta.env.VITE_APP_REALM);
    // console.log(import.meta.env.VITE_APP_ENV);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
