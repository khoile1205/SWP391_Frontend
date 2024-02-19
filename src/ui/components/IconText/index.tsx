import { Space, Tooltip } from "antd";
import React from "react";

export const IconText = ({
	icon: IconComponent,
	text,
	onClick,
}: {
	icon: React.ComponentType;
	text: string;
	onClick?: () => void;
}) => (
	<Space onClick={onClick} className="hover:cursor-pointer">
		<Tooltip title={text}>
			<span>
				<IconComponent />
			</span>
		</Tooltip>
		{text}
	</Space>
);
