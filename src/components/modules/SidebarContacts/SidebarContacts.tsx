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
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import {
  EFriendStatus,
  IConversation,
  IFriendAccept,
  TUserProfile,
} from 'src/models';
import {
  checkHasConversationForTwoMember,
  getFriends,
  getMessages,
} from 'src/services/userService';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  deleteConversationSelected,
  deleteListMessage,
  getListMessageFailed,
  getListMessageStart,
  getListMessageSuccess,
  selectFriend,
  selectUserProfile,
  updateFriendSelected,
  updateHasConversation,
} from 'src/store/userSlice';
import ContactMenu from '../ContactMenu/ContactMenu';

import './SidebarContacts.scss';

const SidebarContacts: React.FC = () => {
  const [toggleModal, setToggleModal] = React.useState(false);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [listFriend, setListFriend] = React.useState<
    {
      character: string;
      friends: TUserProfile[];
    }[]
  >([]);

  const { selectedFriend } = useAppSelector(selectFriend);
  const userProfileStore = useAppSelector(selectUserProfile);

  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.contacts' });
  const { t: t1 } = useTranslation('common');
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const checkFriend = (item: IFriendAccept) => {
      // Kiểm tra friend là ai (owner hay userTarget)
      let friend: TUserProfile;
      if (userProfileStore?.id === item.owner.id) {
        friend = item.userTarget;
      } else {
        friend = item.owner;
      }

      return friend;
    };

    const handleConvertListFriend = (list: IFriendAccept[]) => {
      const listCharacter: string[] = [];

      list.forEach((item) => {
        const friend = checkFriend(item);

        const name = friend.fullName ?? friend.username;

        if (listCharacter.includes(name.charAt(0).toUpperCase())) return;

        listCharacter.push(name.charAt(0).toUpperCase());
      });

      const newList = listCharacter.sort().map((item) => {
        const objectItem: { character: string; friends: TUserProfile[] } = {
          character: item,
          friends: [],
        };

        list.forEach((value) => {
          const friend = checkFriend(value);

          if (!friend.fullName) {
            if (friend.username.charAt(0).toUpperCase() !== item) return;

            objectItem.friends.push(friend);

            return;
          }

          if (friend.fullName.charAt(0).toUpperCase() !== item) return;

          objectItem.friends.push(friend);
        });

        return objectItem;
      });

      setListFriend(newList);
    };

    const getListFriend = async () => {
      setLoading(true);
      try {
        const res = await getFriends({ status: EFriendStatus.ACCEPTED }, t1);
        handleConvertListFriend(res.friends);

        setLoading(false);
      } catch (err) {
        setListFriend([]);
        setLoading(false);
      }
    };

    getListFriend();
  }, []);

  const handleSelectFriend = (friend: TUserProfile) => {
    dispatch(updateFriendSelected(friend));
    dispatch(deleteConversationSelected());

    handleCheckHasConversation(friend.id);
  };

  const handleCheckHasConversation = async (friendId: string) => {
    try {
      const conversation: IConversation =
        await checkHasConversationForTwoMember(friendId, t1);

      if (!conversation) {
        dispatch(deleteListMessage());
        dispatch(updateHasConversation(false));
        return;
      }

      dispatch(updateHasConversation(true));
      dispatch(getListMessageStart());
      try {
        const result = await getMessages({ id: conversation.id }, t1);
        dispatch(getListMessageSuccess(result.messages));
      } catch (err) {
        dispatch(getListMessageFailed());
      }
    } catch (err) {
      // do something
    }
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
              {listFriend.length > 0 &&
                listFriend.map((item, index) => (
                  <div key={index}>
                    <div className="firt-character">{item.character}</div>
                    <ul className="contact-names">
                      {item.friends.map((friend) => (
                        <Button
                          key={friend.id}
                          className={clsx('contact-names__btn', {
                            ['contact-names__btn--active']:
                              selectedFriend?.username === friend.username,
                          })}
                          onClick={() => handleSelectFriend(friend)}
                        >
                          <label className="contact-names__label">
                            {friend.fullName ?? friend.username}
                          </label>
                          <Dropdown
                            overlay={<ContactMenu />}
                            trigger={['click']}
                            placement="bottomRight"
                          >
                            <MoreOutlined className="icon" />
                          </Dropdown>
                        </Button>
                      ))}
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
