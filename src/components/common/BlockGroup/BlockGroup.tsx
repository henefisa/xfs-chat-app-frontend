import * as React from 'react';
import './BlockGroup.scss';

interface BlockGroupProps {
	avtTitle: string;
	name: string;
	pill: string;
}

const BlockGroup: React.FC<BlockGroupProps> = ({ avtTitle, name, pill }) => {
	return (
		<div className="block-group">
			<div className="block-group__avatar">
				<span>{avtTitle}</span>
			</div>
			<div className="block-group__name">
				<div className="block-group__name--title">{name}</div>
				<div className="block-group__name--pill">{pill}</div>
			</div>
		</div>
	);
};

export default BlockGroup;
