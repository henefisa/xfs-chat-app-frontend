import { HeartFilled } from '@ant-design/icons';
import Button from '@common/Button/Button';
import Logo from '@common/Logo/Logo';
import Title from '@common/Title/Title';
import Language from '@modules/Language/Language';
import { notification } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from 'src/store/authSlice';
import { useAppDispatch } from 'src/store/hooks';
import debounce from 'src/utils/debounce';
import { checkOtp, getOtp, logout } from '../../services/authService';

import './VerifyAccount.scss';

const VerifyAccount: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'verify-account']);

  const [otp, setOtp] = React.useState('');

  const handleGetOtp = async () => {
    await getOtp(t);
  };

  const debounceClickGetOtp = React.useMemo(() => {
    return debounce(handleGetOtp, 1000);
  }, []);

  const handleCheckOtp = async (otp: string) => {
    if (otp.length !== 6) {
      notification.warning({
        message: t('warning'),
        description: t('has-six-character', { ns: 'verify-account' }),
        duration: 1.5,
        key: '1',
      });
      return;
    }

    try {
      const isSuccess: boolean = await checkOtp(otp, t);

      if (isSuccess) {
        notification.success({
          message: t('success'),
          description: t('check-otp-success', { ns: 'verify-account' }),
          duration: 1.5,
          key: '1',
        });

        navigate('/dashboard');
      } else {
        notification.error({
          message: t('error'),
          description: t('check-otp-error', { ns: 'verify-account' }),
          duration: 1.5,
          key: '1',
        });
      }
    } catch (err) {
      // do something
    }
  };

  const debounceClickVerify = React.useMemo(() => {
    return debounce(handleCheckOtp, 1000);
  }, []);

  const handleLogout = async () => {
    await logout(t);
    dispatch(logoutSuccess());

    navigate('/login');
  };

  return (
    <div className="otp-page">
      <Logo />
      <div className="otp-check">
        <Title className="otp-check__heading" level={4}>
          Verification
        </Title>
        <Title className="otp-check__sub-heading" level={5}>
          Enter the verification code we just sent you on your email address
        </Title>
        <OtpInput
          value={otp}
          onChange={(otp: string) => setOtp(otp)}
          numInputs={6}
          isInputNum
          separator={<span>-</span>}
          containerStyle={{
            justifyContent: 'center',
          }}
          inputStyle={{
            width: '40px',
            height: '40px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            textAlign: 'center',
            fontSize: ' 18px',
            fontWeight: ' bold',
            lineHeight: '1',
            outline: 'none',
          }}
        />
        <Title className="otp-check__desc" level={4}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Your OTP will expire in 60s. If you didn't receive a code!
          <Button className="btn-resend" onClick={debounceClickGetOtp}>
            Resend
          </Button>
        </Title>
        <div className="otp-check__btn">
          <Button className="btn-reset" onClick={() => setOtp('')}>
            Reset
          </Button>
          <Button
            className="btn-verify"
            onClick={() => debounceClickVerify(otp)}
          >
            Verify
          </Button>
        </div>
      </div>

      <div className="otp-page__footer">
        <Language />
        <Title className="anothor-account-title" level={4}>
          Wanting to use another account?
          <Button className="btn-back-login" onClick={handleLogout}>
            Sign in
          </Button>
        </Title>
        <Title className="author" level={5}>
          © 2022 Chat App. Crafted with{' '}
          <HeartFilled className="author__heart-icon" /> by RVK Team
        </Title>
      </div>
    </div>
  );
};

export default VerifyAccount;
