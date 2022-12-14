import { HeartFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import Button from '@common/Button/Button';
import Card from '@common/Card/Card';
import Logo from '@common/Logo/Logo';
import Title from '@common/Title/Title';
import CheckboxRemember from '@modules/CheckboxCustom/CheckboxRemember';
import Language from '@modules/Language/Language';
import WrapperInput from '@modules/WrapperInput/WrapperInput';

import { Form } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from 'src/services/authService';
import { selectisFetchingLogin } from 'src/store/authSlice';
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

  const isLoading = useAppSelector(selectisFetchingLogin);

  React.useEffect(() => {
    const handleLoginWhenRemember = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) return;

      try {
        const isActivated: boolean = await authService.checkUserActivate(t);

        if (!isActivated) {
          navigate('/verify-account');
          return;
        }

        navigate('/dashboard');
      } catch (err) {
        // do something
      }
    };

    handleLoginWhenRemember();
  }, []);

  const handleFinish = React.useCallback((values: IFormFields) => {
    const { isRemember, ...user } = values;

    authService.login(user, isRemember, dispatch, navigate, t);
  }, []);

  const debounceLogin = React.useMemo(() => {
    return debounce(handleFinish, 700);
  }, []);

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
          <Form onFinish={debounceLogin}>
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
              <CheckboxRemember label={t('remember-label')} />
            </Form.Item>
            <Form.Item className="button-item">
              <Button
                htmlType="submit"
                type="primary"
                className="login-button"
                loading={isLoading}
              >
                {t('title')}
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
