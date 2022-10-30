import React from 'react';
import { ClockCircleOutlined, MoreOutlined } from '@ant-design/icons';
import Dropdown from '@common/Dropdown/Dropdown';
import clsx from 'clsx';
import ChatBubbleMenu from '../ChatBubbleMenu/ChatBubbleMenu';
import './MessagesContent.scss';

interface IMessagesContent {
	position: string;
	messages: string;
}

const MessagesContent: React.FC<IMessagesContent> = ({
	position,
	messages,
}) => {
	return (
		<div className="messages-content__chat-content">
			<div
				className={clsx(
					'messages-content__chat-content-user',
					`messages-content__chat-content-user--${position}`
				)}
			>
				<div
					className={clsx(
						'messages-content__chat-content-bubble',
						`messages-content__chat-content-bubble--${position}`
					)}
				>
					{messages}
					<div className="messages-content__chat-content-bubble-time">
						<ClockCircleOutlined className="custom-icon-chat-time" />
						10:30
					</div>
				</div>
				<div className="chat-content-bubble-more">
					<Dropdown
						overlay={
							<ChatBubbleMenu
								position={position === 'left' ? 'left' : 'right'}
							/>
						}
						trigger={['click']}
						placement="bottom"
						className={clsx(
							'dropdown-chat-menu',
							`dropdown-chat-menu--${position}`
						)}
					>
						<MoreOutlined className="custom-icon-chat-bubble-more" />
					</Dropdown>
				</div>
			</div>
		</div>
	);
};

export default MessagesContent;
