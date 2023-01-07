import { LockOutlined } from '@ant-design/icons';
import Button from '@common/Button/Button';
import Logo from '@common/Logo/Logo';
import Title from '@common/Title/Title';
import Language from '@modules/Language/Language';
import WrapperInput from '@modules/WrapperInput/WrapperInput';
import { Form } from 'antd';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Author from '@common/Author/Author';
import * as authService from 'src/services/authService';

import './ResetPassword.scss';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation(['reset-password', 'common', 'notification']);
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = React.useState('');
  const [isUpdatePassword, setIsUpdatePassword] = React.useState(false);

  const handleResetPassword = React.useCallback(async () => {
    setIsUpdatePassword(true);
    try {
      const url = `api${location.pathname}${location.search}`;
      await authService.resetPassword(url, password, t, navigate);
      setIsUpdatePassword(false);
    } catch (error) {
      setIsUpdatePassword(false);
    }
  }, [password]);

  return (
    <div className="reset-password">
      <Logo />
      <div className="reset-password__modal">
        <Form onFinish={handleResetPassword}>
          <Title className="modal__heading" level={4}>
            {t('title', { ns: 'reset-password' })}
          </Title>
          <Title className="modal__sub-heading" level={5}>
            {t('sub-title', { ns: 'reset-password' })}
          </Title>
          <Form.Item
            name="email"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: `${t('error-required-message', {
                  ns: 'reset-password',
                })}`,
              },
            ]}
          >
            <WrapperInput
              PrefixIcon={LockOutlined}
              inputType="password"
              className="input-password"
              placeholder={t('input-placeholder', { ns: 'reset-password' })}
              inputOnChange={setPassword}
            />
          </Form.Item>

          <div className="modal__btn">
            <Button className="btn-cancel">
              <Link to="/login">
                {t('btn-cancel', { ns: 'reset-password' })}
              </Link>
            </Button>
            <Button
              className="btn-completed"
              htmlType="submit"
              loading={isUpdatePassword}
            >
              {t('btn-completed', { ns: 'reset-password' })}
            </Button>
          </div>
        </Form>
      </div>

      <div className="forgot-password__footer">
        <Language />
        <Author />
      </div>
    </div>
  );
};

export default ForgotPassword;
