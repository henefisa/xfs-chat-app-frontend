import {
  FileOutlined,
  MessageOutlined,
  SafetyCertificateOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import Button from '@common/Button/Button';
import Logo from '@common/Logo/Logo';
import Title from '@common/Title/Title';
import Language from '@modules/Language/Language';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './Home.scss';

const HomePage: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <div className="home-page">
      <header className="home-page__header">
        <Logo className="header-logo" />
        <div className="header-actions">
          <Language />
          <Button className="header-actions__login">
            <Link to="/login">{t('login-title')}</Link>
          </Button>
          <Button className="header-actions__register">
            <Link to="/register">{t('register-title')}</Link>
          </Button>
        </div>
      </header>
      <main className="home-page__main">
        <div className="main-left">
          <Title className="main-left__title">{t('title')}</Title>
          <Title className="main-left__description">{t('sub-title')}</Title>
          <Button className="main-left__btn">
            <Link to="/register">{t('try-title')}</Link>
          </Button>
        </div>
        <div className="main-right">
          <img
            className="main-right__img"
            src="images/home-bg/bg-inner.png"
            alt="Chat App img"
          />
        </div>
      </main>
      <footer className="home-page__footer">
        <div className="footer-item">
          <MessageOutlined className="footer-item__icon" />
          <Title className="footer-item__title">{t('group-chat')}</Title>
        </div>
        <div className="footer-item">
          <VideoCameraOutlined className="footer-item__icon" />
          <Title className="footer-item__title">{t('video-call')}</Title>
        </div>
        <div className="footer-item">
          <FileOutlined className="footer-item__icon" />
          <Title className="footer-item__title">{t('file-sharing')}</Title>
        </div>
        <div className="footer-item">
          <SafetyCertificateOutlined className="footer-item__icon" />
          <Title className="footer-item__title">{t('privacy')}</Title>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
