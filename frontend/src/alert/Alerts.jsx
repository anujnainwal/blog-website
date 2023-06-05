import React from "react";
import { Alert, Space } from "antd";
const Alerts = ({ type, message }) => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Alert message={message} type={type} showIcon closable />
    </Space>
  );
};

export default Alerts;
