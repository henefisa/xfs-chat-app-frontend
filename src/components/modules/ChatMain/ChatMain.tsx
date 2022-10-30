import React from 'react';

import MessagesTable from '../MessagesTable/MessagesTable';
import ChatDayTitle from '../ChatDayTitle/ChatDayTitle';

import './ChatMain.scss';

const ChatMain = () => {
	return (
		<div className="chatmain">
			<ChatDayTitle day="Today" />
			<MessagesTable position="right" />
			<MessagesTable position="left" />
			<MessagesTable position="left" />
			<MessagesTable position="right" />
		</div>
	);
};

export default ChatMain;
