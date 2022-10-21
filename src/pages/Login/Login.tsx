import * as React from 'react';
import { Form } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, HeartFilled } from '@ant-design/icons';
import Card from '@common/Card/Card';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import InputCheckbox from '@common/Input/InputCheckbox';
import WrapperInput from '@modules/WrapperInput/WrapperInput';
import { useAppDispatch } from 'src/store/hooks';
import { login } from 'src/services/loginService';

import './Login.scss';

interface IFormFields {
  username: string;
  password: string;
  isRemember: boolean;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFinish = (values: IFormFields) => {
    const { isRemember, ...user } = values;

    const isRememberValue: boolean =
      isRemember === undefined ? false : isRemember;

    login(user, isRememberValue, dispatch, navigate);
  };

  return (
    <div className="login-page">
      <div className="logo">
        <img
          className="logo__img"
          src="/images/logos/logo.svg"
          alt="Chat App Logo"
        />
        <Title className="app-name" level={4}>
          RVK Chat App
        </Title>
      </div>
      <Title className="heading" level={4}>
        Sign in
      </Title>
      <Title className="sub-heading" level={5}>
        Sign in to continue to Chatvia.
      </Title>
      <Card>
        <div className="form-container">
          <Form onFinish={handleFinish}>
            <Form.Item
              name="username"
              label="Username"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Please Enter Your Username' },
              ]}
            >
              <WrapperInput
                PrefixIcon={UserOutlined}
                inputType="text"
                className="input-username"
                placeholder="Enter Your Username"
              />
            </Form.Item>
            <div className="password-item">
              <Link
                to="/forgot-password"
                className="password-item__forgot-link"
              >
                Forgot password?
              </Link>
              <Form.Item
                name="password"
                label="Password"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Please Enter Your Password' },
                ]}
              >
                <WrapperInput
                  PrefixIcon={LockOutlined}
                  inputType="password"
                  placeholder="Enter Your Password"
                />
              </Form.Item>
            </div>
            <Form.Item name="isRemember" valuePropName="checked">
              <InputCheckbox label="Remember me" />
            </Form.Item>
            <Form.Item className="button-item">
              <Button htmlType="submit" type="primary" className="login-button">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>

      <div className="login-page__footer">
        <Title className="ask-account" level={5}>
          {/*eslint-disable react/no-unescaped-entities*/}
          Don't have an account ?{' '}
          <Link to="/register" className="ask-account__register-link">
            Signup now
          </Link>
        </Title>
        <Title className="author" level={5}>
          © 2022 Chat App. Crafted with{' '}
          <HeartFilled className="author__heart-icon" /> by RVK Team
        </Title>
      </div>
    </div>
  );
};

export default LoginPage;
