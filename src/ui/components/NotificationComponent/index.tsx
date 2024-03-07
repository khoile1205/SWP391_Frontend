import { BellOutlined } from "@ant-design/icons";
import { List, Popover, Badge } from "antd";
import React from "react";

interface Props {
	visible: boolean;
}
export const NotificationComponent: React.FC<Props> = ({ visible }) => {
	const [noticeList] = React.useState<any[]>([]);
	// const { noticeCount } = useSelector((state) => state.user);
	// const { formatMessage } = useLocale();

	// const noticeListFilter = <T extends Notice["type"]>(type: T) => {
	// 	return noticeList.filter((notice) => notice.type === type) as Notice<T>[];
	// };

	// loads the notices belonging to logged in user
	// and sets loading flag in-process
	// const getNotice = async () => {
	// 	setLoading(true);
	// 	const { status, result } = await getNoticeList();

	// 	setLoading(false);
	// 	status && setNoticeList(result);
	// };

	// useEffect(() => {
	// 	getNotice();
	// }, []);

	const tabs = (
		<div>
			<List
				className="flex flex-col items-center"
				itemLayout="horizontal"
				dataSource={noticeList}
				renderItem={(item) => (
					<List.Item
						actions={
							[
								// <Button type="link" onClick={() => removeNotification(item.key)}>
								// 	Dismiss
								// </Button>,
							]
						}
					>
						<List.Item.Meta title={item.message} description={item.description} />
					</List.Item>
				)}
			/>
		</div>
	);

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
			<Badge count={1} overflowCount={10}>
				<BellOutlined className="h-7 w-7 text-xl" />
			</Badge>
		</Popover>
	);
};
