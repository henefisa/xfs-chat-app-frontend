import * as React from "react";
import { Form } from "antd";
import Button from "@common/Button/Button";
import Input from "@common/Input/Input";
import InputPassword from "@common/Input/InputPassword";
import Title from "@common/Title/Title";
import Card from "@common/Card/Card";

import "./Login.scss";
import logo from "../../assets/img/light-logo.png";

interface IFormFields {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const handleFinish = (values: IFormFields) => {
    console.log(values);
  };

  return (
    <div className="login-page">
      <div className="logo">
        <img src={logo} alt="Chat App Logo" />
      </div>
      <Title className="heading" level={4}>
        Sign in
      </Title>
      <Title className="sub-heading" level={5}>
        Sign in to continue to Chatvia.
      </Title>
      <Card>
        <div className="form-container">
          <Title level={1}>Login</Title>
          <Form onFinish={handleFinish}>
            <Form.Item
              name="username"
              label="Username"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Password is required" }]}
            >
              <InputPassword placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" className="login-button">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
