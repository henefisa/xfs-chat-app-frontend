import * as React from 'react';
import Title from '@common/Title/Title';

import './ChatOverlay.scss';
import { useTranslation } from 'react-i18next';

const ChatOverlay: React.FC = () => {
  const { t } = useTranslation('dashboard');

  return (
    <div className="chat-overlay">
      <Title level={4} className="chat-overlay__title">
        {t('chat-overlay')}
      </Title>
    </div>
  );
};

export default ChatOverlay;
