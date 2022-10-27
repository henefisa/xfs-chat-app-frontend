import * as React from 'react';
import Carousel from 'src/components/common/Carousel/Carousel';
import CarouselItem from 'src/components/common/Carousel/CarouselItem/CarouselItem';
import Conversation from 'src/components/common/Conversation/Conversation';
import SearchSidebar from 'src/components/common/SearchSidebar/SearchSidebar';
import Title from 'src/components/common/Title/Title';

import './SidebarChats.scss';

const SidebarChats: React.FC = () => {
  return (
    <div className="sidebar-charts">
      <div className="header-charts">
        <div className="title">
          <Title level={4}>Chats</Title>
        </div>
        <div className="search-box">
          <SearchSidebar placeholder="Search messages or users"/>
        </div>
      </div>
      <div className="charts__carousel--wrapper">
        <Carousel>
          <CarouselItem path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick"/>
          <CarouselItem path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick"/>
          <CarouselItem path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick"/>
          <CarouselItem path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick"/>
          <CarouselItem path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick"/>
          <CarouselItem path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick"/>
        </Carousel>
      </div>
      <div className="charts-recent">
        <Title level={5} className="charts-recent__title">
          Recent
        </Title>
        <div className="conversation-list">
          <Conversation path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick Hendricks"/>
          <Conversation path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick Hendricks"/>
          <Conversation path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick Hendricks"/>
          <Conversation path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick Hendricks"/>
          <Conversation path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick Hendricks"/>
          <Conversation path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick Hendricks"/>
          <Conversation path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick Hendricks"/>
          <Conversation path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick Hendricks"/>
          <Conversation path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg" name="Patrick Hendricks"/>
        </div>
      </div>
    </div>
  );
};

export default SidebarChats;
