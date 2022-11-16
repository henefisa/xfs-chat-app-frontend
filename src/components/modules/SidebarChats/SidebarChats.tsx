import * as React from 'react';
import Carousel from '@common/Carousel/Carousel';
import CarouselItem from '@common/Carousel/CarouselItem/CarouselItem';
import Conversation from '@common/Conversation/Conversation';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Title from '@common/Title/Title';
import { useTranslation } from 'react-i18next';

import './SidebarChats.scss';

const SidebarChats: React.FC = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.chats' });
  return (
    <div className="sidebar-chats">
      <div className="header-chats">
        <Title className="header-chats__title" level={4}>
          {t('title')}
        </Title>
        <div className="search-box">
          <SearchSidebar placeholder={t('search-placeholder')} />
        </div>
      </div>
      <div className="chats__carousel">
        <Carousel>
          <CarouselItem
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick"
          />
          <CarouselItem
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick"
          />
          <CarouselItem
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick"
          />
          <CarouselItem
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick"
          />
          <CarouselItem
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick"
          />
          <CarouselItem
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick"
          />
        </Carousel>
      </div>
      <div className="chats-recent">
        <Title level={5} className="chats-recent__title">
          {t('recent')}
        </Title>
        <div className="conversation-list">
          <Conversation
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick Hendricks"
            time="10:20"
            unread="2"
          />
          <Conversation
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick Hendricks"
            time="10:20"
            unread="2"
          />
          <Conversation
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick Hendricks"
            time="10:20"
            unread="2"
          />
          <Conversation
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick Hendricks"
            time="10:20"
            unread="2"
          />
          <Conversation
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick Hendricks"
            time="10:20"
            unread="2"
          />
          <Conversation
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick Hendricks"
            time="10:20"
            unread="2"
          />
          <Conversation
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick Hendricks"
            time="10:20"
            unread="2"
          />
          <Conversation
            path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
            name="Patrick Hendricks"
            time="10:20"
            unread="2"
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarChats;
