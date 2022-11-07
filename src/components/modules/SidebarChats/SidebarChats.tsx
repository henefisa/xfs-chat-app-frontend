import * as React from 'react';
import Carousel from '@common/Carousel/Carousel';
import CarouselItem from '@common/Carousel/CarouselItem/CarouselItem';
import Conversation from '@common/Conversation/Conversation';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Title from '@common/Title/Title';

import './SidebarChats.scss';

const SidebarChats: React.FC = () => {
  return (
    <div className="sidebar-chats">
      <div className="header-chats">
        <Title className="header-chats__title" level={4}>
          Chats
        </Title>
        <div className="search-box">
          <SearchSidebar placeholder="Search messages or users" />
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
          Recent
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
