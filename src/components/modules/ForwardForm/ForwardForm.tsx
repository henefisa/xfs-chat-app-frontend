import { Modal } from 'antd';
import Title from '@common/Title/Title';
import React, { useState } from 'react';
import Button from '@common/Button/Button';
import { RightSquareOutlined, CloseOutlined } from '@ant-design/icons';

import './ForwardForm.scss';

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

const ForwardForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="forward-btn" onClick={showModal}>
        <Title className="forward-btn__title">Forward</Title>
        <RightSquareOutlined className="forward-btn__icon" />
      </Button>
      <Modal open={isModalOpen}>
        <div className="modal-content">
          <div className="modal-header">
            <Title level={4} className="modal-header__title">
              Forward to...
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
                  <ul className="contact-names">
                    {contact.names.map((name, index) => (
                      <li key={index}>
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
              <Button className="modal-footer__btn">Forward</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ForwardForm;
