import Modal from '@common/Modal/Modal';
import Title from '@common/Title/Title';
import React, { useState } from 'react';
import Button from '@common/Button/Button';
import { RightSquareOutlined, CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './ForwardForm.scss';

const contacts = [
  {
    firtCharacter: 'A',
    names: ['Albert Rodartes', 'Allison Ettert'],
  },
  {
    firtCharacter: 'C',
    names: ['Craig Smileys'],
  },
  {
    firtCharacter: 'D',
    names: ['Daniel Clay', 'Doris Browns'],
  },
  {
    firtCharacter: 'I',
    names: ['Iris Wellsy'],
  },
  {
    firtCharacter: 'J',
    names: ['Juan Flakes', 'John Halls', 'Joy Southernt'],
  },

  {
    firtCharacter: 'M',
    names: ['Mary Farmers', 'Mark Messert', 'Michael Hintond'],
  },
  {
    firtCharacter: 'O',
    names: ['Ossie Wilsons'],
  },
  {
    firtCharacter: 'P',
    names: ['Phillis Griffina', 'Paul Haynesa'],
  },
  {
    firtCharacter: 'R',
    names: ['Rocky Jackson'],
  },
  {
    firtCharacter: 'S',
    names: ['Sara Mullerz', 'Simon Velezs', 'Steve Walkert'],
  },
  {
    firtCharacter: 'H',
    names: ['Hanah Miles'],
  },
];

const ForwardForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-main.chat-bubble-menu.forward',
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="forward-btn" onClick={showModal}>
        <Title className="forward-btn__title">{t('title-btn')}</Title>
        <RightSquareOutlined className="forward-btn__icon" />
      </Button>
      <Modal open={isModalOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <Title level={4} className="modal-header__title">
              {t('title')}
            </Title>
            <Button className="modal-header__btn" onClick={handleClose}>
              <CloseOutlined className="custom-icon" />
            </Button>
          </div>
          <div className="modal-main">
            <div className="modal-main__content">
              {contacts.map((contact, index) => (
                <div key={index}>
                  <div className="firt-character">{contact.firtCharacter}</div>
                  <ul className="contact-list">
                    {contact.names.map((name, index) => (
                      <li key={index} className="contact-names">
                        <input
                          className="contact-names__checkbox"
                          type="checkbox"
                        ></input>
                        <label className="contact-names__label">{name}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <Button className="modal-footer__btn">{t('title-btn')}</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ForwardForm;
