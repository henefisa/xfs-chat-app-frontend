import { Loading3QuartersOutlined } from '@ant-design/icons';
import Button from '@common/Button/Button';
import Carousel from '@common/Carousel/Carousel';
import CarouselItem from '@common/Carousel/CarouselItem/CarouselItem';
import Conversation from '@common/Conversation/Conversation';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Title from '@common/Title/Title';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Spin from 'src/components/common/Spin/Spin';
import { IConversation } from 'src/models';
import { getListConversation } from 'src/services/userService';

import './SidebarChats.scss';

const SidebarChats: React.FC = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.chats' });
  const { t: t1 } = useTranslation('common');

  const [loading, setLoading] = React.useState<boolean>(false);
  const [listConversation, setListConversation] = React.useState<
    IConversation[]
  >([]);

  React.useEffect(() => {
    const handleGetListConversation = async () => {
      setLoading(true);
      try {
        const result = await getListConversation({ q: 'k' }, t1);
        setListConversation(result.conversations);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    handleGetListConversation();
  }, []);

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
      <div className="conversation-list">
        {loading ? (
          <Spin
            className="loading"
            spinIcon={
              <Loading3QuartersOutlined className="loading-icon" spin />
            }
          />
        ) : (
          <>
            {listConversation.length > 0 && (
              <>
                <Title level={5} className="conversation-list__title">
                  {t('recent')}
                </Title>
                <div className="conversation-list__result">
                  {listConversation.map((conversation) => (
                    <Button key={conversation.id} className="conversation-btn">
                      <Conversation
                        path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
                        name="Patrick Hendricks"
                        time="10:20"
                        unread="2"
                      />
                    </Button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarChats;
