import { notification } from 'antd';
import { TFunction } from 'i18next';
import apiRequest from 'src/api/apiRequest';
import {
  IDataCreateConversation,
  IMessageQuery,
  TConversationQuery,
} from 'src/models';

export const getConversation = async (
  t: TFunction<'common', undefined>,
  query: TConversationQuery = {}
) => {
  try {
    const res = await apiRequest.get('api/conversations', { params: query });
    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};

export const createConversation = async (
  data: IDataCreateConversation,
  t: TFunction<('common' | 'dashboard')[], undefined>
) => {
  try {
    const res = await apiRequest.post('api/conversations', data);
    notification.success({
      message: t('success'),
      description: t('sidebar.groups.create-conversation.success', {
        ns: 'dashboard',
      }),
      duration: 1.5,
      key: '1',
    });
    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};

export const getMessages = async (
  t: TFunction<'common', undefined>,
  query: IMessageQuery
) => {
  try {
    const res = await apiRequest.get(`api/messages/${query.id}`, {
      params: query,
    });

    return res.data;
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};
