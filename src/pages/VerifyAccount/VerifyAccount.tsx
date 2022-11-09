import * as React from 'react';
import { HeartFilled } from '@ant-design/icons';
import OtpInput from 'react-otp-input';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Logo from '@common/Logo/Logo';

import './VerifyAccount.scss';

const VerifyAccount: React.FC = () => {
  const [otp, setOtp] = React.useState('');
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
          If you didn&apos;t receive a code!
          <Button className="btn-resend">Resend</Button>
        </Title>
        <div className="otp-check__btn">
          <Button className="btn-reset" onClick={() => setOtp('')}>
            Reset
          </Button>
          <Button className="btn-verify">Verify</Button>
        </div>
      </div>

      <div className="otp-page__footer">
        <Title className="author" level={5}>
          © 2022 Chat App. Crafted with
          <HeartFilled className="author__heart-icon" />
          by RVK Team
        </Title>
      </div>
    </div>
  );
};

export default VerifyAccount;
