import React from 'react';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import { CloseOutlined } from '@ant-design/icons';

import './ForwardAction.scss';

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

const ForwardAction = () => {
  return (
    <div className="forward-action">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <div className="modal-header">
          <Title level={4} className="modal-header__title">
            Forward to...
          </Title>
          <Button className="modal-header__btn">
            <CloseOutlined className="custom-icon" />
          </Button>
        </div>
        <div className="modal-body">
          <div className="simplebar-content">
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
    </div>
  );
};

export default ForwardAction;
