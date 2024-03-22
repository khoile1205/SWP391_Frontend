import { Notification } from "@/models/notification.model";
import { notificationStore } from "@/zustand/notification.store";
import userStore from "@/zustand/user.store";
import { BellOutlined } from "@ant-design/icons";
import { List, Popover, Badge, Avatar, Typography, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import _ from "lodash";
import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
type NotificationType = "all" | "notSeen";

interface MarkAllAsReadProps {
	markAllAsRead: () => void;
}
const MarkAllAsRead: React.FC<MarkAllAsReadProps> = ({ markAllAsRead }) => (
	<div className="text-end">
		<Typography.Text className="hover:text-primary hover:cursor-pointer" onClick={markAllAsRead}>
			Mark All as Read
		</Typography.Text>
	</div>
);
export const NotificationComponent: React.FC<Props> = ({ visible, setVisible }) => {
	// Zustand store
	const { userNotification, user } = userStore((state) => state);
	const { seenAllNotification } = notificationStore((state) => state);

	const [notSeenNotification, setNotSeenNotification] = React.useState<Notification[]>([]);
	const [cloneTotalUserNotification, setCloneTotalUserNotification] = React.useState<
		Notification[]
	>([]);

	const [type, setType] = React.useState<NotificationType>("all");

	const ref = useRef(null);

	React.useEffect(() => {
		setCloneTotalUserNotification(_.cloneDeepWith(userNotification));
		setNotSeenNotification(userNotification.filter((element) => !element.isSeen));
	}, [userNotification]);

	const handleChangeTab = (key: string) => {
		setType(key as NotificationType);
	};

	const handleClickMarkedAll = async () => {
		if (cloneTotalUserNotification.length > 0 && user) {
			const resposne = await seenAllNotification();
			if (resposne.isSuccess) {
				setCloneTotalUserNotification(
					cloneTotalUserNotification.map((element) => {
						element.isSeen = true;
						return element;
					})
				);
				setNotSeenNotification([]);
			}
		}
	};
	const tabs = (
		<div
			style={{ maxHeight: "400px", overflowY: "auto" }}
			ref={ref}
			onClick={(e) => e.stopPropagation()}
		>
			<Tabs defaultActiveKey="all" onChange={handleChangeTab}>
				<TabPane tab={"All Notifications"} active={type == "all"} tabKey="all" key={"all"}>
					<MarkAllAsRead markAllAsRead={handleClickMarkedAll}></MarkAllAsRead>
					<List
						itemLayout="horizontal"
						dataSource={cloneTotalUserNotification}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									avatar={
										<Avatar
											src={`${item.sender?.avatarUrl ?? "	http://res.cloudinary.com/dtxnc9edv/image/upload/v1709607415/avatar/e5yteorp9ryw6uftnrub.jpg"}`}
										/>
									}
									description={
										<Typography.Text strong={!item.isSeen}>{item.content}</Typography.Text>
									}
								/>
							</List.Item>
						)}
					/>
				</TabPane>
				<TabPane tab={"Not Seen"} active={type == "notSeen"} tabKey="notSeen" key={"notSeen"}>
					<MarkAllAsRead markAllAsRead={handleClickMarkedAll}></MarkAllAsRead>
					<List
						itemLayout="horizontal"
						dataSource={notSeenNotification}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									avatar={
										item.sender ? (
											<a href={`/user/${item.sender.id}`}>
												<Avatar
													src={`${item.sender.avatarUrl ?? "http://res.cloudinary.com/dtxnc9edv/image/upload/v1709607415/avatar/e5yteorp9ryw6uftnrub.jpg"}`}
												/>
											</a>
										) : (
											<Avatar
												src={
													"http://res.cloudinary.com/dtxnc9edv/image/upload/v1709607415/avatar/e5yteorp9ryw6uftnrub.jpg"
												}
											/>
										)
									}
									description={
										<Typography.Text strong={!item.isSeen}>{item.content}</Typography.Text>
									}
								/>
							</List.Item>
						)}
					/>
				</TabPane>
			</Tabs>
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
			<Badge count={notSeenNotification.length} overflowCount={10}>
				<BellOutlined className="h-6 w-6 text-xl" />
			</Badge>
		</Popover>
	);
};
