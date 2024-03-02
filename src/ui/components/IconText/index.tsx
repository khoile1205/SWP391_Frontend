import { Space, Tooltip } from "antd";
import React from "react";

interface Props {
	className?: string;
	icon: React.ComponentType;
	text: string;
	onClick?: () => void;
}
export const IconText: React.FC<Props> = ({ className, icon, text, onClick }) => (
	<Space onClick={onClick} className={`hover:cursor-pointer ${className}`}>
		<Tooltip title={text}>
			<span>{React.createElement(icon)}</span>
		</Tooltip>
		{text}
	</Space>
);
