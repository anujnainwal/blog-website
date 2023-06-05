import { Drawer } from "antd";
import React from "react";

const SideDrawer = ({ open, onClose, children, title }) => {
  return (
    <>
      <Drawer title={title} placement="right" onClose={onClose} open={open}>
        {children}
      </Drawer>
    </>
  );
};

export default SideDrawer;
