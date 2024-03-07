import userStore from "@/zustand/user.store";
import { BellOutlined } from "@ant-design/icons";
import { List, Popover, Badge, Avatar, Typography, Button } from "antd";
import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const NotificationComponent: React.FC<Props> = ({ visible, setVisible }) => {
	const ref = useRef(null);

	const { userNotification } = userStore((state) => state);

	const markAllAsRead = () => {
		console.log("ok");
	};
	const tabs = (
		<div style={{ maxHeight: "400px", overflowY: "auto" }} ref={ref}>
			<div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
				<Button type="dashed" onClick={markAllAsRead}>
					Mark All as Read
				</Button>
			</div>
			<List
				itemLayout="horizontal"
				dataSource={userNotification}
				renderItem={(item) => (
					<List.Item>
						<List.Item.Meta
							avatar={
								<Avatar
									src={`${item.sender?.avatarUrl ?? "	http://res.cloudinary.com/dtxnc9edv/image/upload/v1709607415/avatar/e5yteorp9ryw6uftnrub.jpg"}`}
								/>
							}
							description={<Typography.Text strong={!item.isSeen}>{item.content}</Typography.Text>}
						/>
					</List.Item>
				)}
			/>
		</div>
	);

	const handleClickOutside = () => {
		// Your custom logic here
		setVisible(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	return (
		<Popover
			content={tabs}
			overlayClassName="bg-2"
			placement="bottomRight"
			trigger={["click"]}
			open={visible}
			overlayStyle={{
				width: 336,
			}}
		>
			<Badge
				count={userNotification.filter((element) => !element.isSeen).length}
				overflowCount={10}
			>
				<BellOutlined className="h-6 w-6 text-xl" />
			</Badge>
		</Popover>
	);
};
