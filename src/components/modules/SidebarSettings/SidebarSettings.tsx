import * as React from 'react';
import { EditOutlined, DownOutlined } from '@ant-design/icons';
import Title from '@common/Title/Title';
import Dropdown from '@common/Dropdown/Dropdown';
import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Divider from '@common/Divider/Divider';
import clsx from 'clsx';
import PrivacyMenu from '../PrivacyMenu/PrivacyMenu';
import Input from '@common/Input/Input';
import Switch from '@common/Switch/Switch';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { selectUserProfile } from 'src/store/userSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import * as userService from 'src/services/userService';
import TextArea from 'antd/lib/input/TextArea';
import { IUserItemResult } from 'src/models';

import './SidebarSettings.scss';

const SidebarSettings: React.FC = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.settings' });
  const [active, setActive] = React.useState(0);
  const userProfileStore = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();

  const handleFinish = (values: IUserItemResult) => {
    userService.updateUserProfile(dispatch, values, t);
  };

  const privacy = [
    { title: t('privacy-profile-photo') },
    { title: t('privacy-last-seen'), check: true },
    { title: t('privacy-status') },
    { title: t('privacy-read-receipts'), check: true },
    { title: t('privacy-groups') },
  ];

  const help = [
    { title: t('help-faq') },
    { title: t('help-contact') },
    { title: t('help-terms') },
  ];

  const titleBox = [
    t('account-details-title'),
    t('privacy-title'),
    t('security-title'),
    t('help-title'),
  ];

  return (
    <div className="sidebar-settings">
      <Title className="title-settings" level={3}>
        {t('title')}
      </Title>
      <div className="avatar-settings">
        <div className="avatar-settings__inner">
          <Avatar
            path="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/277551484_1607305416300980_1426726336589949572_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NDE6kmkwFQ8AX9-U3bh&_nc_ht=scontent.fdad3-1.fna&oh=00_AT8SGcvhT_y6-Lc16cMBv0OwsUOg0x7ef7Yp1yb_1teoEQ&oe=635BDBD2"
            imgWidth={100}
            username="A"
            className="custom-avatar"
          />
          <Button className="avatar-btn">
            <EditOutlined className="avatar-btn__icon" />
          </Button>
        </div>
      </div>
      <div className="account-details">
        <div className="account-details__inner">
          <div className="title-list">
            {titleBox.map((item, index) => (
              <Title
                className={clsx(
                  'account-details__title',
                  active === index && 'account-details__title--active'
                )}
                level={5}
                key={index}
              >
                <div onClick={() => setActive(index)}>{item}</div>
              </Title>
            ))}
          </div>
          {active === 0 && (
            <div className="form-container">
              <Form
                onFinish={handleFinish}
                initialValues={{
                  fullName: userProfileStore.fullName,
                  location: userProfileStore.location,
                  email: userProfileStore.email,
                  phone: userProfileStore.phone,
                  description: userProfileStore.description,
                }}
              >
                <Form.Item
                  name="fullName"
                  label={t('account-name')}
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: `${t('name-error-message')}`,
                    },
                  ]}
                >
                  <Input className="form-input" />
                </Form.Item>
                <Form.Item
                  name="location"
                  label={t('account-location')}
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: `${t('location-error-message')}`,
                    },
                  ]}
                >
                  <Input className="form-input" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={t('account-phone')}
                  labelCol={{ span: 24 }}
                  rules={[
                    { required: true, message: `${t('phone-error-message')}` },
                  ]}
                >
                  <Input className="form-input" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={t('account-email')}
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: `email-error-message` }]}
                >
                  <Input className="form-input" disabled />
                </Form.Item>
                <Form.Item
                  name="description"
                  label={t('account-description')}
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: `${t('description-error-message')}`,
                    },
                  ]}
                >
                  <TextArea
                    className="form-input"
                    placeholder="admin@mgail.com"
                  />
                </Form.Item>
                <div className="form-button">
                  <Button type="primary" className="form-button__cancel">
                    {t('btn-cancel')}
                  </Button>
                  <Button
                    type="primary"
                    className="form-button__save-change"
                    htmlType="submit"
                  >
                    {t('btn-save')}
                  </Button>
                </div>
              </Form>
            </div>
          )}

          {active === 1 && (
            <div className="privacy__inner">
              <ul className="privacy__panel">
                {privacy.map((item, index) => (
                  <div key={index}>
                    <li className="panel-item">
                      <Title level={5} className="panel-item__title">
                        {item.title}
                      </Title>
                      {item.check ? (
                        <Switch defaultChecked={true} />
                      ) : (
                        <Dropdown
                          overlay={<PrivacyMenu />}
                          trigger={['click']}
                          placement="bottomRight"
                        >
                          <Button className="panel-item__btn">
                            {t('btn-everyone')}
                            <DownOutlined className="btn-icon" />
                          </Button>
                        </Dropdown>
                      )}
                    </li>
                    {index < privacy.length - 1 && <Divider />}
                  </div>
                ))}
              </ul>
            </div>
          )}

          {active === 2 && (
            <div className="security__inner">
              <ul className="security__panel">
                <li className="panel-item">
                  <Title level={5} className="panel-item__title">
                    {t('show-security-notification')}
                  </Title>
                  <Switch defaultChecked={true} />
                </li>
              </ul>
            </div>
          )}

          {active === 3 && (
            <div className="help__inner">
              <ul className="help__panel">
                {help.map((item, index) => (
                  <div key={index}>
                    <li className="panel-item">
                      <Title level={5} className="panel-item__title">
                        {item.title}
                      </Title>
                    </li>
                    {index < help.length - 1 && <Divider />}
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarSettings;
