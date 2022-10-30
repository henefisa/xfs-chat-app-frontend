import React, { useState } from 'react';
import {
	SmileOutlined,
	PaperClipOutlined,
	PictureOutlined,
	SendOutlined,
} from '@ant-design/icons';

import Button from '@common/Button/Button';
import Input from '@common/Input/Input';
import Emoji from 'emoji-picker-react';

import './ChatBottom.scss';

const ChatBottom: React.FC = () => {
	const [emoji, setEmoji] = useState(false);
	const inpuFileRef = React.createRef<HTMLInputElement>();
	const inpuImgRef = React.createRef<HTMLInputElement>();

	const toggleFile = () => {
		inpuFileRef.current?.click();
	};
	const toggleImg = () => {
		inpuImgRef.current?.click();
	};

	return (
		<div className="chat-bottom">
			<div className="chat-bottom__type-chat">
				<Input className="type-chat__input" placeholder="Enter Message..." />
			</div>
			<div className="chat-bottom__items-chat">
				<div className="items-chat__emoji-btn">
					<Button
						className="emoji-btn__button"
						onClick={() => setEmoji(!emoji)}
					>
						<SmileOutlined className="custom-send-icon" />
					</Button>
					{emoji && <Emoji height={338} width={282} />}
				</div>
				<div className="items-chat__attached-file-btn">
					<input type="file" ref={inpuFileRef} hidden />
					<Button className="attached-file-btn__button" onClick={toggleFile}>
						<PaperClipOutlined className="custom-send-icon" />
					</Button>
				</div>
				<div className="items-chat__images-btn">
					<input type="file" ref={inpuImgRef} hidden accept="image/*" />
					<Button className="images-btn__button" onClick={toggleImg}>
						<PictureOutlined className="custom-send-icon" />
					</Button>
				</div>
				<div className="items-chat__send-chat">
					<Button className="send-chat__button">
						<SendOutlined className="custom-send-chat" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ChatBottom;
