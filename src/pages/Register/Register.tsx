import {
  HeartFilled,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Button from '@common/Button/Button';
import Card from '@common/Card/Card';
import Title from '@common/Title/Title';
import WrapperInput from '@modules/WrapperInput/WrapperInput';
import { Form } from 'antd';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  checkEmailExist,
  checkUsernameExist,
} from 'src/services/checkUserService';
import { useAppDispatch } from 'src/store/hooks';
import { register } from '../../services/registerService';

import './Register.scss';

interface IFormFields {
  email: string;
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFinish = (values: IFormFields) => {
    register(values, dispatch, navigate);
  };

  return (
    <div className="register-page">
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
        Sign up
      </Title>
      <Title className="sub-heading" level={5}>
        Get your Chatvia account now.
      </Title>
      <Card>
        <div className="form-container">
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
                {
                  validator: async (rule, value) => {
                    let isExist = false;
                    if (value) {
                      isExist = await checkEmailExist(value);
                    }
                    if (isExist) {
                      return Promise.reject('Email is exist!');
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
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
              rules={[
                { required: true, message: 'Required!' },
                {
                  validator: async (rule, value) => {
                    let isExist = false;
                    if (value) {
                      isExist = await checkUsernameExist(value);
                    }
                    if (isExist) {
                      return Promise.reject('Username is exist!');
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
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
            <Form.Item className="button-item">
              <Button
                htmlType="submit"
                type="primary"
                className="register-button"
              >
                Sign up
              </Button>
            </Form.Item>
            <div className="terms-item">
              <Title className="terms-item__title" level={5}>
                By registering you agree to the Chatvia{' '}
                <Link to="#" className="terms-item__link">
                  Terms of Use
                </Link>
              </Title>
            </div>
          </Form>
        </div>
      </Card>

      <div className="register-page__footer">
        <Title className="ask-account" level={5}>
          {/*eslint-disable react/no-unescaped-entities*/}
          Already have an account ?{' '}
          <Link to="/login" className="ask-account__login-link">
            Signin
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

export default Register;
