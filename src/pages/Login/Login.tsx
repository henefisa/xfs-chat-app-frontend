import {
  HeartFilled,
  Loading3QuartersOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Button from '@common/Button/Button';
import Card from '@common/Card/Card';
import InputCheckbox from '@common/Input/InputCheckbox';
import Logo from '@common/Logo/Logo';
import Spin from '@common/Spin/Spin';
import Title from '@common/Title/Title';
import WrapperInput from '@modules/WrapperInput/WrapperInput';

import Language from '@modules/Language/Language';
import { Form } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from 'src/services/authService';
import { selectisFetchingRegister } from 'src/store/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import debounce from 'src/utils/debounce';
import { getAccessToken } from 'src/utils/getTokenFromLocal';

import './Login.scss';

interface IFormFields {
  username: string;
  password: string;
  isRemember: boolean;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation(['login', 'common', 'notification']);

  const isLoading = useAppSelector(selectisFetchingRegister);

  React.useEffect(() => {
    const handleLoginWhenRemember = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) return;

      const isActivate: boolean | undefined =
        await authService.checkUserActivate(t);
      if (isActivate === undefined) return;

      if (!isActivate) {
        navigate('/verify-account');
        return;
      }

      navigate('/dashboard');
    };

    handleLoginWhenRemember();
  }, []);

  const debounceClickLogin = React.useMemo(() => {
    return debounce(authService.login, 1000);
  }, []);

  const handleFinish = (values: IFormFields) => {
    const { isRemember, ...user } = values;

    debounceClickLogin(user, isRemember, dispatch, navigate, t);
  };

  return (
    <div className="login-page">
      <Logo />
      <Title className="heading" level={4}>
        {t('title')}
      </Title>
      <Title className="sub-heading" level={5}>
        {t('sub-title')}
      </Title>
      <Card>
        <div className="form-container">
          <Form onFinish={handleFinish}>
            <Form.Item
              name="username"
              label={t('username-label')}
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: `${t('username-error-message')}` },
              ]}
            >
              <WrapperInput
                PrefixIcon={UserOutlined}
                inputType="text"
                className="input-username"
                placeholder={t('username-placeholder')}
              />
            </Form.Item>
            <div className="password-item">
              <Link
                to="/forgot-password"
                className="password-item__forgot-link"
                tabIndex={-1}
              >
                {t('forgot-password')}
              </Link>
              <Form.Item
                name="password"
                label={t('password-label')}
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: `${t('password-error-message')}` },
                ]}
              >
                <WrapperInput
                  PrefixIcon={LockOutlined}
                  inputType="password"
                  placeholder={t('password-placeholder')}
                />
              </Form.Item>
            </div>
            <Form.Item name="isRemember" valuePropName="checked">
              <InputCheckbox label={t('remember-label')} />
            </Form.Item>
            <Form.Item className="button-item">
              <Button htmlType="submit" type="primary" className="login-button">
                {isLoading ? (
                  <Spin
                    className="spinner"
                    spinIcon={
                      <Loading3QuartersOutlined
                        className="spinner__icon"
                        spin
                      />
                    }
                  />
                ) : (
                  t('title')
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>

      <div className="login-page__footer">
        <Language />
        <Title className="ask-account" level={5}>
          {t('ask-acount')}
          <Link to="/register" className="ask-account__register-link">
            {t('link-title')}
          </Link>
        </Title>
        <Title className="author" level={5}>
          {t('author-title')}
          <HeartFilled className="author__heart-icon" />
          {t('author')}
        </Title>
      </div>
    </div>
  );
};

export default LoginPage;
