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
  const [registerForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const typingTimeoutRef = React.useRef<NodeJS.Timeout>();

  const handleFinish = (values: IFormFields) => {
    register(values, dispatch, navigate);
  };

  const handleUserExist = async (fieldName: string, value: string) => {
    let isExist = false;
    switch (fieldName) {
      case 'password': {
        return;
      }
      case 'email': {
        console.log(23);

        isExist = await checkEmailExist(value);
        break;
      }
      case 'username': {
        console.log(123);

        isExist = await checkUsernameExist(value);

        break;
      }
      default: {
        throw new Error('Error');
      }
    }

    if (isExist) {
      registerForm.setFields([
        {
          name: fieldName,
          errors: [
            `${
              fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
            } already exist!`,
          ],
        },
      ]);
    }
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
          <Form
            onFinish={handleFinish}
            form={registerForm}
            onFieldsChange={(changedFields) => {
              if (changedFields[0].value) {
                if (typingTimeoutRef.current) {
                  clearTimeout(typingTimeoutRef.current);
                }

                typingTimeoutRef.current = setTimeout(() => {
                  handleUserExist(
                    changedFields[0].name.toString(),
                    changedFields[0].value
                  );
                }, 700);
              }
            }}
          >
            <Form.Item
              name="email"
              label="Email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  type: 'email',
                  message: 'Invalid email!',
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
