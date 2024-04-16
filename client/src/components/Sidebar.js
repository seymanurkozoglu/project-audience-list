import React, { useState, useEffect } from "react";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { Menu, Image } from "antd";
import classNames from "classnames";

export default function Sidebar() {

  function getItem(label, icon) {
    return {
      icon,
      label,
    };
  }

  const items = [
    getItem(
      "Dashboard",
      <Image src="/image/menu/dashboard.svg" preview={false} />
    ),
    getItem(
      "Campaign",
      <Image src="/image/menu/campaign.svg" preview={false} />
    ),
    getItem(
      "Audience",
      <Image src="/image/menu/audience.svg" preview={false} />
    ),
    getItem("Flows", <Image src="/image/menu/flows.svg" preview={false} />),
    getItem("Content", <Image src="/image/menu/content.svg" preview={false} />),
    getItem(
      "Settings",
      <Image src="/image/menu/settings.svg" preview={false} />
    ),
  ];


  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sidebarClass = classNames({
    sidemobile: isOpen,
    sidebar: !isOpen,
  });


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const btnClass = classNames({
    btn: true,
    open: isOpen,
    close: !isOpen,
    "mobile-only": isMobile,
    sidebar : true
  });

  return (
    <div>
      <Button
        className="mobile-menu"
        icon={<MenuOutlined />}
        onClick={() => toggleOpen()}
      />

      <div className={btnClass}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <a href="">
              <Image src="/image/logo.svg" preview={false} />
            </a>
          </div>
          <div className="sidebar-search">
            <Input
              size="large"
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="sidebar-menu">
            <h6 className="title">Menü</h6>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              items={items}
            />
          </div>
        </div>
        <div className="sidebar-bottom">
          <Button type="primary" icon={<Image src="/image/logout.svg" />}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
