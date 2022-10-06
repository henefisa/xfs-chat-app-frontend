import * as React from 'react';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined, HeartFilled } from '@ant-design/icons';
import Card from '@common/Card/Card';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import InputCheckbox from '@common/Input/InputCheckbox';
import WrapperInput from '@modules/WrapperInput/WrapperInput';
import { useAppDispatch } from 'src/store/hooks';
import { usernameChange, passwordChange } from 'src/store/userSlice';

import './Login.scss';

interface IFormFields {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const handleFinish = (values: IFormFields) => {
    console.log(values);
  };

  const dispatch = useAppDispatch();

  const handleUsernameChange = (value: string) => {
    dispatch(usernameChange(value));
  };

  const handlePasswordChange = (value: string) => {
    dispatch(passwordChange(value));
  };

  return (
    <div className="login-page">
      <div className="login-page__logo">
        <img src="/images/logos/light-logo.png" alt="Chat App Logo" />
      </div>
      <Title className="login-page__heading" level={4}>
        Sign in
      </Title>
      <Title className="login-page__sub-heading" level={5}>
        Sign in to continue to Chatvia.
      </Title>
      <Card>
        <div className="login-page__form-container">
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
                placeholder="Enter email"
                inputDefaultValue="admin@themesbrand.com"
                inputOnChange={handleUsernameChange}
              />
            </Form.Item>
            <div className="login-page__form-container__password">
              <Link
                to="/forgot-password"
                className="login-page__form-container__password__forgot-link"
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
                  placeholder="Enter Password"
                  inputDefaultValue="admin123"
                  inputOnChange={handlePasswordChange}
                />
              </Form.Item>
            </div>
            <Form.Item>
              <InputCheckbox label="Remember me" />
            </Form.Item>
            <Form.Item className="login-page__form-container__button">
              <Button htmlType="submit" type="primary" className="login-button">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>

      <div className="login-page__footer">
        <Title className="login-page__footer__ask-account" level={5}>
          {/*eslint-disable react/no-unescaped-entities*/}
          Don't have an account ?{' '}
          <Link to="/register" className="login-page__footer__register-link">
            Signup now
          </Link>
        </Title>
        <Title className="login-page__footer__author" level={5}>
          © 2022 Chatvia. Crafted with{' '}
          <HeartFilled className="login-page__footer__heart-icon" /> by
          Themesbrand
        </Title>
      </div>
    </div>
  );
};

export default LoginPage;
