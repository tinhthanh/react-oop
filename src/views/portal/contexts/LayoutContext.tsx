import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  activeMenuItem: string[];
  setActiveMenuItem: (value: string[]) => void;
  setBreadcrumb: (value: BreadcrumbItemType[]) => void;
  breadcrumb: BreadcrumbItemType[];
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps): React.JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState([""]);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemType[]>([]);

  return (
    <>
      <LayoutContext.Provider
        value={{ collapsed, setCollapsed, activeMenuItem, setActiveMenuItem ,breadcrumb, setBreadcrumb}}
      >
        {children}
      </LayoutContext.Provider>
    </>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};
