import {
  HeartFilled,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Button from '@common/Button/Button';
import Card from '@common/Card/Card';
import Logo from '@common/Logo/Logo';
import Title from '@common/Title/Title';
import Language from '@modules/Language/Language';
import WrapperInput from '@modules/WrapperInput/WrapperInput';

import { Form } from 'antd';
import {
  FieldData,
  RuleObject,
  ValidateErrorEntity,
} from 'rc-field-form/lib/interface';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from 'src/services/authService';
import { checkEmailExist, checkUsernameExist } from 'src/services/userService';
import { selectisFetchingRegister } from 'src/store/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import debounce from 'src/utils/debounce';

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

  const { t } = useTranslation(['register', 'common', 'notification']);

  const isLoading = useAppSelector(selectisFetchingRegister);

  const debounceClickRegister = React.useMemo(() => {
    return debounce(authService.register, 700);
  }, []);

  const handleFinishFailed = ({ values }: ValidateErrorEntity<IFormFields>) => {
    if (values.email) {
      handleUserExist('email', values.email);
    }

    if (values.username) {
      handleUserExist('username', values.username);
    }
  };

  const debounceOnFinishFaild = React.useMemo(() => {
    return debounce(handleFinishFailed, 700);
  }, []);

  const handleFinish = (values: IFormFields) => {
    debounceClickRegister(values, dispatch, navigate, t);
  };

  const handleUserExist = async (fieldName: string, value: string) => {
    let isExist = false;
    switch (fieldName) {
      case 'password': {
        return;
      }
      case 'email': {
        isExist = await checkEmailExist(value, t);
        break;
      }
      case 'username': {
        isExist = await checkUsernameExist(value, t);

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
            `${t('error-exist-message', {
              first: fieldName.charAt(0).toUpperCase(),
              second: fieldName.slice(1),
            })}`,
          ],
        },
      ]);
    }
  };

  const debounceHandleUserExist = React.useMemo(() => {
    return debounce(handleUserExist, 700);
  }, []);

  const handleFieldChange = (changedFields: FieldData[]) => {
    if (!changedFields[0].value) return;

    debounceHandleUserExist(
      changedFields[0].name.toString(),
      changedFields[0].value
    );
  };

  const handleCheckWhitespace: RuleObject['validator'] = (rule, value) => {
    if (!value) return Promise.reject();

    if (value.split(' ').join('').length === value.length) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(`${t('username-no-whitespace')}`));
  };

  return (
    <div className="register-page">
      <Logo />
      <Title className="heading" level={4}>
        {t('title')}
      </Title>
      <Title className="sub-heading" level={5}>
        {t('sub-title')}
      </Title>
      <Card>
        <div className="form-container">
          <Form
            form={registerForm}
            onFinish={handleFinish}
            onFinishFailed={debounceOnFinishFaild}
            onFieldsChange={handleFieldChange}
          >
            <Form.Item
              name="email"
              label={t('email-label')}
              labelCol={{ span: 24 }}
              rules={[
                {
                  type: 'email',
                  message: `${t('email-error-type-message')}`,
                },
                { required: true, message: `${t('error-required-message')}` },
              ]}
            >
              <WrapperInput
                PrefixIcon={MailOutlined}
                inputType="email"
                className="input-email"
                placeholder={t('email-placeholder')}
              />
            </Form.Item>
            <Form.Item
              name="username"
              label={t('username-label')}
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: `${t('error-required-message')}` },
                {
                  validator: handleCheckWhitespace,
                },
              ]}
            >
              <WrapperInput
                PrefixIcon={UserOutlined}
                inputType="text"
                className="input-username"
                placeholder={t('username-placeholder')}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={t('password-label')}
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: `${t('error-required-message')}` },
              ]}
            >
              <WrapperInput
                PrefixIcon={LockOutlined}
                inputType="password"
                placeholder={t('password-placeholder')}
              />
            </Form.Item>
            <Form.Item className="button-item">
              <Button
                htmlType="submit"
                type="primary"
                className="register-button"
                loading={isLoading}
              >
                {t('title')}
              </Button>
            </Form.Item>
            <div className="terms-item">
              <Title className="terms-item__title" level={5}>
                {t('terms-title')}
                <Link to="#" className="terms-item__link">
                  {t('terms-link')}
                </Link>
              </Title>
            </div>
          </Form>
        </div>
      </Card>

      <div className="register-page__footer">
        <Language />
        <Title className="ask-account" level={5}>
          {t('ask-account')}
          <Link to="/login" className="ask-account__login-link">
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

export default Register;
