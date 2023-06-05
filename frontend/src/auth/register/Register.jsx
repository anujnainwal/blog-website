import React from "react";
import { Button, Col, Row, Typography, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./assets/css/register.css";
import BgImage from "../../assets/images/common.png";
import { registerUser } from "../../fetures/slices/user/userThunk";
import Alerts from "../../alert/Alerts";
import MessageResponse from "../../message/MessageResponse";
const Register = () => {
  let navigate = useNavigate();
  const { Title } = Typography;
  let dispatch = useDispatch();
  let user = useSelector((state) => state.auth);

  console.log(user);
  let onFinishFailed = async (value) => {
    // return dispatch(userError(value));
  };
  let onFinish = async (value) => {
    dispatch(registerUser(value));
    if (user.loading === false) {
      MessageResponse({ type: "success", content: user.userInfo.message });
      localStorage.setItem("userInfo", JSON.stringify(user.userInfo.userInfo));
      navigate("/");
    }
  };

  return (
    <Row className="loginContainer">
      <Col xs={24} sm={24} md={12} lg={12} className="leftPanel">
        <br />
        {user.error === true && (
          <Alerts type="error" message={user.errorMessage} />
        )}
        <div className="topHeader">
          <NavLink to="/">
            <Button className="border-none bg-slate-600 m-5 text-white">
              Home
            </Button>
          </NavLink>
        </div>
        <section className="login__container">
          <Title level={2} style={{ color: "#fff", textAlign: "center" }}>
            Register
          </Title>
          <p className="text-sm text-center text-white">
            Register into your account for full access
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label={<span className="text-white me-1">Firstname</span>}
              name="firstname"
              rules={[
                {
                  required: true,
                  min: 4,
                  max: 50,
                },
              ]}
              hasFeedback
            >
              <Input type="text" placeholder="Enter your firstname" />
            </Form.Item>
            <Form.Item
              label={<span className="text-white me-1">Lastname</span>}
              name="lastname"
              rules={[
                {
                  required: true,
                  min: 4,
                  max: 50,
                },
              ]}
              hasFeedback
            >
              <Input type="text" placeholder="Enter your lastname" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white me-1">Email</span>}
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<span className="text-white me-1">Password</span>}
              name="password"
              rules={[
                {
                  required: true,
                  min: 8,
                  max: 50,
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <div className="text-center ">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-100 mt-2 bg-blue-500"
                loading={user.loading ? true : false}
                disabled={user.loading ? true : false}
              >
                Register
              </Button>
            </div>
            <p className="text-sm text-center mt-2 text-white ">
              Already have an Account?
              <NavLink to="/login" className="text-amber-400">
                Login
              </NavLink>
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

export default Register;
