import Tooltip from '@common/Tooltip/Tooltip';
import * as React from 'react';

import { CloseOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import BlockGroup from '@common/BlockGroup/BlockGroup';
import Button from '@common/Button/Button';
import Input from '@common/Input/Input';
import InputCheckbox from '@common/Input/InputCheckbox';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Title from '@common/Title/Title';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';
import { selectFriend } from 'src/store/userSlice';

import './SidebarGroups.scss';

const SidebarGroups: React.FC = () => {
  const [active, setActive] = React.useState(false);
  const [toggleModal, setToggleModal] = React.useState(false);
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.groups' });

  const { listFriend } = useAppSelector(selectFriend);

  return (
    <>
      <div className="sidebar-groups">
        <div className="sidebar-groups__header">
          <Title className="group-title" level={4}>
            {t('title')}
          </Title>
          <div className="group-create" onClick={() => setToggleModal(true)}>
            <Tooltip placement="bottom" tooltipTitle={t('group-add-tooltip')}>
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
              onClick={() => setToggleModal(false)}
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
                <Button
                  className="select-members__btn"
                  onClick={() => setActive(!active)}
                >
                  {t('select-members')}
                </Button>
                <div className={clsx('select-contacts')}>
                  <Title className="select-contacts__header" level={5}>
                    {t('contacts')}
                  </Title>
                  <div className="select-contacts__add">
                    {listFriend?.map((item, index) => (
                      <div key={index}>
                        <Title className="firt-character">
                          {item.character}
                        </Title>
                        <ul className="contact-names">
                          {item.friends.map((friend) => {
                            const name = friend.fullName ?? friend.username;
                            return (
                              <li key={friend.id}>
                                <InputCheckbox label={name} />
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
            <Button className="btn-close" onClick={() => setToggleModal(false)}>
              {t('btn-close')}
            </Button>
            <Button className="btn-create">{t('btn-create')}</Button>
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
