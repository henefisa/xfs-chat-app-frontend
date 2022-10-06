import * as React from 'react';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  HeartFilled,
} from '@ant-design/icons';
import Card from '@common/Card/Card';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import WrapperInput from '@modules/WrapperInput/WrapperInput';

import './Register.scss';

interface IFormFields {
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const handleFinish = (values: IFormFields) => {
    console.log(values);
  };

  return (
    <div className="register-page">
      <div className="register-page__logo">
        <img src="/images/logos/light-logo.png" alt="Chat App Logo" />
      </div>
      <Title className="register-page__heading" level={4}>
        Sign up
      </Title>
      <Title className="register-page__sub-heading" level={5}>
        Get your Chatvia account now.
      </Title>
      <Card>
        <div className="register-page__form-container">
          <Form onFinish={handleFinish}>
            <Form.Item
              name="email"
              label="Email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  type: 'email',
                  message: 'Enter proper email!',
                },
                { required: true, message: 'Required!' },
              ]}
            >
              <WrapperInput
                PrefixIcon={MailOutlined}
                inputType="email"
                className="input-email"
                placeholder="Enter email"
              />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Required!' }]}
            >
              <WrapperInput
                PrefixIcon={UserOutlined}
                inputType="text"
                className="input-username"
                placeholder="Enter Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Required!' }]}
            >
              <WrapperInput
                PrefixIcon={LockOutlined}
                inputType="password"
                placeholder="Enter Password"
              />
            </Form.Item>
            <Form.Item className="register-page__form-container__button">
              <Button
                htmlType="submit"
                type="primary"
                className="register-button"
              >
                Sign up
              </Button>
            </Form.Item>
            <div className="register-page__form-container__terms">
              <Title
                className="register-page__form-container__terms-title"
                level={5}
              >
                By registering you agree to the Chatvia{' '}
                <Link
                  to="#"
                  className="register-page__form-container__terms-link"
                >
                  Terms of Use
                </Link>
              </Title>
            </div>
          </Form>
        </div>
      </Card>

      <div className="register-page__footer">
        <Title className="register-page__footer__ask-account" level={5}>
          {/*eslint-disable react/no-unescaped-entities*/}
          Already have an account ?{' '}
          <Link to="/login" className="register-page__footer__login-link">
            Signin
          </Link>
        </Title>
        <Title className="register-page__footer__author" level={5}>
          © 2022 Chatvia. Crafted with{' '}
          <HeartFilled className="register-page__footer__heart-icon" /> by
          Themesbrand
        </Title>
      </div>
    </div>
  );
};

export default Register;
