import * as React from 'react';
import clsx from 'clsx';
import { Menu, MenuProps } from 'antd';

import Title from '@common/Title/Title';
import Button from 'src/components/common/Button/Button';

import './LanguageMenu.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMenuProps extends MenuProps {}

const languages = [
  {
    flag: '/images/flags/EL_flag.jpeg',
    name: 'English',
  },
  {
    flag: '/images/flags/Spanish_flag.jpeg',
    name: 'Spanish',
  },
  {
    flag: '/images/flags/German_flag.jpeg',
    name: 'German',
  },
  {
    flag: '/images/flags/Italy_flag.jpeg',
    name: 'Italian',
  },
  {
    flag: '/images/flags/Russian_flag.jpeg',
    name: 'Russian',
  },
];

const languageIndex = 0;

const items = languages.map((item, index) => {
  return {
    label: (
      <Button
        className={clsx('language-item', {
          active: languageIndex === index ? true : false,
        })}
      >
        <img className="language-item__img" src={item.flag} alt="Flag" />
        <Title className="language-item__title" level={5}>
          {item.name}
        </Title>
      </Button>
    ),
    key: index,
  };
});

const LanguageMenu: React.FC<IMenuProps> = () => {
  return <Menu className="language-menu" items={items} />;
};

export default LanguageMenu;
