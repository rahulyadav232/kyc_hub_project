import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider className="sidebar">
      <Menu theme="dark" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Product Details</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/compare">Compare Products</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
