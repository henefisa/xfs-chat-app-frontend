import * as React from "react";
import { Form } from "antd";
import Button from "@common/Button/Button";
import Input from "@common/Input/Input";
import InputPassword from "@common/Input/InputPassword";
import Title from "@common/Title/Title";
import Card from "@common/Card/Card";

import "./Login.scss";

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
