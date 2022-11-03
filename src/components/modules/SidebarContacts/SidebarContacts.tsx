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

  return (
    <>
      <div className="sidebar-contacts">
        <div className="sidebar-contacts__header">
          <Title className="contact-title" level={4}>
            Contacts
          </Title>
          <div className="contact-add" onClick={() => setToggleModal(true)}>
            <Tooltip placement="bottom" tooltipTitle="Add contact">
              <UsergroupAddOutlined className="contact-add__icon" />
            </Tooltip>
          </div>
        </div>
        <div className="sidebar-contacts__search">
          <SearchSidebar placeholder="Search users..." />
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
          <div className="dialog__title">
            <Title className="title" level={5}>
              Add Contacts
            </Title>
            <button onClick={() => setToggleModal(false)}>
              <CloseOutlined />
            </button>
          </div>
          <div className="dialog__body">
            <div className="email">
              <label>Email</label>
              <Input className="input" placeholder="Enter email" />
            </div>
            <div className="message">
              <label>Invatation Message</label>
              <textarea placeholder="Enter Message" />
            </div>
          </div>
          <div className="dialog__footer">
            <Button className="btn-close" onClick={() => setToggleModal(false)}>
              Close
            </Button>
            <Button className="btn-invite">Invite Contact</Button>
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
