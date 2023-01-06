import * as React from 'react';
import {
  FileZipFilled,
  FileImageFilled,
  FileFilled,
  DownloadOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

import Title from '@common/Title/Title';
import Dropdown from '@common/Dropdown/Dropdown';
import FileActionMenu from '@modules/FileActionMenu/FileActionMenu';
import Button from '@common/Button/Button';
import { selectDarkLight } from 'src/store/darkLightSlice';
import { useAppSelector } from 'src/store/hooks';

import './AttachedFileItem.scss';
import clsx from 'clsx';

interface IFileItemProps {
  name: string;
  type: string;
  size: string;
}

interface IAttachedFileItemProps {
  item: IFileItemProps;
}

const AttachedFileItem: React.FC<IAttachedFileItemProps> = ({ item }) => {
  const isDark = useAppSelector(selectDarkLight);
  return (
    <div className={clsx('file-item', { 'dark-mode': isDark })}>
      <div className="file-info">
        <div className="file-icon">
          {item.type === 'zip' ? (
            <FileZipFilled className="file-icon__type" />
          ) : item.type === 'jpg' ? (
            <FileImageFilled className="file-icon__type" />
          ) : (
            <FileFilled className="file-icon__type" />
          )}
        </div>
        <div className="file-body">
          <Title level={5} className="file-body__name">
            {item.name}
          </Title>
          <Title level={5} className="file-body__size">
            {item.size}{' '}
          </Title>
        </div>
      </div>
      <div className="actions">
        <Button className="download-btn">
          <DownloadOutlined className="download-icon" />
        </Button>
        <div className="file-actions">
          <Dropdown
            overlay={<FileActionMenu />}
            trigger={['click']}
            placement="bottomRight"
          >
            <EllipsisOutlined className="menu-icon" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default AttachedFileItem;
