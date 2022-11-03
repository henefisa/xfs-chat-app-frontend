import * as React from 'react';
import Tooltip from '@common/Tooltip/Tooltip';

import { UsergroupAddOutlined, CloseOutlined } from '@ant-design/icons';

import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import BlockGroup from '@common/BlockGroup/BlockGroup';
import Input from '@common/Input/Input';
import Button from '@common/Button/Button';
import clsx from 'clsx';
import Title from '@common/Title/Title';

import './SidebarGroups.scss';

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

const SidebarGroups: React.FC = () => {
  const [active, setActive] = React.useState(false);
  const [toggleModal, setToggleModal] = React.useState(false);

  return (
    <>
      <div className="sidebar-groups">
        <div className="sidebar-groups__header">
          <Title className="group-title" level={4}>
            Groups
          </Title>
          <div className="group-create" onClick={() => setToggleModal(true)}>
            <Tooltip
              className=""
              placement="bottom"
              tooltipTitle="Create group"
            >
              <UsergroupAddOutlined className="icon" />
            </Tooltip>
          </div>
        </div>
        <div className="sidebar-groups__search">
          <SearchSidebar placeholder="Search groups..." />
        </div>
        <div className="sidebar-groups__unstyled">
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
          <div className="dialog__title">
            <h5>Create New Group</h5>
            <button onClick={() => setToggleModal(false)}>
              <CloseOutlined />
            </button>
          </div>
          <div className="dialog__body">
            <div className="group-name">
              <div className="title">Group Name</div>
              <Input className="input" placeholder="Enter Group Name" />
            </div>
            <div className="group-members">
              <div className="title">Group Members</div>
              <div
                className={clsx('select-members', {
                  [`select-contacts--open`]: active,
                })}
              >
                <button onClick={() => setActive(!active)}>
                  Select Members
                </button>
                <div className={clsx('select-contacts')}>
                  <div className="select-contacts__header">Contacts</div>
                  <div className="select-contacts__add">
                    {contacts.map((contact, index) => (
                      <div key={index}>
                        <div className="firt-character">
                          {contact.firtCharacter}
                        </div>
                        <ul className="contact-names">
                          {contact.names.map((name, index) => (
                            <li key={index}>
                              <input
                                className="contact-names__checkbox"
                                type="checkbox"
                              ></input>
                              <label className="contact-names__label">
                                {name}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="dialog__desc">
              <div className="title">Description</div>
              <textarea
                className="description"
                placeholder="Enter Description"
              ></textarea>
            </div>
          </div>
          <div className="dialog__footer">
            <Button className="btn-close" onClick={() => setToggleModal(false)}>
              Close
            </Button>
            <Button className="btn-create">Create Group</Button>
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
