import React from 'react';
import Title from 'src/components/common/Title/Title';
import { useTranslation } from 'react-i18next';
import Button from '@common/Button/Button';
import Conversation from '@common/Conversation/Conversation';
import { selectUserProfile } from 'src/store/userSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  getConversationArchive,
  getMessages,
} from 'src/services/conversationService';
import {
  getListMessageFailed,
  getListMessageStart,
  getListMessageSuccess,
  selectConversation,
  updateConversationSelected,
  updateListConversationArchive,
} from 'src/store/conversationSlice';
import getGroupTitle from 'src/utils/getGroupTitle';
import clsx from 'clsx';
import { IConversation } from 'src/models';

import './ArchiveConversation.scss';

const ArchiveConversation = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.archive' });
  const { t: t1 } = useTranslation('common');
  const userProfileStore = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();
  const { listConversationArchive, selectedConversation } =
    useAppSelector(selectConversation);
  React.useEffect(() => {
    const getListConversationArchive = async () => {
      const res = await getConversationArchive(t);
      dispatch(updateListConversationArchive(res.conversationsArchived));
    };
    getListConversationArchive();
  }, []);

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

  const onHandleClick = React.useCallback((conversation: IConversation) => {
    return () => handleClick(conversation);
  }, []);

  return (
    <div className="archive">
      <div className="archive__header">
        <Title level={4} className="archive-heading">
          {t('archive-store')}
        </Title>
      </div>
      <div className="archive__content">
        {listConversationArchive.map((conversation) => {
          const titleConversation = getGroupTitle(
            conversation,
            userProfileStore
          );

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
    </div>
  );
};

export default ArchiveConversation;
