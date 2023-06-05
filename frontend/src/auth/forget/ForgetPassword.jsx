import React from "react";
import { Button, Col, Row, Typography, Form, Input, } from "antd";
import { NavLink } from "react-router-dom";
import BgImage from '../../assets/images/common.png'

const ForgetPassword = () => {
  const { Title } = Typography;

  return (
    <Row className="loginContainer">
      <Col xs={24} sm={24} md={12} lg={12} className="leftPanel">
        <div className="topHeader">
          <NavLink to="/">
            <Button className="border-none bg-slate-600 m-5 text-white">
              Home
            </Button>
          </NavLink>
        </div>
        <section className="login__container">
          <Title level={2} style={{ color: "#fff", textAlign: "center" }}>
            Forget Password
          </Title>
          <p className="text-sm text-center text-white">
            Forget Password lorem
          </p>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            className="mt-3"
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Form.Item
              label={<span className="text-white me-1">Email</span>}
              name="username"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your email address." />
            </Form.Item>



            <div className="text-center ">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-100 mt-2 bg-blue-500"
              >
              Send Link
              </Button>
            </div>
            <p className="text-sm text-center mt-2 text-white ">
              Back to
              <NavLink to="/login" className='text-amber-400'>Login</NavLink>
            </p>
          </Form>
        </section>
      </Col>
      <Col xs={0} md={12} lg={12} className="rightPanel">
        <img src={BgImage} alt="bgImage" />
      </Col>
    </Row>
  );
};

export default ForgetPassword;
