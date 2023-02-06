import * as React from 'react';
import { EditOutlined, DownOutlined } from '@ant-design/icons';
import Title from '@common/Title/Title';
import Dropdown from '@common/Dropdown/Dropdown';
import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Divider from '@common/Divider/Divider';
import clsx from 'clsx';
import PrivacyMenu from '@modules/PrivacyMenu/PrivacyMenu';
import Input from '@common/Input/Input';
import Switch from '@common/Switch/Switch';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { selectUserProfile } from 'src/store/userSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import * as userService from 'src/services/userService';
import { TUserInfo } from 'src/models';
import TextArea from '@common/TextArea/TextArea';
import ESidebarSetting from 'src/interfaces/ESidebarSettings';
import isEqual from 'lodash.isequal';
import { selectDarkLight } from 'src/store/darkLightSlice';

import './SidebarSettings.scss';

const SidebarSettings: React.FC = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.settings' });
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(selectDarkLight);
  const userProfileStore = useAppSelector(selectUserProfile);
  const [active, setActive] = React.useState(ESidebarSetting.ACCOUNT);
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [preview, setPreview] = React.useState<string>();
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [updateSuccess, setUpdateSuccess] = React.useState<boolean>(false);
  const [hideCancel, setHideCancel] = React.useState<boolean>(true);
  const [isSaveChange, setIsSaveChange] = React.useState<boolean>(false);

  const [form] = Form.useForm();

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
    { title: t('account-details-title'), key: ESidebarSetting.ACCOUNT },
    { title: t('privacy-title'), key: ESidebarSetting.PRIVACY },
    { title: t('security-title'), key: ESidebarSetting.SECURITY },
    { title: t('help-title'), key: ESidebarSetting.HELPS },
  ];

  const initUserInfo = React.useMemo(() => {
    return {
      fullName: userProfileStore?.fullName,
      location: userProfileStore?.location,
      phone: userProfileStore?.phone,
      description: userProfileStore?.description,
    };
  }, [updateSuccess]);

  const handleValuesChange = (e: TUserInfo, newInfoUser: TUserInfo) => {
    const newUserInfo = {
      fullName: e.fullName || newInfoUser.fullName,
      location: e.location || newInfoUser.location,
      phone: e.phone || newInfoUser.phone,
      description: e.description || newInfoUser.description,
    };
    setDisabled(isEqual(initUserInfo, newUserInfo));
    setHideCancel(isEqual(initUserInfo, newUserInfo));
  };
  const handleReset = () => {
    form.resetFields();
    setHideCancel(true);
  };

  const handleFinish = async (values: TUserInfo) => {
    setIsSaveChange(true);
    try {
      if (selectedFile) {
        const res = await userService.getPresignUrl(selectedFile.name, t);
        await userService.putPresignUrl(res.url, selectedFile, t);
        const profile = { ...values, avatar: res.key };
        await userService.updateUserProfile(dispatch, profile, t);
      } else {
        await userService.updateUserProfile(dispatch, values, t);
      }
      await userService.getUserProfile(dispatch);
      setIsSaveChange(false);
      setUpdateSuccess(!updateSuccess);
      setDisabled(true);
      setHideCancel(true);
    } catch (error) {
      setIsSaveChange(false);
    }
  };

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setDisabled(false);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className={clsx('sidebar-settings', { 'dark-mode': isDark })}>
      <Title className="title-settings" level={3}>
        {t('title')}
      </Title>
      <div className="avatar-settings">
        <div className="avatar-settings__inner">
          <Avatar
            path={preview || userProfileStore?.avatar}
            imgWidth={100}
            username="A"
            className="custom-avatar"
          />
          <label htmlFor="upload-file" className="avatar-label">
            <EditOutlined className="avatar-label__icon" />
          </label>
        </div>
      </div>
      <Input
        id="upload-file"
        className="input-file"
        type="file"
        onChange={onSelectFile}
      />
      <div className="account-details">
        <div className="account-details__inner">
          <div className="title-list">
            {titleBox.map((item, index) => (
              <Title
                className={clsx(
                  'account-details__title',
                  active === item.key && 'account-details__title--active'
                )}
                level={5}
                key={index}
              >
                <div onClick={() => setActive(item.key)}>{item.title}</div>
              </Title>
            ))}
          </div>
          {active === ESidebarSetting.ACCOUNT && (
            <div className="form-container">
              <Form
                form={form}
                onFinish={handleFinish}
                initialValues={{
                  fullName: userProfileStore?.fullName,
                  location: userProfileStore?.location,
                  email: userProfileStore?.email,
                  phone: userProfileStore?.phone,
                  description: userProfileStore?.description,
                }}
                onValuesChange={handleValuesChange}
              >
                <Form.Item
                  name="fullName"
                  label={t('account-name')}
                  labelCol={{ span: 24 }}
                >
                  <Input className="form-input" />
                </Form.Item>
                <Form.Item
                  name="location"
                  label={t('account-location')}
                  labelCol={{ span: 24 }}
                >
                  <Input className="form-input" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={t('account-phone')}
                  labelCol={{ span: 24 }}
                >
                  <Input type="Number" className="form-input" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={t('account-email')}
                  labelCol={{ span: 24 }}
                >
                  <Input className="form-input" disabled />
                </Form.Item>
                <Form.Item
                  name="description"
                  label={t('account-description')}
                  labelCol={{ span: 24 }}
                >
                  <TextArea className="form-input" />
                </Form.Item>
                <div className="form-button">
                  <Button
                    type="primary"
                    className={clsx(
                      'form-button__cancel',
                      hideCancel && 'form-button__cancel--hide'
                    )}
                    onClick={handleReset}
                  >
                    {t('btn-cancel')}
                  </Button>
                  <Button
                    type="primary"
                    className="form-button__save-change"
                    htmlType="submit"
                    disabled={disabled}
                    loading={isSaveChange}
                  >
                    {t('btn-save')}
                  </Button>
                </div>
              </Form>
            </div>
          )}

          {active === ESidebarSetting.PRIVACY && (
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

          {active === ESidebarSetting.SECURITY && (
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

          {active === ESidebarSetting.HELPS && (
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
