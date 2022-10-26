import React from 'react';

import MessagesTable from '../MessagesTable/MessagesTable';

import './ChatMain.scss';


const ChatMain = () => {
    return (
        <div className="chatPanel">
            <div className="chat-day-title">
                <div className="title-day">
                    Today
                </div>
            </div>
            <MessagesTable position='right' />
            <MessagesTable position='left' />
            <MessagesTable position='left' />
            <MessagesTable position='right' />
            <MessagesTable position='left' />
            <MessagesTable position='right' />
            <MessagesTable position='left' />
            <MessagesTable position='left' />
            <MessagesTable position='right' />
            <MessagesTable position='left' />
        </div>
    )
}

export default ChatMain;