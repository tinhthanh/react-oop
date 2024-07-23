import React from "react";
import { Menu } from "antd";
import type { MenuProps } from 'antd';
import "./LeftBar.scss";
import { useLayoutContext } from "../../contexts/LayoutContext";

type MenuItem = Required<MenuProps>['items'][number];

interface LeftBarProps {
  items: MenuItem[];
  onMenuClick: MenuProps['onClick'];
}

const LeftBar: React.FC<LeftBarProps> = ({ items, onMenuClick }) => {
  const { activeMenuItem } = useLayoutContext();
  return (
      <Menu
      className="custom-menu"
      onClick={onMenuClick}
      selectedKeys={activeMenuItem}
      mode="inline"
      items={items}
     />
  );
};

export default LeftBar;
