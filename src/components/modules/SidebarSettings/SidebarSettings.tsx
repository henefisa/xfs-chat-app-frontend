import * as React from 'react';
import { EditOutlined, DownOutlined } from '@ant-design/icons';
import Title from '@common/Title/Title';
import Dropdown from '@common/Dropdown/Dropdown';
import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import SettingsMenu from '../SettingsStatusMenu/SettingsStatusMenu';
import { Collapse, Divider, InputRef } from 'antd';
import PrivacyMenu from '../PrivacyMenu/PrivacyMenu';
import Input from '@common/Input/Input';
import Switch from '@common/Switch/Switch';

import './SidebarSettings.scss';

const { Panel } = Collapse;

const info = [
  { title: 'Name', desc: 'Patricia Smith' },
  { title: 'Email', desc: 'admin@mgail.com' },
  { title: 'Time', desc: '15:30 PM' },
  { title: 'Location', desc: 'Danang, VN' },
];

const privacy = [
  { title: 'Profile photo' },
  { title: 'Last seen', check: true },
  { title: 'Status' },
  { title: 'Read receipts', check: true },
  { title: 'Groups' },
];

const help = [
  { title: 'FAQs' },
  { title: 'Contact' },
  { title: 'Terms & Privacy policy' },
];

const SidebarSettings: React.FC = () => {
  const [disabled, setDisable] = React.useState(true);
  const [userName, setUserName] = React.useState('Patricia Smith');
  const inputName = React.useRef<InputRef>(null);

  function handleName() {
    setDisable(!disabled);
  }

  React.useEffect(() => {
    inputName.current?.focus();
  }, [disabled]);

  return (
    <div className="sidebar-settings">
      <Title level={4} className="sidebar-settings__title">
        Settings
      </Title>
      <div className="user-info">
        <div className="user-info__avatar">
          <Avatar
            path="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/277551484_1607305416300980_1426726336589949572_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NDE6kmkwFQ8AX9-U3bh&_nc_ht=scontent.fdad3-1.fna&oh=00_AT8SGcvhT_y6-Lc16cMBv0OwsUOg0x7ef7Yp1yb_1teoEQ&oe=635BDBD2"
            imgWidth={86}
            username="A"
            className="custom-avatar"
          />
          <Button className="avatar-btn">
            <EditOutlined className="avatar-btn__icon" />
          </Button>
        </div>
        <Title level={5} className="user-info__name">
          Danh Huy
        </Title>
        <Dropdown
          overlay={<SettingsMenu />}
          trigger={['click']}
          placement="bottomLeft"
        >
          <div className="user-info__status">
            <div className="status-current">Available</div>
            <DownOutlined className="status-icon" />
          </div>
        </Dropdown>
      </div>
      <Divider />
      <div className="sidebar-settings__content">
        <Collapse bordered={false} expandIconPosition="end" className="info">
          <Panel
            className="info__panel"
            header={
              <div className="panel-header">
                <Title level={5} className="panel-header__title">
                  Personal Info
                </Title>
              </div>
            }
            key="1"
          >
            <ul className="panel-inner">
              {info.map((item, index) => (
                <li key={index} className="info-item">
                  <Title level={5} className="info-item__title">
                    {item.title}
                  </Title>
                  <Title level={5} className="info-item__desc">
                    {index === 0 ? (
                      <Input
                        className="user-name"
                        ref={inputName}
                        disabled={disabled}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    ) : (
                      item.desc
                    )}
                  </Title>
                </li>
              ))}
              <Button className="btn-edit" onClick={handleName}>
                <EditOutlined className="btn-edit__icon" />
                {disabled ? 'Edit' : 'Update'}
              </Button>
            </ul>
          </Panel>
        </Collapse>
        <Collapse bordered={false} expandIconPosition="end" className="privacy">
          <Panel
            className="privacy__panel"
            header={
              <div className="panel-header">
                <Title level={5} className="panel-header__title">
                  Privacy
                </Title>
              </div>
            }
            key="1"
          >
            <ul className="panel-inner">
              {privacy.map((item, index) => (
                <>
                  <li className="privacy-item" key={index}>
                    <Title level={5} className="privacy-item__title">
                      {item.title}
                    </Title>
                    {item.check ? (
                      <Switch defaultChecked={true} />
                    ) : (
                      <Dropdown
                        overlay={<PrivacyMenu />}
                        trigger={['click']}
                        placement="bottomRight"
                      >
                        <Button className="privacy-item__btn">
                          Everyone
                          <DownOutlined className="btn-icon" />
                        </Button>
                      </Dropdown>
                    )}
                  </li>
                  {index < privacy.length - 1 && (
                    <Divider className="divider" />
                  )}
                </>
              ))}
            </ul>
          </Panel>
        </Collapse>
        <Collapse
          bordered={false}
          expandIconPosition="end"
          className="security"
        >
          <Panel
            className="security__panel"
            header={
              <div className="panel-header">
                <Title level={5} className="panel-header__title">
                  Security
                </Title>
              </div>
            }
            key="1"
          >
            <ul className="panel-inner">
              <li className="security-item">
                <Title level={5} className="security-item__title">
                  Show security notification
                </Title>
                <Switch defaultChecked={true} />
              </li>
            </ul>
          </Panel>
        </Collapse>
        <Collapse bordered={false} expandIconPosition="end" className="help">
          <Panel
            className="help__panel"
            header={
              <div className="panel-header">
                <Title level={5} className="panel-header__title">
                  Help
                </Title>
              </div>
            }
            key="1"
          >
            <ul className="panel-inner">
              {help.map((item, index) => (
                <>
                  <li className="help-item" key={index}>
                    <Title level={5} className="help-item__title">
                      {item.title}
                    </Title>
                  </li>
                  {index < help.length - 1 && <Divider className="divider" />}
                </>
              ))}
            </ul>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default SidebarSettings;
