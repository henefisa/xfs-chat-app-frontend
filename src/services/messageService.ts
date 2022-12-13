import { notification } from 'antd';
import { TFunction } from 'i18next';
import apiRequest from 'src/api/apiRequest';
import { IMessageQuery } from 'src/models';

export const getMessages = async (
  query: IMessageQuery,
  t: TFunction<'common', undefined>
) => {
  try {
    const res = await apiRequest.get(`api/messages/${query.id}`);

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
