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
          <SearchSidebar />
        </div>
      </div>
      <div className="charts__carousel--wrapper">
        <Carousel>
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
        </Carousel>
      </div>
      <div className="charts-recent">
        <Title level={5} className="charts-recent__title">
          Recent
        </Title>
        <div className="conversation-list">
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
      </div>
    </div>
  );
};

export default SidebarChats;
