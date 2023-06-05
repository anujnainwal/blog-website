import React, { useEffect, useState } from "react";
import { Avatar, Button, Drawer, Dropdown, Layout, Space, Switch } from "antd";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";

import { NavLink, useNavigate } from "react-router-dom";
import "./asset/css/style.css";
let { Header } = Layout;
const token = localStorage.getItem("accessToken");
const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

const Navbar = () => {
  let [showDrawer, setShowDrawer] = useState(false);
  let navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    // localStorage.clear();
    navigate("/login");
  };

  const items = [
    {
      label: <a href="https://www.antgroup.com">Profile</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">Change Password</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <Button onClick={handleLogout}>Logout</Button>,
      key: "3",
    },
  ];

  return (
    <React.Fragment>
      <Layout>
        <Header className="bg-white d-flex justify-center align-middle overflow-hidden">
          <div
            className="logo flex content-center justify-between items-center "
            style={{ height: "inherit" }}
          >
            <NavLink to={"/"} className="flex content-center items-center ">
              <div className="flex content-center items-center ">
                <span className="text-base mx-2 navbar_custom hover:textc">
                  Blogs
                </span>
              </div>
            </NavLink>
            <div>
              <AiOutlineMenu
                cursor="pointer"
                className="handburger"
                fontSize={20}
                onClick={() => setShowDrawer(true)}
              />
              {showDrawer && (
                <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
                  <ul className="flex flex-col">
                    <li className="me-5">
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="me-5">
                      <NavLink to="/about">About</NavLink>
                    </li>
                    <li className="me-5">
                      <NavLink to="/contact">Contact</NavLink>
                    </li>
                    {isLoggedIn ? (
                      <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                        className="me-3 mb-2"
                      >
                        <NavLink onClick={(e) => e.preventDefault()}>
                          <Space>
                            <Avatar
                              shape="square"
                              size={40}
                              src={"https://i.redd.it/emgudeta7e161.jpg"}
                              icon={<AiOutlineUser />}
                            />
                          </Space>
                        </NavLink>
                      </Dropdown>
                    ) : (
                      <>
                        <li className="me-5">
                          <NavLink to="/login">Login</NavLink>
                        </li>
                        <li className="me-5">
                          <NavLink to="/register">Register</NavLink>
                        </li>
                      </>
                    )}
                    <li>
                      <Switch
                        // checkedChildren={<CheckOutlined />}
                        // unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                      />
                    </li>
                  </ul>
                </Drawer>
              )}

              <ul className="flex right_navbar">
                <li className="me-5">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="me-5">
                  <NavLink to="/about">About</NavLink>
                </li>
                <li className="me-5">
                  <NavLink to="/contact">Contact</NavLink>
                </li>
                {isLoggedIn ? (
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                    className="me-3 mb-2"
                  >
                    <NavLink onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Avatar
                          shape="square"
                          size={40}
                          src={"https://i.redd.it/emgudeta7e161.jpg"}
                          icon={<AiOutlineUser />}
                        />
                      </Space>
                    </NavLink>
                  </Dropdown>
                ) : (
                  <>
                    <li className="me-5">
                      <NavLink to="/login">Login</NavLink>
                    </li>
                    <li className="me-5">
                      <NavLink to="/register">Register</NavLink>
                    </li>
                  </>
                )}
                <li>
                  <Switch
                    // checkedChildren={<CheckOutlined />}
                    // unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                  />
                </li>
              </ul>
            </div>
          </div>
        </Header>
      </Layout>
    </React.Fragment>
  );
};

export default Navbar;
