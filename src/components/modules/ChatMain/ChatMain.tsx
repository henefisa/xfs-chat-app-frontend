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
            <MessagesTable messages='hi' position='right' />
            <MessagesTable messages='hi' position='left' />
            <MessagesTable messages='hi' position='left' />
            <MessagesTable messages='hi' position='right' />
        </div>
    )
}

export default ChatMain;
