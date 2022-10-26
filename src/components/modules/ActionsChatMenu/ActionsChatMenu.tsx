import * as React from 'react';
import { Menu, MenuProps } from 'antd';
import {
    InboxOutlined,
    AudioMutedOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';

import './ActionsChatMenu.scss';

interface IActionsChatMenuProps extends MenuProps { }

const menu: MenuProps['items'] = [
    {
        label: (
            <Button className="menu-item">
                <Title className="menu-item__title">
                    Archive
                </Title>
                <InboxOutlined className="custom-menu-icon" />
            </Button>
        ),
        key: 0,
    },
    {
        label: (
            <Button className="menu-item">
                <Title className="menu-item__title">
                    Muted
                </Title>
                <AudioMutedOutlined className="custom-menu-icon" />
            </Button>
        ),
        key: 1,
    },
    {
        label: (
            <Button className="menu-item">
                <Title className="menu-item__title">
                    Delete
                </Title>
                <DeleteOutlined className="custom-menu-icon" />
            </Button>
        ),
        key: 2,
    }
]

const ActionsChatMenu: React.FC<IActionsChatMenuProps> = () => {
    return <Menu className="chat-menu" items={menu} />;
}

export default ActionsChatMenu;