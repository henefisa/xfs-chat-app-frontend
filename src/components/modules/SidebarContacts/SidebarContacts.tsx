import * as React from 'react';
import Tooltip from '@common/Tooltip/Tooltip';

import {
  UsergroupAddOutlined,
  MoreOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Dropdown from '@common/Dropdown/Dropdown';
import ContactMenu from '../ContactMenu/ContactMenu';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Input from '@common/Input/Input';
import Button from '@common/Button/Button';
import Title from '@common/Title/Title';

import './SidebarContacts.scss';

const contacts = [
  {
    firtCharacter: 'A',
    names: ['Albert Rodarte', 'Allison Etter'],
  },
  {
    firtCharacter: 'C',
    names: ['Craig Smiley'],
  },
  {
    firtCharacter: 'D',
    names: ['Daniel Clay', 'Doris Brown'],
  },
  {
    firtCharacter: 'I',
    names: ['Iris Wells'],
  },
  {
    firtCharacter: 'J',
    names: ['Juan Flakes', 'John Hall', 'Joy Southern'],
  },

  {
    firtCharacter: 'M',
    names: ['Mary Farmer', 'Mark Messer', 'Michael Hinton'],
  },
  {
    firtCharacter: 'O',
    names: ['Ossie Wilson'],
  },
  {
    firtCharacter: 'P',
    names: ['Phillis Griffin', 'Paul Haynes'],
  },
  {
    firtCharacter: 'R',
    names: ['Rocky Jackson'],
  },
  {
    firtCharacter: 'S',
    names: ['Sara Muller', 'Simon Velez', 'Steve Walker'],
  },
  {
    firtCharacter: 'H',
    names: ['Hanah Mile'],
  },
];

const SidebarContacts: React.FC = () => {
  const [toggleModal, setToggleModal] = React.useState(false);
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.contacts' });
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
          {contacts.map((contact, index) => (
            <div key={index}>
              <div className="firt-character">{contact.firtCharacter}</div>
              <ul className="contact-names">
                {contact.names.map((name, index) => (
                  <li key={index}>
                    <label className="contact-names__label">{name}</label>
                    <Dropdown
                      overlay={<ContactMenu />}
                      trigger={['click']}
                      placement="bottomRight"
                    >
                      <MoreOutlined className="icon" />
                    </Dropdown>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
            <div className="dialog-body__email" >
              <label>Email</label>
              <Input className="input" placeholder={t('email-placeholder')} />
            </div>
            <div className="dialog-body__message">
              <label>{t('invatation-mess')}</label>
              <textarea placeholder={t('mess-placeholder')} />
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
