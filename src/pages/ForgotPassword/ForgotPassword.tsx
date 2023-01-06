import { MailOutlined } from '@ant-design/icons';
import Button from '@common/Button/Button';
import Logo from '@common/Logo/Logo';
import Title from '@common/Title/Title';
import Language from '@modules/Language/Language';
import WrapperInput from '@modules/WrapperInput/WrapperInput';
import { Form } from 'antd';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Author from '@common/Author/Author';
import * as authService from 'src/services/authService';

import './ForgotPassword.scss';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation(['common', 'forgot-password', 'notification']);

  const [email, setEmail] = React.useState('');
  const [isGettingLinkEmail, setIsGettingLinkEmail] = React.useState(false);

  const handleGetLinkEmail = React.useCallback(async () => {
    setIsGettingLinkEmail(true);
    try {
      await authService.forgotPassword(email, t);
      setIsGettingLinkEmail(false);
    } catch (error) {
      setIsGettingLinkEmail(false);
    }
  }, [email]);

  return (
    <div className="forgot-password">
      <Logo />
      <div className="find-account">
        <Form onFinish={handleGetLinkEmail}>
          <Title className="find-account__heading" level={4}>
            {t('title', { ns: 'forgot-password' })}
          </Title>
          <Title className="find-account__sub-heading" level={5}>
            {t('sub-title', { ns: 'forgot-password' })}
          </Title>
          <Form.Item
            name="email"
            labelCol={{ span: 24 }}
            rules={[
              {
                type: 'email',
                message: `${t('email-error-type-message', {
                  ns: 'forgot-password',
                })}`,
              },
              {
                required: true,
                message: `${t('error-required-message', {
                  ns: 'forgot-password',
                })}`,
              },
            ]}
          >
            <WrapperInput
              PrefixIcon={MailOutlined}
              inputType="email"
              className="input-email"
              placeholder={t('input-placeholder', { ns: 'forgot-password' })}
              inputOnChange={setEmail}
            />
          </Form.Item>

          <div className="find-account__btn">
            <Button className="btn-cancel">
              <Link to="/login">
                {t('btn-cancel', { ns: 'forgot-password' })}
              </Link>
            </Button>
            <Button
              className="btn-search"
              htmlType="submit"
              loading={isGettingLinkEmail}
            >
              {t('btn-search', { ns: 'forgot-password' })}
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
