import * as React from 'react';
import Tooltip from '@common/Tooltip/Tooltip';

import { UsergroupAddOutlined, CloseOutlined } from '@ant-design/icons';

import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import BlockGroup from '@common/BlockGroup/BlockGroup';
import Input from '@common/Input/Input';
import Button from '@common/Button/Button';
import clsx from 'clsx';
import Title from '@common/Title/Title';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.groups' });

  return (
    <>
      <div className="sidebar-groups">
        <div className="sidebar-groups__header">
          <Title className="group-title" level={4}>
            {t('title')}
          </Title>
          <div className="group-create" onClick={() => setToggleModal(true)}>
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
                    {contacts.map((contact, index) => (
                      <div key={index}>
                        <Title className="firt-character">
                          {contact.firtCharacter}
                        </Title>
                        <ul className="contact-names">
                          {contact.names.map((name, index) => (
                            <li key={index}>
                              <input
                                className="contact-names__checkbox"
                                type="checkbox"
                              ></input>
                              <Title className="contact-names__label">
                                {name}
                              </Title>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="dialog-desc">
              <Title className="dialog-desc__title">
                {t('modal-desc-label')}
              </Title>
              <textarea
                className="dialog-desc__input"
                placeholder={t('modal-desc-placeholder')}
              ></textarea>
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
