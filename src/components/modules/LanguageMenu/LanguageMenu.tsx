import { MenuProps } from 'antd';
import clsx from 'clsx';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@common/Button/Button';
import Title from '@common/Title/Title';
import Menu from '@common/Menu/Menu';

import './LanguageMenu.scss';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { changeLanguage, selectLanguage } from 'src/store/languageSlice';
import { selectDarkLight } from 'src/store/darkLightSlice';

interface ILanguageProps extends MenuProps {}

const LanguageMenu: React.FC<ILanguageProps> = () => {
  const { t, i18n } = useTranslation('languages');

  const dispatch = useAppDispatch();
  const languageStorage = useAppSelector(selectLanguage);
  const isDark = useAppSelector(selectDarkLight);

  const getKeyState = () => {
    switch (languageStorage.languageCode) {
      case 'en': {
        return '0';
      }
      case 'vi': {
        return '1';
      }
      default:
        return '0';
    }
  };

  const [keySelected, setKeySelected] = React.useState<string>(getKeyState());

  const languages = React.useMemo(() => {
    return [
      {
        flag: '/images/flags/EL_flag.jpeg',
        name: t('en'),
      },
      {
        flag: '/images/flags/VN_flag.png',
        name: t('vi'),
      },
    ];
  }, [keySelected]);

  const items = React.useMemo(() => {
    return languages.map((item, index) => {
      return {
        label: (
          <Button
            className={clsx('language-item', {
              [`language-item--active`]:
                keySelected === `${index}` ? true : false,
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
  }, [t]);

  const handleChangeLanguage = (key: string) => {
    switch (key) {
      case '0': {
        i18n.changeLanguage('en');
        dispatch(changeLanguage('en'));
        break;
      }
      case '1': {
        i18n.changeLanguage('vi');
        dispatch(changeLanguage('vi'));
        break;
      }
    }
  };

  const handleClickLanguageMenu: MenuProps['onClick'] = ({ key }) => {
    setKeySelected(key);

    handleChangeLanguage(key);
  };

  return (
    <Menu
      className={clsx('language-menu', { 'dark-mode': isDark })}
      items={items}
      onClick={handleClickLanguageMenu}
    />
  );
};

export default LanguageMenu;
