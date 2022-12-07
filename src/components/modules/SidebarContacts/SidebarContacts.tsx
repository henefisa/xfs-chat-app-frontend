import Tooltip from '@common/Tooltip/Tooltip';
import * as React from 'react';

import {
  CloseOutlined,
  Loading3QuartersOutlined,
  MoreOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import Input from '@common/Input/Input';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Spin from '@common/Spin/Spin';
import Title from '@common/Title/Title';
import ContactMenu from '@modules/ContactMenu/ContactMenu';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { EFriendStatus, IFriendConvert, IUserItemResult } from 'src/models';
import { getUsers } from 'src/services/userService';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectFriend,
  updateFriendSelected,
  updateListFriend,
} from 'src/store/userSlice';

import './SidebarContacts.scss';

const SidebarContacts: React.FC = () => {
  const [toggleModal, setToggleModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { selectedFriend, listFriend } = useAppSelector(selectFriend);

  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.contacts' });
  const { t: t1 } = useTranslation('common');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const handleConvertListFriend = (list: IUserItemResult[]) => {
      const listCharacter = list.reduce((accumulator, friend) => {
        const nameCharacter = (friend.fullName ?? friend.username)
          .charAt(0)
          .toUpperCase();

        if (!accumulator.includes(nameCharacter))
          accumulator.push(nameCharacter);

        return accumulator;
      }, [] as string[]);

      const newList = listCharacter.sort().map((character) => {
        const objectItem: IFriendConvert = {
          character: character,
          friends: [],
        };

        objectItem.friends = list.reduce((accumulator, friend) => {
          const nameCharacter = (friend.fullName ?? friend.username)
            .charAt(0)
            .toUpperCase();

          if (nameCharacter === character) accumulator.push(friend);

          return accumulator;
        }, [] as IUserItemResult[]);

        return objectItem;
      });

      dispatch(updateListFriend(newList));
    };

    const getListFriend = async () => {
      setLoading(true);
      try {
        const result = await getUsers(
          { friendStatus: EFriendStatus.ACCEPTED },
          t1
        );

        handleConvertListFriend(result.users);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    getListFriend();
  }, []);

  const handleSelectFriend = (friend: IUserItemResult) => {
    dispatch(updateFriendSelected(friend));
  };

  return (
    <>
      <div className="sidebar-contacts">
        <div className="sidebar-contacts__header">
          <Title className="contact-title" level={4}>
            {t('title')}
          </Title>
          <div className="contact-add" onClick={() => setToggleModal(true)}>
            <Tooltip placement="bottom" tooltipTitle={t('add-contacts')}>
              <UsergroupAddOutlined className="contact-add__icon" />
            </Tooltip>
          </div>
        </div>
        <div className="sidebar-contacts__search">
          <SearchSidebar placeholder={t('search-contacts')} />
        </div>
        <div className="sidebar-contacts__unstyled">
          {loading ? (
            <Spin
              className="loading"
              spinIcon={
                <Loading3QuartersOutlined className="loading-icon" spin />
              }
            />
          ) : (
            <>
              {listFriend?.map((item) => (
                <div key={item.character}>
                  <div className="firt-character">{item.character}</div>
                  <ul className="contact-names">
                    {item.friends.map((friend) => {
                      const name = friend.fullName ?? friend.username;

                      return (
                        <Button
                          key={friend.id}
                          className={clsx('contact-names__btn', {
                            ['contact-names__btn--active']:
                              selectedFriend?.username === friend.username,
                          })}
                          onClick={() => handleSelectFriend(friend)}
                        >
                          <label className="contact-names__label">{name}</label>
                          <Dropdown
                            overlay={<ContactMenu />}
                            trigger={['click']}
                            placement="bottomRight"
                          >
                            <MoreOutlined className="icon" />
                          </Dropdown>
                        </Button>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </>
          )}
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
              {t('add-contacts')}
            </Title>
            <button onClick={() => setToggleModal(false)}>
              <CloseOutlined />
            </button>
          </div>
          <div className="dialog-body">
            <div className="dialog-body__email">
              <Title className="email-label" level={5}>
                Email
              </Title>
              <Input
                className="email-input"
                placeholder={t('email-placeholder')}
              />
            </div>
            <div className="dialog-body__message">
              <Title className="message-label" level={5}>
                {t('invatation-mess')}
              </Title>
              <textarea
                className="message-input"
                placeholder={t('mess-placeholder')}
              />
            </div>
          </div>
          <div className="dialog-footer">
            <Button className="btn-close" onClick={() => setToggleModal(false)}>
              {t('btn-close')}
            </Button>
            <Button className="btn-invite">{t('btn-invite')}</Button>
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

export default SidebarContacts;
