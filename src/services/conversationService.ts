import { notification } from 'antd';
import { TFunction } from 'i18next';
import apiRequest from 'src/api/apiRequest';
import { IDataCreateConversation } from 'src/models';

export const getListConversation = async (
  t: TFunction<'common', undefined>
) => {
  try {
    const res = await apiRequest.get('api/conversations');
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
    await apiRequest.post('api/conversations', data);

    notification.success({
      message: t('success'),
      description: t('sidebar.groups.create-conversation.success', {
        ns: 'dashboard',
      }),
      duration: 1.5,
      key: '1',
    });
  } catch (err) {
    notification.error({
      message: t('error'),
      description: t('normal-error-message'),
      duration: 1.5,
      key: '1',
    });
  }
};
