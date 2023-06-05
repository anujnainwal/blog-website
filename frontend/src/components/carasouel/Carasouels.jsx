import React from "react";
import { Carousel } from "antd";

const Carasouels = ({ children }) => {
  return <Carousel autoplay>{children}</Carousel>;
};

export default Carasouels;
