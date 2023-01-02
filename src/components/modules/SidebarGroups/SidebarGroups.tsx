import Tooltip from '@common/Tooltip/Tooltip';
import * as React from 'react';

import { CloseOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import BlockGroup from '@common/BlockGroup/BlockGroup';
import Button from '@common/Button/Button';
import Input from '@common/Input/Input';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Title from '@common/Title/Title';
import CheckboxMember from '@modules/CheckboxCustom/CheckboxMember';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { createConversation } from 'src/services/conversationService';
import { useAppSelector } from 'src/store/hooks';
import { selectFriend, selectUserProfile } from 'src/store/userSlice';
import { selectDarkLight } from 'src/store/darkLightSlice';

import './SidebarGroups.scss';

const SidebarGroups: React.FC = () => {
  const [active, setActive] = React.useState(false);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [groupName, setGroupName] = React.useState<string>();
  const [groupFriendId, setGroupFriendId] = React.useState<string[]>([]);

  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.groups' });
  const { t: t1 } = useTranslation(['common', 'dashboard']);

  const { listFriend } = useAppSelector(selectFriend);
  const userProfileStore = useAppSelector(selectUserProfile);
  const isDark = useAppSelector(selectDarkLight);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;

      if (checked) {
        setGroupFriendId((prev) => [...prev, value]);
      } else {
        setGroupFriendId(groupFriendId.filter((item) => item !== value));
      }
    },
    []
  );

  const handleCreateGroupConversation = React.useCallback(() => {
    return async () => {
      if (groupFriendId.length < 2 || !userProfileStore) return;

      const newGroupFriend = [userProfileStore.id, ...groupFriendId];

      setIsLoading(true);
      try {
        await createConversation(
          { title: groupName, members: newGroupFriend },
          t1
        );

        setIsLoading(false);
        setToggleModal(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
  }, []);

  const onToggleModal = React.useCallback((isTrue: boolean) => {
    return () => setToggleModal(isTrue);
  }, []);

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value),
    []
  );

  const onActive = React.useCallback(() => setActive(!active), [active]);

  return (
    <>
      <div className={clsx('sidebar-groups', { 'dark-mode': isDark })}>
        <div className="sidebar-groups__header">
          <Title className="group-title" level={4}>
            {t('title')}
          </Title>
          <div className="group-create" onClick={onToggleModal(true)}>
            <Tooltip
              className=""
              placement="bottom"
              tooltipTitle={t('group-add-tooltip')}
            >
              <UsergroupAddOutlined className="group-create__icon" />
            </Tooltip>
          </div>
        </div>
        <div className="sidebar-groups__search">
          <SearchSidebar placeholder={t('search-placeholder')} />
        </div>
        <div className="sidebar-groups__box">
          <BlockGroup avtTitle="G" name="#General" pill="23+" />
          <BlockGroup avtTitle="G" name="#General" pill="23+" />
          <BlockGroup avtTitle="G" name="#General" pill="23+" />
          <BlockGroup avtTitle="G" name="#General" pill="23+" />
          <BlockGroup avtTitle="G" name="#General" pill="23+" />
          <BlockGroup avtTitle="G" name="#General" pill="23+" />
          <BlockGroup avtTitle="G" name="#General" pill="23+" />
        </div>
      </div>
      <div
        className={clsx('overlay-modal', {
          [`overlay-modal--active`]: toggleModal,
        })}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setToggleModal(false);
          }
        }}
      >
        <div className="overlay-modal__dialog">
          <div className="dialog-header">
            <Title className="dialog-header__title" level={5}>
              {t('modal-title')}
            </Title>
            <Button
              className="dialog-header__btn"
              onClick={onToggleModal(false)}
            >
              <CloseOutlined />
            </Button>
          </div>
          <div className="dialog__body">
            <div className="group-name">
              <Title className="group-name__title">
                {t('modal-name-label')}
              </Title>
              <Input
                className="group-name__input"
                placeholder={t('modal-name-placeholder')}
                value={groupName}
                onChange={onInputChange}
              />
            </div>
            <div className="group-members">
              <Title className="group-members__title" level={5}>
                {t('modal-members-label')}
              </Title>
              <div
                className={clsx('select-members', {
                  [`select-contacts--open`]: active,
                })}
              >
                <Button className="select-members__btn" onClick={onActive}>
                  {t('select-members')}
                </Button>
                <div className={clsx('select-contacts')}>
                  <Title className="select-contacts__header" level={5}>
                    {t('contacts')}
                  </Title>
                  <div className="select-contacts__add">
                    {listFriend?.map((item) => (
                      <div key={item.character}>
                        <Title className="firt-character">
                          {item.character}
                        </Title>
                        <ul className="contact-names">
                          {item.friends.map((friend) => {
                            const name = friend.fullName || friend.username;
                            return (
                              <li key={friend.id}>
                                <CheckboxMember
                                  label={name}
                                  friendId={friend.id}
                                  handleChange={handleChange}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dialog__footer">
            <Button className="btn-close" onClick={onToggleModal(false)}>
              {t('btn-close')}
            </Button>
            <Button
              className="btn-create"
              onClick={handleCreateGroupConversation}
              loading={isLoading}
            >
              {t('btn-create')}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={clsx('overlay-backdrop', {
          [`overlay-backdrop--active`]: toggleModal,
        })}
      ></div>
    </>
  );
};

export default SidebarGroups;
