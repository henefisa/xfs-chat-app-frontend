import * as React from 'react';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import Button from '@common/Button/Button';
import Input from '@common/Input/Input';
import InputPassword from '@common/Input/InputPassword';
import InputCheckbox from '@common/Input/InputCheckbox';
import Title from '@common/Title/Title';
import Card from '@common/Card/Card';
import LoginInput from '../../components/modules/LoginInput/LoginInput';
import { UserOutlined, LockOutlined, HeartFilled } from '@ant-design/icons';
import logo from '/images/logos/light-logo.png';

import './Login.scss';

interface IFormFields {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const handleFinish = (values: IFormFields) => {
    console.log(values);
  };

  return (
    <div className='login-page'>
      <div className='logo'>
        <img src={logo} alt='Chat App Logo' />
      </div>
      <Title className='heading' level={4}>
        Sign in
      </Title>
      <Title className='sub-heading' level={5}>
        Sign in to continue to Chatvia.
      </Title>
      <Card>
        <div className='form-container'>
          <Form onFinish={handleFinish}>
            <Form.Item
              name='username'
              label='Username'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Please Enter Your Username' }]}
            >
              <LoginInput
                PrefixIcon={UserOutlined}
                SuffixInput={Input}
                className='input-username'
                placeholder='Enter email'
                inputDefaultValue='admin@themesbrand.com'
              />
            </Form.Item>
            <div className='wrapper-password'>
              <Link className='login-form-forgot-link' to='/forgot-password'>
                Forgot password?
              </Link>
              <Form.Item
                name='password'
                label='Password'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'Please Enter Your Password' }]}
              >
                <LoginInput
                  PrefixIcon={LockOutlined}
                  SuffixInput={InputPassword}
                  placeholder='Enter Password'
                  inputDefaultValue='admin123'
                />
              </Form.Item>
            </div>
            <Form.Item>
              <InputCheckbox label='Remember me' />
            </Form.Item>
            <Form.Item className='wrapper-button-login'>
              <Button htmlType='submit' type='primary' className='login-button'>
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>

      <div className='form-footer'>
        <Title className='footer-ask-account' level={5}>
          Don't have an account ?{' '}
          <Link to='/register' className='register-link'>
            Signup now
          </Link>
        </Title>
        <Title className='footer-author' level={5}>
          © 2022 Chatvia. Crafted with <HeartFilled className='heart-icon' /> by Themesbrand
        </Title>
      </div>
    </div>
  );
};

export default LoginPage;
