import Button from '@common/Button/Button';
import Carousel from '@common/Carousel/Carousel';
import CarouselItem from '@common/Carousel/CarouselItem/CarouselItem';
import Conversation from '@common/Conversation/Conversation';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Title from '@common/Title/Title';
import clsx from 'clsx';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IConversation, IMessage } from 'src/models';
import { getMessages, getConversation } from 'src/services/conversationService';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import {
  getListMessageFailed,
  getListMessageStart,
  getListMessageSuccess,
  selectConversation,
  updateConversationSelected,
  updateListConversation,
} from 'src/store/conversationSlice';
import getGroupTitle from 'src/utils/getGroupTitle';
import { selectDarkLight } from 'src/store/darkLightSlice';

import './SidebarChats.scss';

const SidebarChats: React.FC = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.chats' });
  const { t: t1 } = useTranslation('common');
  const userProfileStore = useAppSelector(selectUserProfile);
  const isDark = useAppSelector(selectDarkLight);
  const dispatch = useAppDispatch();
  const [lastMessages, setLastMessages] = React.useState<IMessage[]>([]);

  const { listConversation, selectedConversation } =
    useAppSelector(selectConversation);
  React.useEffect(() => {
    const getListConvertion = async () => {
      const res = await getConversation(t1);
      dispatch(updateListConversation(res.conversations));
    };
    getListConvertion();
  }, []);

  React.useEffect(() => {
    listConversation.forEach(async (conversation) => {
      const lastMessage = await getLastMessage(conversation);
      setLastMessages([...lastMessages, lastMessage]);
    });
  }, [listConversation]);

  const handleClick = async (conversation: IConversation) => {
    dispatch(getListMessageStart());
    try {
      const result = await getMessages(t1, { id: conversation.id });
      dispatch(getListMessageSuccess(result.messages));
      dispatch(updateConversationSelected(conversation));
    } catch (err) {
      dispatch(getListMessageFailed());
    }
  };

  const getLastMessage = async (conversation: IConversation) => {
    try {
      const result = await getMessages(t1, { id: conversation.id });
      if (!result) return null;
      return result.messages[0];
    } catch (err) {
      dispatch(getListMessageFailed());
    }
  };

  const onHandleClick = React.useCallback((conversation: IConversation) => {
    return () => handleClick(conversation);
  }, []);

  return (
    <div className={clsx('sidebar-chats', { 'dark-mode': isDark })}>
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
        <>
          {listConversation.length > 0 && (
            <>
              <Title level={5} className="conversation-list__title">
                {t('recent')}
              </Title>
              <div className="conversation-list__result">
                {listConversation.map((conversation, index) => {
                  const titleConversation = getGroupTitle(
                    conversation,
                    userProfileStore
                  );
                  // console.log('last message: ', lastMessages[index].message);
                  return (
                    <Button
                      key={conversation.id}
                      className={clsx('conversation-btn', {
                        ['conversation-btn--active']:
                          conversation.id === selectedConversation?.id,
                      })}
                      onClick={onHandleClick(conversation)}
                    >
                      <Conversation
                        conversation={conversation}
                        name={conversation.title || titleConversation}
                        username={titleConversation}
                        time="10:20"
                        unread="2"
                      />
                    </Button>
                  );
                })}
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default SidebarChats;
