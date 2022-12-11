import * as React from 'react';
import {
  AudioFilled,
  PhoneFilled,
  VideoCameraFilled,
  UserAddOutlined,
} from '@ant-design/icons';
import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import { Footer } from 'antd/lib/layout/layout';
import Button from '@common/Button/Button';

import './Call.scss';

const CallPage: React.FC = () => {
  return (
    <div className="call-page">
      <div className="call-page__info">
        <Avatar
          path="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-1/277551484_1607305416300980_1426726336589949572_n.jpg?stp=dst-jpg_p240x240&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6kBhRakFLHoAX8IC5aP&_nc_ht=scontent.fdad3-1.fna&oh=00_AfBunFplLEWNiRw1AR9lSyr0pLzoWw1CmtP0BzhUMwQqsQ&oe=639754D4"
          imgWidth={100}
          className="custom-avatar"
        />
        <Title level={5} className="username-info__name">
          Nguyễn Danh Huy
        </Title>
        <p className="call-page__status">Đang gọi...</p>
      </div>
      <Footer className="call-page__footer">
        <Button className="btn-add-member">
          <UserAddOutlined className="icon" />
        </Button>
        <Button className="btn-video">
          <VideoCameraFilled className="icon" />
        </Button>
        <Button className="btn-mic">
          <AudioFilled className="icon" />
        </Button>
        <Button className="btn-close">
          <PhoneFilled className="icon icon-close" />
        </Button>
      </Footer>
    </div>
  );
};

export default CallPage;
